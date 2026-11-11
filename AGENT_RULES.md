# MANDATORY VIDEO PRODUCTION & ANIMATION RULES (NON-NEGOTIABLE)

You MUST read and obey every rule in this document BEFORE planning, WHILE writing code, and AFTER completing work. Do NOT take shortcuts, do NOT compress long scripts into a few static scenes, and do NOT produce slideshow/presentation layouts. This is high-retention YouTube animation in the style of MagnatesMedia and top-tier motion graphics channels.

---

### 1. ZERO PRESENTATION BOXES, ZERO SLIDE TITLES, ZERO SUBTITLES
- **Delete `AnimatedCaptions.tsx`** and remove all subtitles permanently.
- **BANNED UI ELEMENTS:** Never render rectangular cards, bordered `<div>` boxes, frosted-glass panels, bullet lists, pill badges, or top-of-screen "Scene Titles / Headers". This must NEVER look like a PowerPoint or slide deck.
- **True YouTube Explainer Typography:** 
  - Only show text when a key concept, metric, or turning point is spoken.
  - Render in-scene text as **frameless, bold typography** floating directly in the 2D world space (no box or border around it) that scales in with spring physics and interacts with the camera or stickman.
  - For major thesis statements, cut to a **full-screen Kinetic Typography burst** on a clean, lit background where individual words slam, scale, or slide in locked to the exact millisecond in `timestamps.json`.

---

### 2. MANDATORY CONTEXTUAL PROPS & EXACT COORDINATE ANCHORING (NO FLOATING OR MIMING)
- **Never mime actions in empty air:**
  - If `action="work"`, you MUST render a chair seat at `(x - 14 * dir, y - 55)`, a desk surface at `y - 108`, and a laptop resting on the desk at `(x + 52 * dir, y - 108)` so the stickman's typing hands touch the keyboard.
  - If `action="sit"`, you MUST render a chair, bench, or couch surface directly beneath his pelvis at `y - 56`.
  - If `action="push"`, you MUST render a heavy physical wall, boulder, or giant metric block touching his hands at `x + (62 * dir) * scale`.
  - If `action="lift"`, you MUST render a barbell or weight anchored to his hands.
- **Zero Floating Characters (Floor Grounding & Contact Shadows):**
  - Every side-view scene must have a defined `floorY` coordinate (e.g., `floorY = 840`). The stickman's `y` prop MUST equal `floorY` so his feet plant firmly on the ground.
  - Always render a soft dark elliptical contact shadow (`<ellipse cx={stickmanX} cy={floorY + 4} rx={36 * scale} ry={7 * scale} fill="rgba(0,0,0,0.35)" />`) directly underneath the stickman and every grounded prop so nothing ever looks like it is floating in mid-air.

---

### 3. SMART 2D CAMERA ANGLES (USE CEILING / TOP-DOWN SHOTS FOR BED & SLEEP SCENES)
- Do not force every scene into a flat side-view if another 2D camera angle looks cleaner and more cinematic:
  - **Top-Down Ceiling Shot (Bird's-Eye View):** Whenever the script shows sleeping, resting in bed, scrolling in bed, or waking up, switch the camera to a **90-degree top-down ceiling shot** looking straight down at a cozy bedroom floor and bed. Place the pillow under the stickman's head, place the stickman on the mattress, and render a curved blanket SVG layer *on top of* the stickman's torso and legs so he is tucked *inside* the bed (never floating above a side-view bed).
  - **Over-the-Shoulder / Close-Up Desk Shot:** When focusing on deep work or screen consumption, cut to a close-up camera framing or angled monitor glow lighting up the stickman.
  - **Wide & Medium Dynamic Tracking Shots:** When the stickman walks (`action="walk"`, `"run"`, or `"walk-sad"`), smoothly interpolate his `x` position across `floorY` while the `CameraRig` pans and zooms smoothly with him.

---

### 4. STRICT ANTI-OVERLAP SPATIAL GRID
- **Never stack or overlap props, icons, text, and the stickman:**
  - Divide the `1920x1080` canvas into clear non-overlapping zones for every beat. For example: if the stickman is on the left (`x = 550`), place the spawned Lucide icons / dynamic graphs / frameless callout text on the right (`x = 1150` to `1450`), with at least `180px` of clean breathing room between the character's outstretched hand and the prop.
  - When transitioning to a new visual idea within a scene, either animate the old prop's scale/opacity down to `0` BEFORE the new prop springs in, OR pan the camera into fresh empty canvas space so old and new objects never collide.
  - Keep all text and icons strictly inside the central `1600x900` safe area after camera zoom/pan calculations.

---

### 5. EXPERT LIGHTING & SMOOTH BEZIER GEOMETRY
- Draw all environments (mountains, rolling hills, trees, furniture, lamps) using smooth cubic/quadratic Bezier curves (`C` and `Q` SVG paths)—never jagged sharp triangles.
- Add cinematic lighting to every environment: warm overhead pendant light cones (`linearGradient` / `radialGradient` with low opacity), bedside lamp glow in ceiling shots, dramatic rim lighting in dark/stormy scenes, and subtle atmospheric depth, while keeping the stickman himself flat matte `#FF6B00`.

---

### 6. MANDATORY VISUAL QA LOOP (DO NOT BE LAZY)
1. Map out 40+ dynamic visual micro-beats from `0.00s` to `108.47s` using `public/current/timestamps.json`.
2. Run `npx tsc --noEmit` to verify 0 TypeScript errors.
3. Render at least 15 still frames across the video using `--browser-executable="C:\Program Files\Google\Chrome\Application\chrome.exe"` via the CLI (do NOT save `setBrowserExecutable` in `remotion.config.ts`).
4. **Inspect every single rendered PNG with your vision tool.** Check specifically for:
   - Any overlapping text, icons, or props.
   - Any floating stickman or missing contact shadows.
   - Any mimed actions missing their prop (e.g., typing without a desk/laptop, sitting on air, floating on a bed).
   - Any leftover presentation boxes, borders, or subtitles.
   If you spot even a minor flaw in any frame, fix the coordinates, re-render the still, and inspect it again until all 15+ test frames look like a professional YouTube animation studio produced them.

---

### 7. LOCKED CHARACTER ENGINE (`src/components/character/StickmanIK.tsx`)
- **NEVER edit `StickmanIK.tsx` or write custom stickman limb math.** Always import `<StickmanIK />` from `src/components/character/StickmanIK`.
- The character automatically renders in flat matte tangerine orange (`#FF6B00`) with seamless limb-to-torso joints and **two black circular eyes** that track targets.
- **17 Built-In Actions (`action` prop):**
  - `'idle'`, `'walk'`, `'run'`, `'walk-sad'`, `'think'`, `'idea'`, `'explain'`, `'wave'`, `'shrug'`, `'stressed'`, `'slump'`, `'sit'`, `'work'`, `'push'`, `'lift'`, `'celebrate'`, `'sleep'`.
- **6 Composable Dynamic Modifiers (can be combined with ANY action):**
  - `pointAt={{ x, y }}`, `secondaryPointAt={{ x, y }}`, `lookAt={{ x, y }}`, `speed={number}`, `intensity={number}`, `lean={number}`.
