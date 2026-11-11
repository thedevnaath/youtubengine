import json

with open('public/current/timestamps.json', 'r', encoding='utf-8') as f:
    ts = json.load(f)

print(f"Total words: {len(ts)}")
total_duration = ts[-1]['end']
print(f"Duration: {total_duration:.2f}s ({round(total_duration * 30)} frames @ 30fps)\n")

# Let's map out exactly 40+ micro beats
beats = [
    # Act 1: The One Habit Paradox (0.00s - 11.34s, f0 - f340)
    {"id": 1, "start_w": "You're", "end_w": "everything.", "desc": "Wide track shot: Stickman walks on green hill towards dawn horizon"},
    {"id": 2, "start_w": "Not", "end_w": "habits,", "desc": "Frameless text + 5 checklist items crossed out on right"},
    {"id": 3, "start_w": "not", "end_w": "challenge,", "desc": "Lucide Calendar with '30 DAYS' and dynamic red slash"},
    {"id": 4, "start_w": "not", "end_w": "morning", "desc": "Lucide AlarmClock ringing at 4:00 AM, stickman shrugs/shakes head"},
    {"id": 5, "start_w": "just", "end_w": "one,", "desc": "Stickman think pose, glowing golden key/beacon appears"},
    {"id": 6, "start_w": "but", "end_w": "think.", "desc": "Full-screen kinetic typography burst: JUST ONE HABIT / Not the one you think"},

    # Act 2: The Motivation Trap & Keystone Habit (11.34s - 30.80s, f340 - f924)
    {"id": 7, "start_w": "Most", "end_w": "motivation,", "desc": "Stickman leaning hard (action='push') pushing massive 'MOTIVATION' boulder uphill"},
    {"id": 8, "start_w": "and", "end_w": "fails.", "desc": "Boulder rolls back, stickman exhausted (action='slump') with dust clouds"},
    {"id": 9, "start_w": "The", "end_w": "shift", "desc": "Camera cuts to modern studio desk, stickman seated (action='explain')"},
    {"id": 10, "start_w": "when", "end_w": "habits.", "desc": "Golden Keystone Gear spawns floating at right, driving smaller satellite gears"},
    {"id": 11, "start_w": "That", "end_w": "output.", "desc": "Full-screen Kinetic Typography Burst: DAILY NON-NEGOTIABLE OUTPUT"},
    {"id": 12, "start_w": "Every", "end_w": "something,", "desc": "Studio desk shot: Stickman typing at laptop (action='work', chair, desk, laptop)"},
    {"id": 13, "start_w": "not", "end_w": "consume,", "desc": "Red crossed-out glowing phone at left with 'CONSUME'"},
    {"id": 14, "start_w": "produce.", "end_w": "produce.", "desc": "Vibrant glowing artifact at right with 'PRODUCE', stickman points firmly"},

    # Act 3: Units of Daily Output (30.80s - 43.80s, f924 - f1314)
    {"id": 15, "start_w": "What", "end_w": "output?", "desc": "Output arena: Stickman center shrugs (action='shrug'), frameless text 'WHAT COUNTS AS OUTPUT?'"},
    {"id": 16, "start_w": "One", "end_w": "written,", "desc": "Document icon floating with '1 PAGE WRITTEN', stickman points left"},
    {"id": 17, "start_w": "one", "end_w": "done,", "desc": "Dumbbell weight icon with '1 WORKOUT DONE', stickman curls/points"},
    {"id": 18, "start_w": "one", "end_w": "practiced,", "desc": "Target/Code icon with '1 SKILL PRACTICED'"},
    {"id": 19, "start_w": "one", "end_w": "made,", "desc": "Phone call icon with '1 SALES CALL MADE'"},
    {"id": 20, "start_w": "one", "end_w": "edited,", "desc": "Video timeline play icon with '1 VIDEO EDITED'"},
    {"id": 21, "start_w": "one", "end_w": "executed.", "desc": "Lightbulb lightning spark icon with '1 IDEA EXECUTED'"},
    {"id": 22, "start_w": "Small", "end_w": "fine,", "desc": "Stickman holds tiny bright glowing green pixel (+0.01)"},
    {"id": 23, "start_w": "but", "end_w": "not.", "desc": "Massive red stark 'ZERO = 0' warning, stickman shakes head"},

    # Act 4: The 4 Pillars of Transformation (43.80s - 72.72s, f1314 - f2182)
    {"id": 24, "start_w": "Here's", "end_w": "everything.", "desc": "Architectural arena, stickman walking forward confidently"},
    {"id": 25, "start_w": "First,", "end_w": "overthinking.", "desc": "Frameless bold text '1. KILLS OVERTHINKING'"},
    {"id": 26, "start_w": "You", "end_w": "morning", "desc": "90-DEGREE TOP-DOWN CEILING SHOT: Cozy bedroom, bed, pillow, stickman tucked in bed with blanket, phone reads 2:00 AM"},
    {"id": 27, "start_w": "and", "end_w": "afternoon.", "desc": "Cut to daylit studio desk: Stickman typing at laptop (action='work'), window sunlight, clock reads 2:00 PM"},
    {"id": 28, "start_w": "Second,", "end_w": "proof.", "desc": "Frameless bold text '2. BUILDS PROOF', stickman standing grounded"},
    {"id": 29, "start_w": "Confidence", "end_w": "affirmations.", "desc": "Fluffy thought bubbles ('I am rich', 'I am great') dissolving into smoke"},
    {"id": 30, "start_w": "It", "end_w": "evidence.", "desc": "Heavy solid granite output brick slams to ground with impact shadow"},
    {"id": 31, "start_w": "Third,", "end_w": "compounds.", "desc": "Frameless bold text '3. IT COMPOUNDS'"},
    {"id": 32, "start_w": "365", "end_w": "advantage.", "desc": "Dynamic LiveLineChart draws steep exponential curve surging to day 365"},
    {"id": 33, "start_w": "And", "end_w": "identity.", "desc": "Frameless bold text '4. REWIRES IDENTITY'"},
    {"id": 34, "start_w": "You", "end_w": "disciplined.", "desc": "Dissolving ghost text: 'I want to be disciplined...'"},
    {"id": 35, "start_w": "And", "end_w": "daily.", "desc": "Stickman stands tall in hero pose (action='celebrate' / confident gaze) with golden aura"},

    # Act 5: Infinite Consumption & The Bad Day Rule (72.72s - 92.24s, f2182 - f2767)
    {"id": 36, "start_w": "Most", "end_w": "talent.", "desc": "Moody dark environment, stickman looking at empty frame"},
    {"id": 37, "start_w": "It's", "end_w": "consumption.", "desc": "Massive dark spiral vortex / black hole appears"},
    {"id": 38, "start_w": "Scrolling,", "end_w": "restarting.", "desc": "6 feeds/icons orbiting in endless spinning vortex, stickman stressed (action='stressed')"},
    {"id": 39, "start_w": "You", "end_w": "information.", "desc": "Towering stack of unread books/tabs collapses and vanishes"},
    {"id": 40, "start_w": "You", "end_w": "rule.", "desc": "Dramatic single spotlight cuts through the darkness onto stickman"},
    {"id": 41, "start_w": "No", "end_w": "output.", "desc": "Full-screen Kinetic Typography Burst: NO DAY WITHOUT OUTPUT"},
    {"id": 42, "start_w": "Even", "end_w": "days,", "desc": "Rainy storm environment, rain streaks, stickman pushing through rain (action='walk-sad')"},
    {"id": 43, "start_w": "especially", "end_w": "days.", "desc": "Stickman sits at rain-sheltered desk under warm lantern, typing through storm (action='work')"},

    # Act 6: The 1-Year Volume Exponential (92.24s - 101.96s, f2767 - f3059)
    {"id": 44, "start_w": "The", "end_w": "different.", "desc": "Sunrise break on golden mountain summit, camera wide pan"},
    {"id": 45, "start_w": "Not", "end_w": "motivation,", "desc": "'MOTIVATION' vaporizes in golden light"},
    {"id": 46, "start_w": "but", "end_w": "volume.", "desc": "Towering skyscraper of 365 stacked golden output blocks erupts upward with LiveBarVolume"},

    # Act 7: The Grand Call To Action (101.96s - 108.47s, f3059 - f3254)
    {"id": 47, "start_w": "Now", "end_w": "honestly,", "desc": "Camera zooms tight to medium close-up, stickman turns and looks straight at viewer"},
    {"id": 48, "start_w": "what", "end_w": "be?", "desc": "Kinetic burst & frameless in-world question: WHAT IS YOUR DAILY NON-NEGOTIABLE OUTPUT?"}
]

print(f"Total mapped micro-beats: {len(beats)}")

# Find exact frame anchors
print("--- EXACT FRAME ANCHORS ---")
target_words = [
    ("everything.", "End Beat 1"),
    ("habits,", "End 5 habits"),
    ("challenge,", "End 30-day challenge"),
    ("morning", "End 4am morning"),
    ("think.", "End Act 1"),
    ("motivation,", "Motivation push"),
    ("fails.", "Motivation fails slump"),
    ("habits.", "Keystone gear controls habits"),
    ("output.", "Non-negotiable output burst"),
    ("produce.", "Produce not consume"),
    ("output?", "What counts as output?"),
    ("written,", "1 page written"),
    ("done,", "1 workout done"),
    ("practiced,", "1 skill practiced"),
    ("made,", "1 sales call made"),
    ("edited,", "1 video edited"),
    ("executed.", "1 idea executed"),
    ("fine,", "Small is fine"),
    ("not.", "Zero is not"),
    ("First,", "Pillar 1 start"),
    ("overthinking.", "Kills overthinking"),
    ("afternoon.", "2pm in afternoon"),
    ("Second,", "Pillar 2 start"),
    ("evidence.", "Evidence bricks"),
    ("Third,", "Pillar 3 start"),
    ("advantage.", "Unfair advantage compounding"),
    ("fourth,", "Pillar 4 start"),
    ("daily.", "Produces daily identity"),
    ("talent.", "Not a lack of talent"),
    ("consumption.", "Infinite consumption vortex"),
    ("restarting.", "Restarting loop"),
    ("information.", "Not more information"),
    ("rule.", "One rule"),
    ("output.", "No day without output"),
    ("days.", "Bad days"),
    ("different.", "One year life different"),
    ("volume.", "Because of volume"),
    ("honestly,", "Ask yourself honestly"),
    ("be?", "Grand CTA end")
]

w_idx = 0
for search_w, label in target_words:
    while w_idx < len(ts):
        w = ts[w_idx]
        if search_w in w['word']:
            f_start = round(w['start'] * 30)
            f_end = round(w['end'] * 30)
            print(f"{label:32s}: {w['start']:6.2f}s - {w['end']:6.2f}s | frame {f_start:4d} - {f_end:4d} | word: '{w['word']}'")
            w_idx += 1
            break
        w_idx += 1
