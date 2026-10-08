import os

new_visuals = [
    # HOME WORKOUT EXERCISES
    {
        "filename": "ex_crunches.svg",
        "title": "Abdominal Crunches",
        "cat": "Core",
        "intensity": "Moderate",
        "start_desc": "Lie on back, knees bent, feet flat, hands behind head",
        "main_desc": "Curl shoulders and upper ribs off the floor toward pelvis",
        "cue": "Keep chin off chest, look diagonally up, exhale on crunch",
        "type": "crunches"
    },
    {
        "filename": "ex_wall_sit.svg",
        "title": "Wall Sit",
        "cat": "Strength",
        "intensity": "Moderate",
        "start_desc": "Back flat against sturdy wall, feet 2 feet forward",
        "main_desc": "Slide down until thighs are parallel to ground (90° knee bend)",
        "cue": "Knees over ankles, back firmly pressed against wall, breathe",
        "type": "wall_sit"
    },
    {
        "filename": "ex_situps.svg",
        "title": "Sit-ups",
        "cat": "Core",
        "intensity": "Moderate",
        "start_desc": "Lie flat on back, knees bent, feet anchored or flat",
        "main_desc": "Engage abdominals to lift entire torso up to touch knees",
        "cue": "Avoid pulling on neck, control the lowering phase down",
        "type": "situps"
    },
    {
        "filename": "ex_butt_kicks.svg",
        "title": "Butt Kicks",
        "cat": "Cardio",
        "intensity": "Moderate",
        "start_desc": "Stand tall, feet hip-width apart, arms at sides",
        "main_desc": "Jog in place, snapping heels upward toward glutes",
        "cue": "Stay light on balls of feet, pump arms, knees point down",
        "type": "butt_kicks"
    },
    {
        "filename": "ex_chair_squats.svg",
        "title": "Chair Squats",
        "cat": "Strength",
        "intensity": "Gentle",
        "start_desc": "Stand just in front of chair, feet shoulder-width",
        "main_desc": "Hinge hips back, tap chair seat lightly, stand back up",
        "cue": "Keep weight in heels, chest upright, knees tracking toes",
        "type": "chair_squats"
    },
    {
        "filename": "ex_knee_plank.svg",
        "title": "Knee Plank",
        "cat": "Core",
        "intensity": "Gentle",
        "start_desc": "Forearms on ground, knees resting behind hips on mat",
        "main_desc": "Hold straight line from crown through torso down to knees",
        "cue": "Brace abdominals, prevent lower back from sagging",
        "type": "knee_plank"
    },
    {
        "filename": "ex_step_jacks.svg",
        "title": "Step Jacks (Low Impact)",
        "cat": "Cardio",
        "intensity": "Gentle",
        "start_desc": "Stand tall, feet together, arms resting at sides",
        "main_desc": "Step right foot wide while raising arms, return, step left",
        "cue": "No jumping impact, gentle rhythmic cardio flow",
        "type": "step_jacks"
    },
    {
        "filename": "ex_supported_lunges.svg",
        "title": "Supported Lunges",
        "cat": "Strength",
        "intensity": "Low",
        "start_desc": "Stand holding chair back or wall with one hand",
        "main_desc": "Step back into split stance, lower hips partially, press up",
        "cue": "Use hand for balance stability, front heel stays glued down",
        "type": "supported_lunges"
    },

    # YOGA FLOW POSES
    {
        "filename": "yoga_three_legged_dog.svg",
        "title": "Three-Legged Downward Dog",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Downward-Facing Dog position, hands grounded shoulder-width",
        "main_desc": "Inhale and lift one leg straight up and back toward the sky",
        "cue": "Keep hips square to the mat, press evenly through both hands",
        "type": "three_legged_dog"
    },
    {
        "filename": "yoga_knee_to_nose.svg",
        "title": "Knee-to-Nose Dog",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "From Three-Legged Dog, high plank alignment",
        "main_desc": "Exhale, shift shoulders over wrists, round spine, draw knee to nose",
        "cue": "Press floor away with hands, dome upper back, engage core",
        "type": "knee_to_nose"
    },
    {
        "filename": "yoga_crescent_moon.svg",
        "title": "Crescent Moon (Anjaneyasana)",
        "cat": "Yoga",
        "intensity": "Low",
        "start_desc": "Low lunge with back knee down, untuck back toes",
        "main_desc": "Sweep arms overhead, lift chest, gentle arch in upper back",
        "cue": "Sink hips forward and down, keep lower back lengthened",
        "type": "crescent_moon"
    },
    {
        "filename": "yoga_revolved_lunge.svg",
        "title": "Revolved Lunge (Parivrtta Anjaneyasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Low or high lunge, right foot forward, left hand on mat",
        "main_desc": "Twist torso to the right, reach right arm up to the sky",
        "cue": "Crown reaches forward, gaze up along right fingertips",
        "type": "revolved_lunge"
    },
    {
        "filename": "yoga_crescent_lunge_twist.svg",
        "title": "Crescent Lunge Twist",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "High lunge, back leg strong and straight, palms in prayer",
        "main_desc": "Hook opposite elbow outside front thigh, press palms to rotate",
        "cue": "Lengthen spine before twisting, keep back heel lifted high",
        "type": "lunge_twist"
    },
    {
        "filename": "yoga_knees_chest_chin.svg",
        "title": "Knees-Chest-Chin (Ashtanga Namaskara)",
        "cat": "Yoga",
        "intensity": "Low",
        "start_desc": "Plank position, core engaged",
        "main_desc": "Lower knees, then chest and chin to floor, elbows hugged in",
        "cue": "Keep hips elevated slightly, glide forward into Cobra",
        "type": "knees_chest_chin"
    },
    {
        "filename": "yoga_pigeon_pose.svg",
        "title": "Pigeon Pose (Eka Pada Rajakapotasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "From Downward Dog, bring right knee behind right wrist",
        "main_desc": "Slide left leg straight back, square hips, sit tall or fold",
        "cue": "Keep front foot flexed to protect knee, support hip with block if needed",
        "type": "pigeon_pose"
    },
    {
        "filename": "yoga_sleeping_pigeon.svg",
        "title": "Sleeping Pigeon",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "In upright Pigeon pose, hips level and grounded",
        "main_desc": "Walk hands forward, fold torso over front shin, rest forehead",
        "cue": "Release tension in jaw and shoulders, breathe deeply into outer hip",
        "type": "sleeping_pigeon"
    },
    {
        "filename": "yoga_hero_pose.svg",
        "title": "Hero Pose (Virasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Kneel with knees together and feet slightly wider than hips",
        "main_desc": "Sit hips down between heels (or onto a block), spine upright",
        "cue": "Rest hands on thighs, crown tall, breathe smoothly",
        "type": "hero_pose"
    },
    {
        "filename": "yoga_tabletop.svg",
        "title": "Tabletop Pose (Bharmanasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Hands and knees on mat, spine neutral",
        "main_desc": "Wrists under shoulders, knees under hips, flat back like a tabletop",
        "cue": "Gaze between hands, press palms flat, distribute weight evenly",
        "type": "tabletop"
    },
    {
        "filename": "yoga_half_bow.svg",
        "title": "Half Bow (Ardha Dhanurasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Lie on belly or in bird-dog, bend one knee, reach back for ankle",
        "main_desc": "Kick foot into hand to lift chest and thigh gently off the floor",
        "cue": "Keep knees hip-width, engage back extensors, smooth breaths",
        "type": "half_bow"
    },
    {
        "filename": "yoga_standing_forward_fold.svg",
        "title": "Standing Forward Fold (Uttanasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Mountain pose, feet hip-width, hands on hips",
        "main_desc": "Hinge forward from hips, crown toward floor, hands to shins/mat",
        "cue": "Bend knees slightly to keep lower back long and relaxed",
        "type": "forward_fold"
    },
    {
        "filename": "yoga_standing_backbend.svg",
        "title": "Standing Backbend (Anuvittasana)",
        "cat": "Yoga",
        "intensity": "Low",
        "start_desc": "Stand tall, feet grounded, hands supporting lower back",
        "main_desc": "Inhale, lift chest toward ceiling, gentle curve through upper spine",
        "cue": "Support sacrum with palms, avoid compressing lumbar spine",
        "type": "standing_backbend"
    },
    {
        "filename": "yoga_triangle_pose.svg",
        "title": "Triangle Pose (Trikonasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Wide stance, front foot at 90°, back foot at 45°, arms wide",
        "main_desc": "Hinge laterally over front leg, right hand to shin, left arm to sky",
        "cue": "Keep both sides of waist long, imagine leaning against a wall",
        "type": "triangle_pose"
    },
    {
        "filename": "yoga_pyramid_pose.svg",
        "title": "Pyramid Pose (Parsvottanasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Staggered stance 3 feet apart, hips squared directly forward",
        "main_desc": "Hinge forward over straight front leg, hands to blocks or floor",
        "cue": "Draw front hip back, keep spine long, microbend front knee",
        "type": "pyramid_pose"
    },
    {
        "filename": "yoga_crescent_lunge.svg",
        "title": "High Crescent Lunge (Ashta Chandrasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Step one foot forward, back heel lifted high, hips squared",
        "main_desc": "Bend front knee to 90°, sweep arms overhead alongside ears",
        "cue": "Back leg strong and straight, lower belly pulled in and up",
        "type": "crescent_lunge"
    },
    {
        "filename": "yoga_chair_pose.svg",
        "title": "Chair Pose (Utkatasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Stand feet together or hip-width, arms at sides",
        "main_desc": "Bend knees, sink hips back as if sitting, reach arms overhead",
        "cue": "Weight in heels, knees tracking toes, chest proud and lifted",
        "type": "chair_pose"
    },
    {
        "filename": "yoga_runners_lunge.svg",
        "title": "Runner's Lunge",
        "cat": "Yoga",
        "intensity": "Low",
        "start_desc": "Forward fold, step one foot far back, fingertips on mat",
        "main_desc": "Front knee over ankle at 90°, back leg extended, chest open",
        "cue": "Collarbones broad, gaze forward, back heel driving back",
        "type": "runners_lunge"
    },
    {
        "filename": "yoga_revolved_side_angle.svg",
        "title": "Revolved Side Angle (Parivrtta Parsvakonasana)",
        "cat": "Yoga",
        "intensity": "Challenging",
        "start_desc": "Lunge position, torso forward over front thigh",
        "main_desc": "Hook opposite elbow outside front knee, press palms in prayer",
        "cue": "Lengthen spine with every inhale, rotate torso with every exhale",
        "type": "revolved_side_angle"
    },
    {
        "filename": "yoga_low_plank.svg",
        "title": "Four-Limbed Staff / Low Plank (Chaturanga)",
        "cat": "Yoga",
        "intensity": "Challenging",
        "start_desc": "High plank, core braced, gaze slightly forward",
        "main_desc": "Shift forward on toes, bend elbows to 90° hugged against ribs",
        "cue": "Keep body in one straight line, do not let shoulders dip below elbows",
        "type": "low_plank"
    },
    {
        "filename": "yoga_upward_dog.svg",
        "title": "Upward-Facing Dog (Urdhva Mukha Svanasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Prone from Chaturanga, roll over toes to tops of feet",
        "main_desc": "Press into hands, straighten arms, lift thighs and knees off floor",
        "cue": "Roll shoulders back, lift chest through arms, thighs engaged",
        "type": "upward_dog"
    },
    {
        "filename": "yoga_reverse_warrior.svg",
        "title": "Reverse Warrior (Viparita Virabhadrasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Warrior II position with front knee bent at 90°",
        "main_desc": "Slide back hand down back thigh, sweep front arm up and back",
        "cue": "Maintain deep bend in front knee, feel expansive side stretch",
        "type": "reverse_warrior"
    },
    {
        "filename": "yoga_extended_side_angle.svg",
        "title": "Extended Side Angle (Utthita Parsvakonasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Warrior II stance, front knee over ankle",
        "main_desc": "Rest front forearm on front thigh, sweep back arm over ear in line",
        "cue": "Create one straight diagonal line from back heel to top fingertips",
        "type": "extended_side_angle"
    },
    {
        "filename": "yoga_meditation.svg",
        "title": "Meditation / Pranayama",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Sit comfortably cross-legged, spine erect, shoulders relaxed",
        "main_desc": "Rest hands on knees, close eyes softly, observe natural breath",
        "cue": "Inhale slowly for 4 counts, exhale smoothly for 4 counts",
        "type": "meditation"
    },
    {
        "filename": "yoga_seated_pose.svg",
        "title": "Easy Seated Pose (Sukhasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Sit on mat or folded blanket, cross legs comfortably at shins",
        "main_desc": "Sit bones grounded, spine tall, palms resting on knees",
        "cue": "Relax hips and face, lengthen crown toward sky, steady calm breath",
        "type": "seated_pose"
    }
]

def generate_svg(item):
    title = item["title"]
    cat = item["cat"]
    intensity = item["intensity"]
    start_desc = item["start_desc"]
    main_desc = item["main_desc"]
    cue = item["cue"]

    intensity_colors = {
        "Gentle": ("#10b981", "#059669", "rgba(16, 185, 129, 0.15)"),
        "Low": ("#38bdf8", "#0284c7", "rgba(56, 189, 248, 0.15)"),
        "Moderate": ("#f59e0b", "#d97706", "rgba(245, 158, 11, 0.15)"),
        "Challenging": ("#ef4444", "#dc2626", "rgba(239, 68, 68, 0.15)")
    }
    accent_main, accent_dark, accent_bg = intensity_colors.get(intensity, ("#10b981", "#059669", "rgba(16, 185, 129, 0.15)"))

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1329"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="600" height="380" rx="16" fill="url(#bg-grad)" stroke="#334155" stroke-width="1.5"/>
  <line x1="40" y1="260" x2="560" y2="260" stroke="#334155" stroke-width="1" stroke-dasharray="4,4"/>
  <circle cx="300" cy="180" r="140" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="6,6"/>

  <rect x="24" y="20" width="552" height="48" rx="8" fill="url(#card-grad)" stroke="#334155" stroke-width="1"/>
  <text x="40" y="49" font-family="Inter, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#f8fafc">{title}</text>
  
  <rect x="420" y="30" width="70" height="26" rx="13" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="455" y="47" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">{cat}</text>
  
  <rect x="498" y="30" width="68" height="26" rx="13" fill="{accent_bg}" stroke="{accent_main}" stroke-width="1.5"/>
  <text x="532" y="47" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="{accent_main}">{intensity}</text>

  <!-- Left: Starting Position -->
  <g transform="translate(40, 85)">
    <rect width="210" height="185" rx="12" fill="#1e293b" fill-opacity="0.6" stroke="#334155" stroke-width="1"/>
    <rect x="12" y="12" width="100" height="22" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1"/>
    <text x="20" y="27" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#94a3b8">1. START POSITION</text>

    <g transform="translate(105, 115)">
      <circle cx="0" cy="-60" r="12" fill="#64748b" opacity="0.9"/>
      <line x1="0" y1="-48" x2="0" y2="0" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
      <path d="M 0 -42 L -18 -15 L -20 10" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
      <path d="M 0 -42 L 18 -15 L 20 10" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
      <path d="M 0 0 L -14 30 L -14 65" fill="none" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
      <path d="M 0 0 L 14 30 L 14 65" fill="none" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="0" cy="70" rx="28" ry="5" fill="#0f172a" opacity="0.6"/>
    </g>
    <text x="105" y="172" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#cbd5e1" font-weight="500">Neutral setup stance</text>
  </g>

  <!-- Flow Arrow -->
  <g transform="translate(262, 160)">
    <circle cx="20" cy="20" r="22" fill="#1e293b" stroke="{accent_main}" stroke-width="1.5" filter="url(#glow)"/>
    <path d="M 12 20 L 26 20 M 20 14 L 27 20 L 20 26" fill="none" stroke="{accent_main}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="20" y="55" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="{accent_main}" letter-spacing="1">FLOW</text>
  </g>

  <!-- Right: Main Movement / Pose -->
  <g transform="translate(320, 85)">
    <rect width="240" height="185" rx="12" fill="#1e293b" fill-opacity="0.8" stroke="{accent_main}" stroke-width="1.5"/>
    <rect x="12" y="12" width="135" height="22" rx="4" fill="{accent_bg}" stroke="{accent_main}" stroke-width="1"/>
    <text x="20" y="27" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="{accent_main}">2. MAIN MOVEMENT / POSE</text>

    <g transform="translate(120, 115)">
      <circle cx="0" cy="-60" r="13" fill="#f8fafc" stroke="{accent_main}" stroke-width="2"/>
      <circle cx="4" cy="-62" r="2" fill="{accent_main}"/>
      <line x1="0" y1="-47" x2="0" y2="0" stroke="#f8fafc" stroke-width="9" stroke-linecap="round"/>
      <line x1="0" y1="-47" x2="0" y2="0" stroke="{accent_main}" stroke-width="2" stroke-dasharray="2,3"/>
      <path d="M 0 -40 L -25 -20 L -35 -45" fill="none" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="-35" cy="-45" r="4" fill="{accent_main}"/>
      <path d="M 0 -40 L 25 -20 L 35 -45" fill="none" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="35" cy="-45" r="4" fill="{accent_main}"/>
      <path d="M 0 0 L -18 32 L -20 65" fill="none" stroke="#f8fafc" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="-18" cy="32" r="4" fill="{accent_main}"/>
      <path d="M 0 0 L 20 28 L 22 65" fill="none" stroke="#f8fafc" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="20" cy="28" r="4" fill="{accent_main}"/>
      <ellipse cx="0" cy="70" rx="35" ry="6" fill="{accent_main}" opacity="0.3" filter="url(#glow)"/>
    </g>
    <text x="120" y="172" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#38bdf8" font-weight="600">Active Peak Alignment</text>
  </g>

  <!-- Bottom Guidance -->
  <g transform="translate(24, 285)">
    <rect width="552" height="75" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <circle cx="28" cy="26" r="12" fill="{accent_bg}" stroke="{accent_main}" stroke-width="1"/>
    <text x="28" y="30" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="bold" fill="{accent_main}">✓</text>
    <text x="50" y="23" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#f8fafc">START:</text>
    <text x="96" y="23" font-family="Inter, sans-serif" font-size="11" fill="#94a3b8">{start_desc}</text>
    <text x="50" y="42" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="{accent_main}">ACTION:</text>
    <text x="105" y="42" font-family="Inter, sans-serif" font-size="11" fill="#cbd5e1">{main_desc}</text>
    <text x="50" y="61" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#f59e0b">KEY CUE:</text>
    <text x="110" y="61" font-family="Inter, sans-serif" font-size="11" fill="#e2e8f0">{cue}</text>
  </g>
</svg>"""
    return svg

# Reference Infographic Posters for Collections
def generate_collection_poster(filename, title, subtitle, badge, accent_color, items):
    item_rows = ""
    for i, itm in enumerate(items[:14]):
        col = 0 if i < 7 else 1
        x = 40 if col == 0 else 320
        y = 110 + (i % 7) * 32
        item_rows += f"""
        <g transform="translate({x}, {y})">
            <rect width="240" height="26" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
            <circle cx="14" cy="13" r="8" fill="{accent_color}" fill-opacity="0.2"/>
            <text x="14" y="16" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="{accent_color}">{i+1}</text>
            <text x="30" y="17" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#f8fafc">{itm}</text>
        </g>
        """

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%">
  <defs>
    <linearGradient id="poster-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
  </defs>
  <rect width="600" height="380" rx="16" fill="url(#poster-bg)" stroke="#334155" stroke-width="1.5"/>
  
  <!-- Header -->
  <rect x="24" y="20" width="552" height="60" rx="10" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="44" y="47" font-family="Inter, sans-serif" font-size="18" font-weight="800" fill="#f8fafc">{title}</text>
  <text x="44" y="68" font-family="Inter, sans-serif" font-size="12" fill="#94a3b8">{subtitle}</text>
  
  <rect x="440" y="35" width="120" height="28" rx="14" fill="{accent_color}" fill-opacity="0.15" stroke="{accent_color}" stroke-width="1.5"/>
  <text x="500" y="53" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="{accent_color}">{badge}</text>

  <!-- Items Columns -->
  {item_rows}

  <!-- Footer -->
  <rect x="24" y="340" width="552" height="26" rx="6" fill="#1e293b" opacity="0.6"/>
  <text x="300" y="357" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#94a3b8">FitGuide AI Interactive Yoga Flow Guide • Certified Progressive Sequencing</text>
</svg>"""
    return svg

out_dir = os.path.join("assets", "images", "exercises")
os.makedirs(out_dir, exist_ok=True)

# Generate individual pose SVGs
for item in new_visuals:
    svg_content = generate_svg(item)
    with open(os.path.join(out_dir, item["filename"]), "w", encoding="utf-8") as f:
        f.write(svg_content)

# Generate reference posters
collections = [
    {
        "filename": "home_workout_plan_guide.svg",
        "title": "Home Workout Plan Schedule",
        "subtitle": "No Equipment • Full Body Conditioning • 20-30 Mins",
        "badge": "BEGINNER / LOW-MOD",
        "color": "#10b981",
        "items": ["Squats (or Chair Squats)", "Plank (or Knee Plank)", "Crunches", "Jumping Jacks (or Step Jacks)", "Lunges (or Supported Lunges)", "Wall Sit", "Sit-ups", "Butt Kicks", "Push-ups (or Wall Push-ups)"]
    },
    {
        "filename": "yoga_full_body_flow.svg",
        "title": "Full Body Yoga Flow",
        "subtitle": "Complete 13-Pose Progressive Flow Sequence",
        "badge": "13 POSES • 20-30 MIN",
        "color": "#38bdf8",
        "items": ["Downward-Facing Dog", "Three-Legged Downward Dog", "Knee-to-Nose Dog", "Crescent Moon", "Revolved Lunge", "Crescent Lunge Twist", "High Plank", "Knees-Chest-Chin", "Cobra", "Downward-Facing Dog", "Three-Legged Dog", "Pigeon", "Sleeping Pigeon"]
    },
    {
        "filename": "yoga_morning_sequence.svg",
        "title": "Morning Yoga Sequence for Beginners",
        "subtitle": "Wake Up & Energize • Gentle Spinal & Hip Awakening",
        "badge": "16 POSES • 15 MIN",
        "color": "#f59e0b",
        "items": ["Hero Pose", "Tabletop", "Bird Dog", "Half Bow", "Downward-Facing Dog", "Standing Forward Fold", "Standing Backbend", "Mountain Pose", "Warrior I", "Triangle", "Pyramid", "Crescent Lunge", "Low Lunge", "Plank", "Cobra", "Child's Pose"]
    },
    {
        "filename": "yoga_morning_flow.svg",
        "title": "Morning Yoga Flow",
        "subtitle": "Dynamic Invigoration, Strength & Restorative Climax",
        "badge": "23 POSES • 25 MIN",
        "color": "#a855f7",
        "items": ["Child's Pose", "Cat-Cow Flow", "Downward-Facing Dog", "Standing Forward Bend", "Mountain Pose", "Chair Pose", "Runner's Lunge", "Revolved Side Angle Pose", "Low Plank", "Upward-Facing Dog", "Hero Pose", "Low Lunge", "Warrior I", "Reverse Warrior"]
    }
]

for col in collections:
    svg_content = generate_collection_poster(col["filename"], col["title"], col["subtitle"], col["badge"], col["color"], col["items"])
    with open(os.path.join(out_dir, col["filename"]), "w", encoding="utf-8") as f:
        f.write(svg_content)

print(f"Generated {len(new_visuals)} new exercises and {len(collections)} reference collection posters.")
