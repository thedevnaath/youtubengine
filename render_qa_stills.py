import os
import subprocess

frames_to_test = [
    50,    # Act 1: Walking on green hill
    140,   # Act 1: 5 habits callout with red slash
    205,   # Act 1: 30-day challenge callout with red slash
    310,   # Act 1: Kinetic Burst "JUST ONE HABIT"
    410,   # Act 2: Pushing MOTIVATION boulder
    480,   # Act 2: Motivation fails slump
    600,   # Act 2: Keystone habit gear
    700,   # Act 2: Kinetic Burst "DAILY NON-NEGOTIABLE OUTPUT"
    800,   # Act 2: Work desk with laptop typing
    1000,  # Act 3: Output units (page written)
    1150,  # Act 3: Multiple output units in arena
    1250,  # Act 3: Kinetic Burst "SMALL IS FINE, ZERO IS NOT"
    1370,  # Act 4: 90-degree top-down ceiling bedroom shot (2:00 AM)
    1520,  # Act 4: 2:00 PM studio desk typing
    1680,  # Act 4: Solid granite evidence block
    1850,  # Act 4: Live line chart compounding
    2100,  # Act 4: Daily Producer hero
    2380,  # Act 5: Infinite consumption vortex (stressed stickman)
    2610,  # Act 5: Kinetic Burst "NO DAY WITHOUT OUTPUT"
    2700,  # Act 5: Rain work desk ("Especially on bad days")
    2900,  # Act 6: Summit 365 volume skyscraper
    3100,  # Act 7: Stickman facing viewer
    3180,  # Act 7: Grand CTA Kinetic Burst
]

os.makedirs("out/qa", exist_ok=True)
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

print(f"Rendering {len(frames_to_test)} QA still frames...")

failed = []
for f in frames_to_test:
    out_file = f"out/qa/frame-{f}.png"
    cmd = [
        "npx.cmd", "remotion", "still", "src/index.ts", "MainExplainer",
        out_file, f"--frame={f}", f"--browser-executable={chrome_path}"
    ]
    print(f"Rendering frame {f} -> {out_file}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"FAILED frame {f}: {res.stderr}")
        failed.append(f)
    else:
        print(f"Frame {f} OK.")

if failed:
    print(f"\nCompleted with {len(failed)} failures: {failed}")
else:
    print("\nAll QA frames rendered successfully!")

