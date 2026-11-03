"""
sync_audio.py:
Automates pushing Kokoro-82M audio generation code to Kaggle GPU notebook (devnaath/youtube-audio-engine)
and downloading rendered audio.mp3 + timestamps.json to public/current/
"""

import os
import sys
import json
import time
import shutil
import subprocess
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).resolve().parent
PUBLIC_CURRENT = WORKSPACE_ROOT / "public" / "current"
KAGGLE_DIR = WORKSPACE_ROOT / "kaggle"
NOTEBOOK_SLUG = "devnaath/youtube-audio-engine"

def ensure_dirs():
    PUBLIC_CURRENT.mkdir(parents=True, exist_ok=True)
    KAGGLE_DIR.mkdir(parents=True, exist_ok=True)

def get_kaggle_cmd():
    kaggle_bin = shutil.which("kaggle")
    if kaggle_bin:
        return kaggle_bin
    scripts_kaggle = Path(sys.prefix) / "Scripts" / "kaggle.exe"
    if scripts_kaggle.exists():
        return str(scripts_kaggle)
    user_kaggle = Path(os.environ.get("USERPROFILE", "")) / "AppData" / "Local" / "Programs" / "Python" / "Python312" / "Scripts" / "kaggle.exe"
    if user_kaggle.exists():
        return str(user_kaggle)
    return "kaggle"

def run_command(cmd, env=None):
    if cmd and cmd[0] == "kaggle":
        cmd[0] = get_kaggle_cmd()
    print(f"--> Executing: {' '.join(cmd)}")
    result = subprocess.run(cmd, env=env, capture_output=True, text=True, shell=(os.name == 'nt'))
    if result.returncode != 0:
        print(f"Error ({result.returncode}):\n{result.stderr}", file=sys.stderr)
        return False, result.stdout, result.stderr
    return True, result.stdout, result.stderr

def pull_outputs():
    ensure_dirs()
    print(f"Checking outputs from Kaggle notebook: {NOTEBOOK_SLUG}...")
    temp_dir = WORKSPACE_ROOT / ".kaggle_download_temp"
    if temp_dir.exists():
        shutil.rmtree(temp_dir, ignore_errors=True)
    temp_dir.mkdir(parents=True, exist_ok=True)

    success, stdout, stderr = run_command([
        "kaggle", "kernels", "output", NOTEBOOK_SLUG, "-p", str(temp_dir)
    ])

    if not success:
        print("Failed to pull outputs from Kaggle:", stderr)
        shutil.rmtree(temp_dir, ignore_errors=True)
        return False

    copied_files = []
    for f in temp_dir.iterdir():
        if f.is_file():
            print(f" - Found output: {f.name} ({f.stat().st_size} bytes)")
            if f.name in ["audio.mp3", "timestamps.json"]:
                dest = PUBLIC_CURRENT / f.name
                shutil.copy2(f, dest)
                copied_files.append(f.name)
                print(f"   -> Copied to {dest}")

    shutil.rmtree(temp_dir, ignore_errors=True)

    if "audio.mp3" in copied_files and "timestamps.json" in copied_files:
        print("\nSUCCESS: Both audio.mp3 and timestamps.json are synced to public/current/!")
        # Validate timestamps
        ts_path = PUBLIC_CURRENT / "timestamps.json"
        try:
            with open(ts_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                print(f"Validated {len(data)} word timestamps. Ready for animation.")
        except Exception as e:
            print("Warning: could not parse timestamps.json:", e)
        return True
    else:
        print("\nWarning: Missing audio.mp3 or timestamps.json in Kaggle output.")
        return False

def push_notebook(kernel_dir=None):
    target_dir = Path(kernel_dir) if kernel_dir else KAGGLE_DIR
    if not target_dir.exists():
        print(f"Kernel directory '{target_dir}' does not exist.")
        return False

    print(f"Pushing kernel scripts from {target_dir} to Kaggle...")
    success, stdout, stderr = run_command([
        "kaggle", "kernels", "push", "-p", str(target_dir)
    ])

    if success:
        print("Successfully pushed to Kaggle!")
        print(stdout)
    else:
        print("Failed to push to Kaggle:", stderr)
    return success

def show_status():
    print(f"Checking status of Kaggle notebook: {NOTEBOOK_SLUG}...")
    success, stdout, stderr = run_command([
        "kaggle", "kernels", "status", NOTEBOOK_SLUG
    ])
    if success:
        print(stdout.strip())
        return stdout.strip()
    else:
        print(stderr.strip())
        return None

def update_notebook_script(script_text: str):
    """Embeds the provided script text into the Kaggle notebook cells."""
    nb_path = KAGGLE_DIR / "youtube-audio-engine.ipynb"
    if not nb_path.exists():
        print(f"Error: {nb_path} does not exist.")
        return False

    with open(nb_path, "r", encoding="utf-8") as f:
        nb = json.load(f)

    escaped_text = json.dumps(script_text)
    cell_code = [
        "# 2. Script definition\n",
        f"text = {escaped_text}\n",
        "\n",
        "with open('script_text.txt', 'w', encoding='utf-8') as f:\n",
        "    f.write(text)\n",
        "\n",
        "print(f'Script loaded: {len(text)} characters')\n",
        "print(text[:200] + ('...' if len(text) > 200 else ''))\n"
    ]

    for cell in nb.get("cells", []):
        source_str = "".join(cell.get("source", []))
        if "# 2. Script definition" in source_str:
            cell["source"] = cell_code
            break

    with open(nb_path, "w", encoding="utf-8") as f:
        json.dump(nb, f, indent=1)

    print(f"Updated {nb_path} with new script ({len(script_text)} characters).")
    return True

def generate(script_input: str):
    """
    Complete end-to-end flow:
    1. Reads script text from argument or file.
    2. Updates Kaggle notebook.
    3. Pushes to Kaggle.
    4. Waits for Kaggle GPU execution to complete.
    5. Downloads audio.mp3 and timestamps.json into public/current/.
    """
    script_path = Path(script_input)
    if script_path.exists() and script_path.is_file():
        print(f"Reading script from file: {script_path}")
        script_text = script_path.read_text(encoding="utf-8").strip()
    else:
        script_text = script_input.strip()

    if not script_text:
        print("Error: Empty script provided.")
        return False

    print("\n=== STAGE 1: Updating Kaggle Notebook with Script ===")
    if not update_notebook_script(script_text):
        return False

    print("\n=== STAGE 2: Pushing to Kaggle GPU Runner ===")
    if not push_notebook():
        return False

    print("\n=== STAGE 3: Waiting for Kaggle GPU Voiceover & Alignment ===")
    print("Notebook queued on Kaggle. Monitoring status...")

    max_wait_seconds = 600  # 10 minutes timeout
    start_time = time.time()

    while time.time() - start_time < max_wait_seconds:
        status = show_status()
        if status:
            if '"complete"' in status or 'complete' in status.lower():
                print("\nKaggle kernel run completed successfully!")
                break
            elif '"error"' in status or 'error' in status.lower():
                print("\nError: Kaggle kernel reported an error during execution.")
                return False
        time.sleep(15)
    else:
        print("\nTimed out waiting for Kaggle notebook execution.")
        return False

    print("\n=== STAGE 4: Downloading Audio & Timestamps ===")
    return pull_outputs()

def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python sync_audio.py generate <script_text_or_file_path>")
        print("  python sync_audio.py pull")
        print("  python sync_audio.py status")
        print("  python sync_audio.py push [optional_kernel_dir]")
        sys.exit(1)

    cmd = sys.argv[1].lower()
    if cmd == "generate":
        if len(sys.argv) < 3:
            print("Please provide the script text or file path: python sync_audio.py generate <script>")
            sys.exit(1)
        script_arg = " ".join(sys.argv[2:])
        generate(script_arg)
    elif cmd == "pull":
        pull_outputs()
    elif cmd == "status":
        show_status()
    elif cmd == "push":
        kernel_dir = sys.argv[2] if len(sys.argv) > 2 else None
        push_notebook(kernel_dir)
    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)

if __name__ == "__main__":
    main()
