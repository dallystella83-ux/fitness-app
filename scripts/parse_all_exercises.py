import re
import json

with open('js/data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

exercises = []
current = {}
in_all_exercises = False

for line in lines:
    if 'const allExercises =' in line:
        in_all_exercises = True
        continue
    if in_all_exercises and line.strip().startswith('const '):
        in_all_exercises = False
        break
    if in_all_exercises:
        m_id = re.search(r"id:\s*'([^']+)'", line)
        m_name = re.search(r"name:\s*'([^']+)'", line)
        m_cat = re.search(r"category:\s*'([^']+)'", line)
        m_img = re.search(r"image:\s*'([^']+)'", line)
        if m_id:
            if current.get('id'):
                exercises.append(current)
                current = {}
            current['id'] = m_id.group(1)
        if m_name:
            current['name'] = m_name.group(1)
        if m_cat:
            current['category'] = m_cat.group(1)
        if m_img:
            current['image'] = m_img.group(1)

if current.get('id'):
    exercises.append(current)

print(f"Total found in allExercises: {len(exercises)}")
with open('scripts/all_exercises.json', 'w', encoding='utf-8') as out:
    json.dump(exercises, out, indent=2)

for ex in exercises:
    print(f"{ex.get('id',''):<32} | {ex.get('category',''):<18} | {ex.get('name','')}")
