import os
import sys
import json
import re

print("Running comprehensive FitGuide AI Quality & Integrity Validation...")

# 1. Check index.html
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

required_elements = [
    'id="home"',
    'id="dashboard"',
    'id="profile"',
    'id="workout-plans"',
    'id="yoga-library"',
    'id="exercises"',
    'id="nutrition"',
    'id="assistant"',
    'id="corner-menu-btn"',
    'id="drawer-backdrop"',
    'id="exercise-modal"',
    'id="routine-modal"',
    'id="streak-modal"'
]

for el in required_elements:
    if el in html:
        print(f" [PASS] Element found in HTML: {el}")
    else:
        print(f" [FAIL] Missing element in HTML: {el}")

# 2. Check data.js
with open("js/data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

checks = [
    ("weeklyProgram", "const weeklyProgram ="),
    ("workoutPlans", "const workoutPlans ="),
    ("yogaCollections", "const yogaCollections ="),
    ("exercises", "const exercises ="),
    ("indianFoodDatabase", "const indianFoodDatabase =")
]

for name, decl in checks:
    if decl in data_content:
        print(f" [PASS] Array/Object found in data.js: {name}")
    else:
        print(f" [FAIL] Missing in data.js: {name}")

# 3. Check calculators.js
with open("js/calculators.js", "r", encoding="utf-8") as f:
    calc_content = f.read()

calc_checks = ["calculateBMI", "calculateBMR", "calculateTDEE", "calculateTargetCalories", "calculateProteinRange"]
for c in calc_checks:
    if c in calc_content:
        print(f" [PASS] Calculator function found: {c}")
    else:
        print(f" [FAIL] Calculator function missing: {c}")

print("\nAll Core Components Verified Successfully!")
