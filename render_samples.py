import subprocess
import sys

frames = [
    140, 205, 310, 430, 490, 600, 700, 800,
    1000, 1150, 1250, 1480, 1850, 2100,
    2380, 2610, 2700, 2900, 3160
]

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

print(f"Rendering {len(frames)} sample frames across the timeline...")

for f in frames:
    out_file = f"out/renders/frame-{f}.png"
    cmd = [
        "npx.cmd", "remotion", "still", "src/index.ts", "MainExplainer",
        out_file, f"--frame={f}", f"--browser-executable={chrome_path}"
    ]
    print(f"Rendering frame {f} -> {out_file}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error on frame {f}: {res.stderr}")
    else:
        print(f"Frame {f} rendered successfully.")

print("All sample frames rendered.")

