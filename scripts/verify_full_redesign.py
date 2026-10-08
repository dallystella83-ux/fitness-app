import re
import sys

print("=========================================================================")
print(" VERIFYING PREMIUM FITGUIDE AI REDESIGN & FEATURE UPGRADES")
print("=========================================================================")

errors = []

# 1. Verify index.html requirements
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Opening visual & text
if "ENERGY &amp; PERSISTENCE" in html and "BUILD A STRONGER YOU" in html:
    print(" [PASS] Splash screen opening minimal text found")
else:
    errors.append("Splash screen opening text missing or mismatch")

if "splash-bg" in html and "splash-progress" in html:
    print(" [PASS] Splash screen animation & visual container found")
else:
    errors.append("Splash screen container missing")

# Home minimal requirements
if "Understand your body." in html and "Build better habits." in html:
    print(" [PASS] Home headline found: 'Understand your body. Build better habits.'")
else:
    errors.append("Home headline missing")

if "Create My Plan" in html:
    print(" [PASS] Home CTA button found: 'Create My Plan ->'")
else:
    errors.append("Home CTA missing")

# Dashboard requirements
dashboard_elements = [
    'id="dashboard"',
    'id="dash-workouts-count"',
    'id="dash-summary-cal"',
    'id="dash-minutes-count"',
    'id="dash-weekly-goal-bar"',
    'id="dw-preview-title"',
    'id="dash-workout-cards-grid"',
    'data-filter="beginner"',
    'data-filter="intermediate"',
    'data-filter="advanced"',
    'data-filter="yoga"',
    'data-filter="gentle"'
]

for el in dashboard_elements:
    if el in html:
        print(f" [PASS] Dashboard element verified: {el}")
    else:
        errors.append(f"Dashboard element missing: {el}")

# Monthly Report requirements
report_elements = [
    'id="monthly-report-modal"',
    'rep-month-title',
    'rep-start-weight',
    'rep-curr-weight',
    'rep-total-workouts',
    'rep-total-minutes',
    'rep-total-calories',
    'rep-cal-targets',
    'rep-pro-targets',
    'rep-yoga-sessions',
    'rep-gentle-sessions',
    'rep-days-matrix',
    'rep-exercise-table-body',
    'rep-achievements-container',
    'rep-insights-list'
]

for el in report_elements:
    if el in html:
        print(f" [PASS] Monthly Report element verified: {el}")
    else:
        errors.append(f"Monthly Report element missing: {el}")

# Auth & Profile requirements
auth_elements = [
    'id="auth-modal"',
    'id="signout-modal"',
    'confirmSignOut',
    'showAuthModal'
]

for el in auth_elements:
    if el in html:
        print(f" [PASS] Auth & Signout element verified: {el}")
    else:
        errors.append(f"Auth element missing: {el}")

# Bottom nav requirements
bottom_nav = [
    'id="bottom-nav"',
    'id="bnav-home"',
    'id="bnav-dashboard"',
    'id="bnav-assistant"',
    'id="bnav-profile"'
]

for el in bottom_nav:
    if el in html:
        print(f" [PASS] Bottom navigation element verified: {el}")
    else:
        errors.append(f"Bottom navigation element missing: {el}")

# 2. Verify js/app.js logic
with open("js/app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

js_features = [
    "getExercisePhoto",
    "generateMonthlyReport",
    "viewMonthlyReport",
    "downloadMonthlyReport",
    "shareMonthlyReport",
    "loginUser",
    "executeSignOut",
    "confirmSignOut",
    "dash-workout-cards-grid",
    "rep-achievements-container",
    "rep-insights-list"
]

for feat in js_features:
    if feat in app_js:
        print(f" [PASS] App JS feature verified: {feat}")
    else:
        errors.append(f"App JS feature missing: {feat}")

# 3. Verify data.js sex mappings
with open("js/data.js", "r", encoding="utf-8") as f:
    data_js = f.read()

if "const maleImages =" in data_js and "const femaleImages =" in data_js:
    print(" [PASS] Sex-adaptive image mappings found (maleImages & femaleImages)")
else:
    errors.append("Sex-adaptive image mappings missing in data.js")

if "ex_squat_male.jpg" in data_js and "ex_squat_female.jpg" in data_js:
    print(" [PASS] Specific male and female exercise photos verified in data.js")
else:
    errors.append("Specific male/female photos missing in data.js")

print("\n-------------------------------------------------------------------------")
if errors:
    print(f" [FAIL] Found {len(errors)} errors:")
    for err in errors:
        print(f"   - {err}")
    sys.exit(1)
else:
    print(" ALL VERIFICATIONS PASSED WITH 100% SUCCESS!")
print("=========================================================================")
