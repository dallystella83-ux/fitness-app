import re
import json

with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Find the exercises array
m = re.search(r'const exercises = \[(.*?)\];\s*(?:const|let|var|\/\/|function)', text, re.DOTALL)
if m:
    content = m.group(1)
    blocks = re.findall(r'\{\s*id:\s*\'([^\']+)\',\s*name:\s*\'([^\']+)\'.*?category:\s*\'([^\']+)\'.*?image:\s*\'([^\']+)\'', content, re.DOTALL)
    print(f"Total exercises extracted: {len(blocks)}")
    with open('scripts/exercises_list.json', 'w', encoding='utf-8') as f:
        json.dump([{'id': b[0], 'name': b[1], 'category': b[2], 'image': b[3]} for b in blocks], f, indent=2)
    for b in blocks:
        print(f"{b[0]:<30} | {b[2]:<16} | {b[3]:<45} | {b[1]}")
else:
    print("Could not find const exercises = [...]")
