import subprocess

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
for f in [430, 490, 1480, 2900]:
    out_file = f"out/renders/frame-{f}.png"
    cmd = [
        "npx.cmd", "remotion", "still", "src/index.ts", "MainExplainer",
        out_file, f"--frame={f}", f"--browser-executable={chrome_path}"
    ]
    print(f"Rendering frame {f}...")
    subprocess.run(cmd, check=True)
    print(f"Frame {f} OK.")

