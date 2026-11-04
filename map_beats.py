import json

ts = json.load(open('public/current/timestamps.json', encoding='utf-8'))
print(f"Total words: {len(ts)}")
print(f"Total duration: {ts[-1]['end']}s ({round(ts[-1]['end'] * 30)} frames @ 30fps)\n")

# Group words into natural micro-beats
sentences = []
cur = []
for w in ts:
    cur.append(w)
    # split on sentence punctuation or major pauses
    word_text = w['word']
    if any(word_text.endswith(p) for p in ['.', '?', '!', '”', '"']) or (len(cur) > 1 and w['start'] - cur[-2]['end'] > 0.45):
        text = ' '.join(x['word'] for x in cur)
        sentences.append((cur[0]['start'], cur[-1]['end'], text, cur[0], cur[-1]))
        cur = []
if cur:
    text = ' '.join(x['word'] for x in cur)
    sentences.append((cur[0]['start'], cur[-1]['end'], text, cur[0], cur[-1]))

for i, (s, e, text, first_w, last_w) in enumerate(sentences):
    sf = round(s * 30)
    ef = round(e * 30)
    print(f"Beat {i+1:02d}: {s:6.2f}s - {e:6.2f}s (f{sf:4d} - f{ef:4d}, {ef-sf:3d} frames) | {text}")

