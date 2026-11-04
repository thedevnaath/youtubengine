# MANDATORY VIDEO PRODUCTION & ANIMATION RULES (NON-NEGOTIABLE)

You MUST read and obey every rule in this document BEFORE planning, WHILE writing code, and AFTER completing work. Do NOT take shortcuts, do NOT compress long scripts into a few static scenes, and do NOT produce slideshow/presentation layouts. This is high-retention YouTube animation in the style of MagnatesMedia and top-tier motion graphics channels.

## 1. STICKMAN ANATOMY & KINEMATICS (STRICT VISUAL & MATH RULES)
- **Match User Reference Image:** Always inspect the user's provided stickman reference image and match its head-to-body proportions, stroke thickness, and minimalist silhouette.
- **Flat Matte Tangerine Color:** The stickman must be rendered in flat, matte tangerine orange (`#FF6B00`). 
- **ZERO Glow / ZERO Shine / ZERO Gradients on Stickman:** Never apply `drop-shadow`, radial glows, specular highlights, or shiny gradients to the stickman.
- **ZERO Visible Joints:** Never render circles or dots at the shoulders, elbows, hips, or knees.
- **Zero Disappearing Body Parts (Continuous SVG Path Rule):** 
  - The torso MUST NEVER disappear or detach from the head or hips. 
  - Render limbs as continuous, unified SVG `<path>` elements (`M shoulderX shoulderY L elbowX elbowY L wristX wristY` and `M hipX hipY L kneeX kneeY L ankleX ankleY L footX footY`) with `fill="none"`, `stroke="#FF6B00"`, `strokeLinecap="round"`, and `strokeLinejoin="round"`. Because `strokeLinejoin="round"` is used on a continuous path, joints bend seamlessly like a real cartoonist's drawing without any visible circles or gaps.
  - Render the torso as a valid numeric SVG quadratic curve (`M neckX neckY Q spineControlX spineControlY pelvX pelvY`) where every coordinate is a guaranteed finite number (never `NaN` or `undefined`).
- **Strictly No Face:** No eyes, mouth, or facial features. Express emotion entirely through head tilt, spine curvature, posture, and hand/leg movement.
- **Natural Locomotion & Action:** The stickman must never stand frozen in the same spot across the video. It must physically walk across the screen ( translating `x` coordinate while cycling legs and swinging arms in opposite phase), sit down on chairs/surfaces, lean, shrug, and actively point its hand toward icons and objects as they appear.
- **Multiple Stickmen:** Only introduce secondary stickmen when the script explicitly contrasts one person against a crowd or another character.

## 2. NO SUBTITLES & NO PRESENTATION SLIDESHOW BOXES
- **ZERO Subtitles:** Do NOT render lower-third subtitle bars or word-by-word captions anywhere in the video.
- **ZERO Presentation Cards / Bullet Boxes:** Never build slideshows of rectangular cards with paragraphs, bullet points, or short explanation boxes.
- **How Text Must Be Used:**
  1. **Minimal In-World Labels:** Only 1 to 3 words maximum (key terms or numbers) appearing dynamically next to an icon or object when spoken.
  2. **Kinetic Typography Punch-Ins:** When the narrator delivers a crucial 2–5 word thesis or turning point, cut or zoom into a clean, solid-colored background and animate those exact words with heavy, rhythmic kinetic typography synced to the exact millisecond timestamps in `timestamps.json`.

## 3. CONTINUOUS SPATIAL STORYTELLING & 2D CAMERA ANGLES (MAGNATESMEDIA STYLE)
- **Do Not Divide Into Long Static Scenes:** Never break a 2-to-5-minute video into 6 or 7 long static scenes. A 100+ second video requires **35 to 55 distinct visual micro-beats** (a new visual action, camera move, prop spawn, or gesture every 2 to 4 seconds).
- **Spatial Camera Transitions:** Instead of hard-cutting between static slides, use a continuous 2D world canvas. To transition to a new concept, smoothly pan or zoom the camera into open space while animating old props out (`scale` down / `opacity` fade) and springing new objects/icons in dynamically.
- **2D Camera Shot Variety:** Dynamically alternate between:
  - **Wide Shots:** Showing the full stickman walking through the environment.
  - **Medium Shots:** Waist-up framing when the stickman interacts with floating icons (like pointing at a red Lucide Calendar icon).
  - **Close-Up Shots:** Framing the stickman's upper torso/head tilt or zooming tight onto an animated object/graph.
- **Strict Safe-Area Bounds (Nothing Goes Off-Screen):**
  - When zooming (`scale`) or panning (`translateX`, `translateY`), ALWAYS calculate the camera transform around the exact focal target `(focusX, focusY)` so the active subject, icon, and kinetic text are centered inside the `1920x1080` viewport.
  - All text and key icons must remain strictly inside a `1600x900` central safe zone (at least `160px` horizontal margin and `90px` vertical margin from screen edges after camera transforms).

## 4. LITERAL VISUAL METAPHORS, LUCIDE ICONS & SMOOTH CURVED GEOMETRY
- **Act Out Every Spoken Phrase:** Read `timestamps.json` word-by-word. When the voiceover says *"not a thirty-day challenge"*, spawn a red Lucide `Calendar` icon beside the stickman at that exact timestamp, animate the stickman turning and pointing directly at it, and slash/cross it out dynamically. Every sentence must have a matching visual prop, icon, or physical action.
- **Smooth Curved Background Geometry:** Never draw jagged triangles or sharp polygon peaks for mountains, hills, trees, or props. Always use smooth cubic/quadratic Bezier curves (`C` and `Q` in SVG paths) and rounded corners (`rx`/`ry`) so every environment (green fields, rolling mountains, studio interiors, houses) looks organic and crafted by an illustrator.
- **Expert Lighting:** Apply atmospheric depth to backgrounds (soft sky gradients, subtle warm window light cones, ambient vignette) while keeping the stickman completely flat matte tangerine.
- **100% Dynamic Graphs & Charts:** Never display a pre-drawn static chart. Every line graph must draw its path live across frames (`strokeDasharray` / `strokeDashoffset`), and every bar or counter must animate from `0` in sync with the narrator's words.

## 5. MANDATORY PRE-DELIVERY VERIFICATION
Before finishing your work, you MUST:
1. Run `npx tsc --noEmit` to confirm 0 TypeScript errors.
2. Render at least 12 sample still frames across different timestamps (including mid-walk, pointing at icons, close-ups, and kinetic text screens) and visually inspect those PNGs yourself to verify that:
   - The stickman's torso is 100% intact and attached in every frame.
   - No joints or glow effects exist on the stickman.
   - Zero text or icons are clipped or pushed off the edges of the 1920x1080 frame.
   - Zero subtitle bars or presentation text boxes exist.