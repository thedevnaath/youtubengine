import os
import subprocess

refined_frames = [140, 205, 410, 480, 600, 800, 1850, 2900]
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

print(f"Re-rendering {len(refined_frames)} refined frames...")

for f in refined_frames:
    out_file = f"out/qa/frame-{f}.png"
    cmd = [
        "npx.cmd", "remotion", "still", "src/index.ts", "MainExplainer",
        out_file, f"--frame={f}", f"--browser-executable={chrome_path}"
    ]
    print(f"Rendering frame {f}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error frame {f}: {res.stderr}")
    else:
        print(f"Frame {f} OK.")

print("Refined rendering complete.")

