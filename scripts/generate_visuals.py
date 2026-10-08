import os

exercises_data = [
    # GENTLE MOVEMENT
    {
        "filename": "ex_marching_in_place.svg",
        "title": "Marching in Place",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand tall, feet hip-width, arms relaxed at sides",
        "main_desc": "Lift right knee to hip height while pumping left arm",
        "cue": "Keep spine tall, core lightly engaged, land softly",
        "type": "standing_march"
    },
    {
        "filename": "ex_arm_circles.svg",
        "title": "Arm Circles",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand upright with arms extended straight out to sides",
        "main_desc": "Rotate arms in controlled, smooth circular motions",
        "cue": "Keep shoulders relaxed down away from ears, smooth breathing",
        "type": "arm_circles"
    },
    {
        "filename": "ex_shoulder_rolls.svg",
        "title": "Shoulder Rolls",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Neutral standing or seated posture, relaxed arms",
        "main_desc": "Roll shoulders up toward ears, back, and down smoothly",
        "cue": "Release upper trap tension, gentle continuous circle",
        "type": "shoulder_rolls"
    },
    {
        "filename": "ex_neck_mobility.svg",
        "title": "Neck Mobility",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Sit or stand tall, chin parallel to the floor",
        "main_desc": "Gently tilt ear toward shoulder, hold briefly, alternate",
        "cue": "Never force range of motion; move slowly and mindfully",
        "type": "neck_mobility"
    },
    {
        "filename": "ex_ankle_circles.svg",
        "title": "Ankle Circles",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Seated or standing holding a chair, one foot lifted",
        "main_desc": "Slowly rotate ankle clockwise, then counterclockwise",
        "cue": "Mobilize ankle joint through full comfortable range",
        "type": "ankle_circles"
    },
    {
        "filename": "ex_wrist_circles.svg",
        "title": "Wrist Circles",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Elbows bent at 90°, hands in soft loose fists",
        "main_desc": "Circle wrists outward and inward in fluid arcs",
        "cue": "Keeps forearms steady, focus motion strictly in wrist joint",
        "type": "wrist_circles"
    },
    {
        "filename": "ex_side_steps.svg",
        "title": "Side Steps",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand with feet together, knees softly unlocked",
        "main_desc": "Step wide to the right, tap left foot, reverse to left",
        "cue": "Keep weight centered, rhythmic gentle side-to-side cadence",
        "type": "side_steps"
    },
    {
        "filename": "ex_heel_raises.svg",
        "title": "Heel Raises",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand tall, balls of feet grounded, optional chair support",
        "main_desc": "Press through balls of feet to elevate heels high",
        "cue": "Pause 1 sec at top, lower down under control without slamming",
        "type": "heel_raises"
    },
    {
        "filename": "ex_toe_raises.svg",
        "title": "Toe Raises",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand upright with weight balanced evenly over feet",
        "main_desc": "Shift weight slightly to heels and lift toes upward",
        "cue": "Strengthens anterior tibialis, improves walking clearance",
        "type": "toe_raises"
    },
    {
        "filename": "ex_standing_knee_lifts.svg",
        "title": "Standing Knee Lifts",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand tall with hands on hips or holding a wall",
        "main_desc": "Exhale and lift one knee up toward waist level",
        "cue": "Keep standing leg strong and stable, torso upright",
        "type": "knee_lifts"
    },
    {
        "filename": "ex_standing_side_bends.svg",
        "title": "Standing Side Bends",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand feet hip-width apart, arms at sides",
        "main_desc": "Slide right hand down outer thigh while reaching left arm overhead",
        "cue": "Keep chest facing forward; feel gentle stretch through side ribs",
        "type": "side_bends"
    },
    {
        "filename": "ex_gentle_torso_rotations.svg",
        "title": "Gentle Torso Rotations",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Feet shoulder-width, knees soft, arms loosely crossed or bent",
        "main_desc": "Rotate upper body smoothly left and right in a rhythmic sway",
        "cue": "Allow back heel to pivot naturally to protect the knees",
        "type": "torso_rotations"
    },
    {
        "filename": "ex_sit_to_stand.svg",
        "title": "Sit-to-Stand",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Sit tall on sturdy chair, feet flat, arms crossed over chest",
        "main_desc": "Lean slightly forward, push through heels to stand fully upright",
        "cue": "Squeeze glutes at top, slowly sit back down with control",
        "type": "sit_to_stand"
    },
    {
        "filename": "ex_wall_pushups.svg",
        "title": "Wall Push-ups",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand arm-length from wall, palms flat at shoulder height",
        "main_desc": "Bend elbows to bring chest toward wall, then press back",
        "cue": "Keep body in straight plank alignment from head to heels",
        "type": "wall_pushup"
    },
    {
        "filename": "ex_step_touches.svg",
        "title": "Step Touches",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Neutral standing stance with knees relaxed",
        "main_desc": "Step right foot wide, tap left toe next to it, repeat to left",
        "cue": "Add gentle arm swings to boost circulation smoothly",
        "type": "step_touches"
    },
    {
        "filename": "ex_gentle_leg_swings.svg",
        "title": "Gentle Leg Swings",
        "cat": "Gentle Movement",
        "intensity": "Gentle",
        "start_desc": "Stand sideways next to wall or chair for light balance support",
        "main_desc": "Gently swing outside leg forward and backward like a pendulum",
        "cue": "Keep torso steady and upright; avoid overarching lower back",
        "type": "leg_swings"
    },

    # YOGA POSES
    {
        "filename": "yoga_mountain_pose.svg",
        "title": "Mountain Pose (Tadasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Stand tall, feet grounded together or hip-width apart",
        "main_desc": "Roll shoulders back, palms open forward, crown reaching skyward",
        "cue": "Distribute weight evenly on all 4 corners of feet, breathe deeply",
        "type": "mountain_pose"
    },
    {
        "filename": "yoga_cat_cow.svg",
        "title": "Cat-Cow (Marjaryasana-Bitilasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Tabletop on hands and knees, wrists under shoulders",
        "main_desc": "Inhale: drop belly, lift heart (Cow). Exhale: round spine upward (Cat)",
        "cue": "Synchronize breath with movement, mobilize entire spine smoothly",
        "type": "cat_cow"
    },
    {
        "filename": "yoga_childs_pose.svg",
        "title": "Child's Pose (Balasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Kneel on mat, big toes touching, knees wide apart",
        "main_desc": "Hips sink to heels, torso folds forward, arms stretch out on mat",
        "cue": "Rest forehead on mat, surrender into gentle deep belly breaths",
        "type": "childs_pose"
    },
    {
        "filename": "yoga_downward_dog.svg",
        "title": "Downward-Facing Dog (Adho Mukha Svanasana)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Tabletop position, tuck toes, hands shoulder-width apart",
        "main_desc": "Lift hips up and back forming an inverted 'V' shape",
        "cue": "Press through knuckles, soften knees if hamstrings feel tight",
        "type": "downward_dog"
    },
    {
        "filename": "yoga_cobra_pose.svg",
        "title": "Cobra Pose (Bhujangasana)",
        "cat": "Yoga",
        "intensity": "Low",
        "start_desc": "Lie prone on belly, legs extended, hands under shoulders",
        "main_desc": "Press into palms, draw elbows in, gently peel chest off floor",
        "cue": "Keep shoulders relaxed down, avoid pinching lower back",
        "type": "cobra_pose"
    },
    {
        "filename": "yoga_tree_pose.svg",
        "title": "Tree Pose (Vrikshasana)",
        "cat": "Yoga",
        "intensity": "Low",
        "start_desc": "Mountain pose, shift weight onto grounded standing foot",
        "main_desc": "Place sole of opposite foot on calf or inner thigh (never knee)",
        "cue": "Find a fixed gazing point (drishti), press palms together at heart",
        "type": "tree_pose"
    },
    {
        "filename": "yoga_warrior_1.svg",
        "title": "Warrior I (Virabhadrasana I)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Step one foot back 3-4 feet, back foot angled at 45°",
        "main_desc": "Bend front knee to 90°, square hips forward, reach arms high",
        "cue": "Ground outer edge of back foot, draw lower belly in and up",
        "type": "warrior_1"
    },
    {
        "filename": "yoga_warrior_2.svg",
        "title": "Warrior II (Virabhadrasana II)",
        "cat": "Yoga",
        "intensity": "Moderate",
        "start_desc": "Wide stance, front foot facing forward, back foot parallel to mat edge",
        "main_desc": "Bend front knee over ankle, stretch arms wide parallel to floor",
        "cue": "Gaze over front fingertips, keep torso centered between both hips",
        "type": "warrior_2"
    },
    {
        "filename": "yoga_low_lunge.svg",
        "title": "Low Lunge (Anjaneyasana)",
        "cat": "Yoga",
        "intensity": "Low",
        "start_desc": "From Downward Dog or Tabletop, step right foot between hands",
        "main_desc": "Lower back knee to mat, untuck toes, sweep arms upward overhead",
        "cue": "Sink hips forward and down gently, open chest without compressing spine",
        "type": "low_lunge"
    },
    {
        "filename": "yoga_bridge_pose.svg",
        "title": "Bridge Pose (Setu Bandhasana)",
        "cat": "Yoga",
        "intensity": "Low",
        "start_desc": "Lie on back, knees bent, feet flat on floor hip-width apart",
        "main_desc": "Press down through feet and arms to lift hips towards the ceiling",
        "cue": "Keep knees tracking over ankles, engage glutes and hamstrings",
        "type": "bridge_pose"
    },
    {
        "filename": "yoga_butterfly_pose.svg",
        "title": "Butterfly Pose (Baddha Konasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Sit upright, bend knees and bring soles of feet together",
        "main_desc": "Allow knees to open outward naturally, holding feet or ankles",
        "cue": "Maintain tall neutral spine; gently hinge from hips if comfortable",
        "type": "butterfly_pose"
    },
    {
        "filename": "yoga_seated_forward_fold.svg",
        "title": "Seated Forward Fold (Paschimottanasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Sit tall with legs extended straight in front, feet flexed",
        "main_desc": "Inhale reach tall, exhale hinge forward from hips toward toes",
        "cue": "Bend knees slightly to keep lower back long and relaxed",
        "type": "forward_fold"
    },
    {
        "filename": "yoga_supine_knee_to_chest.svg",
        "title": "Supine Knee-to-Chest (Apanasana)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Lie comfortably flat on your back on the mat",
        "main_desc": "Draw both knees gently into your chest, wrapping hands around shins",
        "cue": "Keep head and shoulders relaxed on floor, gently rock side to side",
        "type": "knee_to_chest"
    },
    {
        "filename": "yoga_savasana.svg",
        "title": "Savasana (Corpse Pose)",
        "cat": "Yoga",
        "intensity": "Gentle",
        "start_desc": "Lie flat on your back, legs extended and slightly apart",
        "main_desc": "Arms rest naturally at sides, palms facing up, eyes gently closed",
        "cue": "Release all physical muscular tension, surrender to calm slow breath",
        "type": "savasana"
    },

    # STANDARD EXERCISES
    {
        "filename": "ex_squat.svg",
        "title": "Bodyweight Squats",
        "cat": "Strength",
        "intensity": "Moderate",
        "start_desc": "Stand feet shoulder-width, toes turned out slightly, chest proud",
        "main_desc": "Hinge at hips, bend knees, lower thighs parallel to ground",
        "cue": "Keep knees tracking over toes, weight centered over midfoot",
        "type": "squat"
    },
    {
        "filename": "ex_pushup.svg",
        "title": "Push-ups",
        "cat": "Strength",
        "intensity": "Challenging",
        "start_desc": "High plank, hands slightly wider than shoulders, rigid core",
        "main_desc": "Lower chest smoothly until 2 inches from floor, press back up",
        "cue": "Maintain neutral spine, elbows at 45° angle to body",
        "type": "pushup"
    },
    {
        "filename": "ex_incline_pushup.svg",
        "title": "Incline Push-ups",
        "cat": "Strength",
        "intensity": "Low",
        "start_desc": "Hands on elevated bench or counter, feet stepped back in plank",
        "main_desc": "Lower chest toward edge of surface, press firmly to return",
        "cue": "Engage core and glutes to avoid sagging hips",
        "type": "incline_pushup"
    },
    {
        "filename": "ex_shoulder_taps.svg",
        "title": "Shoulder Taps",
        "cat": "Core",
        "intensity": "Moderate",
        "start_desc": "High plank position, feet slightly wider than hips for stability",
        "main_desc": "Lift right hand and tap left shoulder, return, repeat left",
        "cue": "Resist hip rotation; keep pelvis parallel to the floor",
        "type": "shoulder_taps"
    },
    {
        "filename": "ex_db_press.svg",
        "title": "Dumbbell Shoulder Press",
        "cat": "Strength",
        "intensity": "Challenging",
        "start_desc": "Seated or standing, dumbbells at shoulder height, palms facing forward",
        "main_desc": "Press dumbbells overhead until arms are extended, lower slowly",
        "cue": "Avoid arching lower back, press vertically over shoulders",
        "type": "db_press"
    },
    {
        "filename": "ex_lunge.svg",
        "title": "Walking / Static Lunges",
        "cat": "Strength",
        "intensity": "Moderate",
        "start_desc": "Stand tall, step one foot forward about 2-3 feet",
        "main_desc": "Lower hips until both knees form roughly 90° angles, press back up",
        "cue": "Keep front knee aligned over front ankle, chest upright",
        "type": "lunge"
    },
    {
        "filename": "ex_glute_bridges.svg",
        "title": "Glute Bridges",
        "cat": "Strength",
        "intensity": "Low",
        "start_desc": "Lie on back, knees bent, feet flat near hips",
        "main_desc": "Drive through heels, squeeze glutes to elevate pelvis into a straight bridge",
        "cue": "Avoid overarching lower back at top, hold for 1-2 seconds",
        "type": "bridge_pose"
    },
    {
        "filename": "ex_plank.svg",
        "title": "Forearm Plank",
        "cat": "Core",
        "intensity": "Moderate",
        "start_desc": "Forearms on ground, elbows under shoulders, toes tucked",
        "main_desc": "Hold straight line from crown to heels with braced core",
        "cue": "Do not let hips sag or hike up; keep neck long and neutral",
        "type": "plank"
    },
    {
        "filename": "ex_bird_dog.svg",
        "title": "Bird Dog",
        "cat": "Mobility",
        "intensity": "Low",
        "start_desc": "All fours tabletop, hands under shoulders, knees under hips",
        "main_desc": "Simultaneously reach right arm forward and left leg backward",
        "cue": "Keep back flat and hips level, return and switch sides",
        "type": "bird_dog"
    },
    {
        "filename": "ex_dead_bug.svg",
        "title": "Dead Bug",
        "cat": "Core",
        "intensity": "Low",
        "start_desc": "Lie on back, arms pointing to ceiling, knees bent at 90° over hips",
        "main_desc": "Lower opposite arm and leg toward floor while pressing lower back down",
        "cue": "Never let lower back arch off the floor; move with control",
        "type": "dead_bug"
    },
    {
        "filename": "ex_jumping_jacks.svg",
        "title": "Jumping Jacks",
        "cat": "Cardio",
        "intensity": "Moderate",
        "start_desc": "Stand feet together, arms resting relaxed at sides",
        "main_desc": "Jump feet wide while swinging arms overhead, jump back to start",
        "cue": "Land lightly on balls of feet with knees slightly bent",
        "type": "jumping_jacks"
    },
    {
        "filename": "ex_high_knees.svg",
        "title": "High Knees",
        "cat": "Cardio",
        "intensity": "Challenging",
        "start_desc": "Stand tall, feet hip-width apart",
        "main_desc": "Run in place lifting knees dynamically up toward chest height",
        "cue": "Stay light on feet, pump arms rhythmically, maintain upright posture",
        "type": "standing_march"
    }
]

def generate_svg(item):
    title = item["title"]
    cat = item["cat"]
    intensity = item["intensity"]
    start_desc = item["start_desc"]
    main_desc = item["main_desc"]
    cue = item["cue"]

    # Choose color accents based on intensity
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
    <linearGradient id="flow-arrow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{accent_main}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="{accent_main}" stop-opacity="1.0"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="600" height="380" rx="16" fill="url(#bg-grad)" stroke="#334155" stroke-width="1.5"/>

  <!-- Subtle Studio Grid Lines -->
  <line x1="40" y1="260" x2="560" y2="260" stroke="#334155" stroke-width="1" stroke-dasharray="4,4"/>
  <circle cx="300" cy="180" r="140" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="6,6"/>

  <!-- Header Section -->
  <rect x="24" y="20" width="552" height="48" rx="8" fill="url(#card-grad)" stroke="#334155" stroke-width="1"/>
  <text x="40" y="49" font-family="Inter, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#f8fafc">{title}</text>
  
  <!-- Category & Intensity Badges -->
  <rect x="420" y="30" width="70" height="26" rx="13" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="455" y="47" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">{cat}</text>
  
  <rect x="498" y="30" width="68" height="26" rx="13" fill="{accent_bg}" stroke="{accent_main}" stroke-width="1.5"/>
  <text x="532" y="47" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="{accent_main}">{intensity}</text>

  <!-- Left: Starting Position Panel -->
  <g transform="translate(40, 85)">
    <rect width="210" height="185" rx="12" fill="#1e293b" fill-opacity="0.6" stroke="#334155" stroke-width="1"/>
    <rect x="12" y="12" width="100" height="22" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1"/>
    <text x="20" y="27" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="#94a3b8">1. START POSITION</text>

    <!-- Visual Starting Form Silhouette -->
    <g transform="translate(105, 115)">
      <!-- Head -->
      <circle cx="0" cy="-60" r="12" fill="#64748b" opacity="0.9"/>
      <!-- Torso -->
      <line x1="0" y1="-48" x2="0" y2="0" stroke="#64748b" stroke-width="8" stroke-linecap="round"/>
      <!-- Arms -->
      <path d="M 0 -42 L -18 -15 L -20 10" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
      <path d="M 0 -42 L 18 -15 L 20 10" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
      <!-- Pelvis & Legs -->
      <path d="M 0 0 L -14 30 L -14 65" fill="none" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
      <path d="M 0 0 L 14 30 L 14 65" fill="none" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
      <!-- Ground shadow -->
      <ellipse cx="0" cy="70" rx="28" ry="5" fill="#0f172a" opacity="0.6"/>
    </g>

    <!-- Sub-label -->
    <text x="105" y="172" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#cbd5e1" font-weight="500">Neutral stance / setup</text>
  </g>

  <!-- Flow Arrow (Center) -->
  <g transform="translate(262, 160)">
    <circle cx="20" cy="20" r="22" fill="#1e293b" stroke="{accent_main}" stroke-width="1.5" filter="url(#glow)"/>
    <path d="M 12 20 L 26 20 M 20 14 L 27 20 L 20 26" fill="none" stroke="{accent_main}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="20" y="55" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="{accent_main}" letter-spacing="1">FLOW</text>
  </g>

  <!-- Right: Main Movement / Pose Panel -->
  <g transform="translate(320, 85)">
    <rect width="240" height="185" rx="12" fill="#1e293b" fill-opacity="0.8" stroke="{accent_main}" stroke-width="1.5"/>
    <rect x="12" y="12" width="135" height="22" rx="4" fill="{accent_bg}" stroke="{accent_main}" stroke-width="1"/>
    <text x="20" y="27" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="{accent_main}">2. MAIN MOVEMENT / POSE</text>

    <!-- Visual Active Pose Silhouette -->
    <g transform="translate(120, 115)">
      <!-- Head with eye line cue -->
      <circle cx="0" cy="-60" r="13" fill="#f8fafc" stroke="{accent_main}" stroke-width="2"/>
      <circle cx="4" cy="-62" r="2" fill="{accent_main}"/>
      
      <!-- Torso with spine alignment glow -->
      <line x1="0" y1="-47" x2="0" y2="0" stroke="#f8fafc" stroke-width="9" stroke-linecap="round"/>
      <line x1="0" y1="-47" x2="0" y2="0" stroke="{accent_main}" stroke-width="2" stroke-dasharray="2,3"/>
      
      <!-- Dynamic Limbs with Pose Articulation -->
      <path d="M 0 -40 L -25 -20 L -35 -45" fill="none" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="-35" cy="-45" r="4" fill="{accent_main}"/>
      
      <path d="M 0 -40 L 25 -20 L 35 -45" fill="none" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="35" cy="-45" r="4" fill="{accent_main}"/>

      <!-- Lower Body Kinetic Line -->
      <path d="M 0 0 L -18 32 L -20 65" fill="none" stroke="#f8fafc" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="-18" cy="32" r="4" fill="{accent_main}"/>
      
      <path d="M 0 0 L 20 28 L 22 65" fill="none" stroke="#f8fafc" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="20" cy="28" r="4" fill="{accent_main}"/>

      <!-- Motion / Alignment Arrows -->
      <path d="M -30 -10 Q -40 -30 -30 -40" fill="none" stroke="{accent_main}" stroke-width="2" stroke-dasharray="3,3" stroke-linecap="round"/>
      <path d="M 30 -10 Q 40 -30 30 -40" fill="none" stroke="{accent_main}" stroke-width="2" stroke-dasharray="3,3" stroke-linecap="round"/>

      <!-- Ground shadow -->
      <ellipse cx="0" cy="70" rx="35" ry="6" fill="{accent_main}" opacity="0.3" filter="url(#glow)"/>
    </g>

    <!-- Sub-label -->
    <text x="120" y="172" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#38bdf8" font-weight="600">Active Peak Alignment</text>
  </g>

  <!-- Bottom Guidance & Safety Cue Footer -->
  <g transform="translate(24, 285)">
    <rect width="552" height="75" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    
    <!-- Cue Icon & Text -->
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

out_dir = os.path.join("assets", "images", "exercises")
os.makedirs(out_dir, exist_ok=True)

for item in exercises_data:
    svg_content = generate_svg(item)
    file_path = os.path.join(out_dir, item["filename"])
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(svg_content)

print(f"Generated {len(exercises_data)} exercise visuals in {out_dir}")
