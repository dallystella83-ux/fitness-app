import os
import json

with open('scripts/exercises_list.json', 'r', encoding='utf-8') as f:
    exercises = json.load(f)

print(f"Total exercises: {len(exercises)}")
for e in exercises:
    img = e.get('image', '')
    exists = os.path.exists(img)
    is_svg = img.endswith('.svg')
    print(f"{e['id']:<30} | is_svg: {str(is_svg):<5} | Exists: {str(exists):<5} | {e['name']}")
