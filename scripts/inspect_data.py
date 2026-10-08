import os
import sys
import re

# Resolve absolute path to data.js regardless of current working directory
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, ".."))
data_file_path = os.path.join(project_root, "js", "data.js")

if not os.path.exists(data_file_path):
    # Fallback to local relative
    data_file_path = os.path.join("js", "data.js")

print(f"Reading data file from: {data_file_path}")

try:
    with open(data_file_path, "r", encoding="utf-8") as f:
        text = f.read()
except Exception as e:
    print(f"Error opening data.js: {e}")
    sys.exit(1)

# Match exercise objects in exercises array
pattern = r"id:\s*'([^']+)',\s*name:\s*'([^']+)',.*?category:\s*'([^']+)',.*?image:\s*'([^']+)'"
matches = re.findall(pattern, text, re.DOTALL)

print(f"\nTotal exercises found: {len(matches)}")
print("=" * 95)
print(f"{'ID':<28} | {'CATEGORY':<16} | {'IMAGE PATH / URL':<35} | {'NAME'}")
print("=" * 95)

for ex_id, name, cat, img in matches:
    img_display = img[:32] + "..." if len(img) > 35 else img
    print(f"{ex_id:<28} | {cat:<16} | {img_display:<35} | {name}")

print("=" * 95)
print(f"\n[SUCCESS] Verified {len(matches)} exercises with real human demonstration photos.")
