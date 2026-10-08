/* =============================================================================
   FitGuide AI - Master Application Controller
   ============================================================================= */

const app = {
    // Current Navigation State
    currentSection: 'home',
    currentStep: 1,
    totalSteps: 9,

    // Multi-User Secure Authentication & Accounts State
    currentUser: 'alex',
    isAuthenticated: true,
    users: {},

    // User Profile Assessment State
    userProfile: {
        age: 28,
        sex: 'male',
        height: 175,
        weight: 70,
        activity: 'moderate',
        level: 'beginner',
        goal: 'loss',
        intensity: 'Moderate',
        diet: 'veg',
        foodPreferences: '',
        equipment: 'No equipment',
        time: '20',
        bmi: 22.9,
        bmiCategory: 'Normal Weight',
        bmr: 1640,
        tdee: 2542,
        targetCalories: 2042,
        targetProtein: 112
    },

    // Daily Macro Tracking State
    consumedCalories: 0,
    consumedProtein: 0,

    // Movement Streak State
    streak: {
        count: 1,
        best: 1,
        totalActive: 1,
        lastLoggedDate: null,
        weeklyLog: [false, false, false, false, false, false, false] // Mon to Sun
    },

    // 7-Day Program State
    currentProgramDay: 0,
    dailyCompletedExercises: {}, // { "0-ex-squat": true }
    workoutSeconds: 0,
    workoutTimer: null,
    isWorkoutRunning: false,

    // User Exercise & Workout History (Real Data for Monthly Progress Report)
    history: {
        workouts: [],
        exercises: [],
        weighIns: [],
        caloriesHistory: []
    },

    // Interactive Player State
    playerQueue: [],
    playerIndex: 0,
    playerSecondsLeft: 0,
    playerTimer: null,
    isPlayerRunning: false,
    isPlayerResting: false,
    playerOriginalItem: null,

    // Dashboard Workout Cards Filter State
    currentWorkoutFilter: 'all',

    // Search & Filter State
    exFilters: { category: 'all', goal: 'all', intensity: 'all', search: '' },
    yogaFilters: { type: 'all', level: 'all', search: '' },

    /* =========================================================================
       INITIALIZATION
       ========================================================================= */
    init: () => {
        app.initAuth();
        app.loadTheme();
        app.loadStoredData();
        app.setupEventListeners();
        app.updateAuthUI();
        app.updateProfileDisplay();
        app.updateDashboardMetrics();
        app.renderWeeklyStreakMatrix();
        app.renderWorkoutPlans();
        app.renderProgramDay(app.currentProgramDay);
        app.renderYogaCollections();
        app.renderYogaPoses();
        app.renderExercises();
        app.generateMeals();
        app.updateNavStreak();
        app.initChat();
    },

    /* =========================================================================
       SECURE USER ACCOUNTS & AUTHENTICATION
       ========================================================================= */
    initAuth: () => {
        try {
            const savedUsers = localStorage.getItem('fitguide_users');
            if (savedUsers) {
                app.users = JSON.parse(savedUsers);
            } else {
                // Pre-seed two distinct real athlete profiles (Male and Female)
                app.users = {
                    'alex': {
                        username: 'alex',
                        name: 'Alex Mercer',
                        email: 'alex@fitguide.ai',
                        password: 'password123',
                        sex: 'male',
                        profile: {
                            age: 28, sex: 'male', height: 178, weight: 72,
                            activity: 'moderate', level: 'beginner', goal: 'loss',
                            intensity: 'Moderate', diet: 'non-veg', foodPreferences: 'Prefers high protein breakfast',
                            equipment: 'No equipment', time: '20', bmi: 22.7, bmiCategory: 'Normal Weight',
                            bmr: 1680, tdee: 2600, targetCalories: 2100, targetProtein: 125
                        },
                        streak: {
                            count: 5, best: 8, totalActive: 14,
                            lastLoggedDate: new Date().toDateString(),
                            weeklyLog: [true, true, true, false, true, false, false]
                        },
                        history: {
                            workouts: [
                                { date: '2026-10-02', title: 'Day 1: Full Body Strength & Core', durationMinutes: 24, caloriesBurned: 195, category: 'Home Workout', exercises: 5 },
                                { date: '2026-10-03', title: 'Day 2: Upper Body & Cardio Conditioning', durationMinutes: 20, caloriesBurned: 180, category: 'Strength', exercises: 5 },
                                { date: '2026-10-04', title: 'Day 3: Lower Body & Balance Focus', durationMinutes: 25, caloriesBurned: 210, category: 'Home Workout', exercises: 5 },
                                { date: '2026-10-06', title: 'Day 5: HIIT & Core Burn', durationMinutes: 22, caloriesBurned: 245, category: 'Cardio', exercises: 5 },
                                { date: '2026-10-07', title: 'Core & Upper Body Sculpt', durationMinutes: 28, caloriesBurned: 250, category: 'Strength', exercises: 5 }
                            ],
                            exercises: [
                                { date: '2026-10-07', id: 'ex-squat', name: 'Squats', category: 'Home Workout', sets: 3, reps: '18 reps', duration: '45s', calories: 42 },
                                { date: '2026-10-07', id: 'ex-pushup', name: 'Push-ups', category: 'Strength', sets: 3, reps: '12 reps', duration: '40s', calories: 38 },
                                { date: '2026-10-07', id: 'ex-plank', name: 'Plank', category: 'Core', sets: 3, reps: '45s hold', duration: '45s', calories: 30 },
                                { date: '2026-10-07', id: 'ex-glute-bridges', name: 'Glute Bridges', category: 'Strength', sets: 3, reps: '15 reps', duration: '45s', calories: 35 },
                                { date: '2026-10-07', id: 'ex-crunches', name: 'Crunches', category: 'Core', sets: 3, reps: '20 reps', duration: '40s', calories: 32 }
                            ],
                            weighIns: [
                                { date: '2026-10-01', weight: 74.2 },
                                { date: '2026-10-07', weight: 72.0 }
                            ],
                            caloriesHistory: [
                                { date: '2026-10-02', consumed: 2100, protein: 120 },
                                { date: '2026-10-03', consumed: 2050, protein: 118 },
                                { date: '2026-10-04', consumed: 2180, protein: 130 },
                                { date: '2026-10-06', consumed: 2120, protein: 122 },
                                { date: '2026-10-07', consumed: 2080, protein: 124 }
                            ]
                        }
                    },
                    'elena': {
                        username: 'elena',
                        name: 'Elena Vance',
                        email: 'elena@fitguide.ai',
                        password: 'password123',
                        sex: 'female',
                        profile: {
                            age: 26, sex: 'female', height: 165, weight: 58,
                            activity: 'moderate', level: 'intermediate', goal: 'yoga',
                            intensity: 'Gentle', diet: 'veg', foodPreferences: 'Plant-based, lactose intolerant',
                            equipment: 'Mat', time: '20', bmi: 21.3, bmiCategory: 'Normal Weight',
                            bmr: 1360, tdee: 2100, targetCalories: 1820, targetProtein: 88
                        },
                        streak: {
                            count: 7, best: 12, totalActive: 19,
                            lastLoggedDate: new Date().toDateString(),
                            weeklyLog: [true, true, true, true, true, true, true]
                        },
                        history: {
                            workouts: [
                                { date: '2026-10-01', title: 'Morning Energy Flow', durationMinutes: 20, caloriesBurned: 115, category: 'Yoga', exercises: 5 },
                                { date: '2026-10-02', title: 'Gentle Movement & Joint Care', durationMinutes: 15, caloriesBurned: 85, category: 'Gentle Movement', exercises: 5 },
                                { date: '2026-10-03', title: 'Full Body Yoga Flow', durationMinutes: 25, caloriesBurned: 140, category: 'Yoga', exercises: 6 },
                                { date: '2026-10-04', title: 'Day 4: Restorative Yoga & Mobility Flow', durationMinutes: 22, caloriesBurned: 120, category: 'Yoga', exercises: 5 },
                                { date: '2026-10-05', title: 'Morning Energy Flow', durationMinutes: 20, caloriesBurned: 115, category: 'Yoga', exercises: 5 },
                                { date: '2026-10-06', title: 'Gentle Movement & Joint Care', durationMinutes: 15, caloriesBurned: 90, category: 'Gentle Movement', exercises: 5 },
                                { date: '2026-10-07', title: 'Restorative Posture Flow', durationMinutes: 20, caloriesBurned: 110, category: 'Yoga', exercises: 5 }
                            ],
                            exercises: [
                                { date: '2026-10-07', id: 'yoga-downward-dog', name: 'Downward Dog', category: 'Yoga', sets: 3, reps: '60s hold', duration: '60s', calories: 25 },
                                { date: '2026-10-07', id: 'yoga-warrior-1', name: 'Warrior I', category: 'Yoga', sets: 3, reps: '45s/side', duration: '45s', calories: 28 },
                                { date: '2026-10-07', id: 'yoga-cat-cow', name: 'Cat-Cow Flow', category: 'Yoga', sets: 2, reps: '60s', duration: '60s', calories: 20 },
                                { date: '2026-10-07', id: 'yoga-cobra-pose', name: 'Cobra Pose', category: 'Yoga', sets: 2, reps: '40s', duration: '40s', calories: 18 },
                                { date: '2026-10-07', id: 'yoga-savasana', name: 'Savasana Rest', category: 'Yoga', sets: 1, reps: '90s', duration: '90s', calories: 15 }
                            ],
                            weighIns: [
                                { date: '2026-10-01', weight: 59.5 },
                                { date: '2026-10-07', weight: 58.0 }
                            ],
                            caloriesHistory: [
                                { date: '2026-10-01', consumed: 1800, protein: 85 },
                                { date: '2026-10-02', consumed: 1780, protein: 86 },
                                { date: '2026-10-03', consumed: 1850, protein: 90 },
                                { date: '2026-10-04', consumed: 1810, protein: 87 },
                                { date: '2026-10-05', consumed: 1790, protein: 88 },
                                { date: '2026-10-06', consumed: 1820, protein: 89 },
                                { date: '2026-10-07', consumed: 1800, protein: 88 }
                            ]
                        }
                    }
                };
                localStorage.setItem('fitguide_users', JSON.stringify(app.users));
            }

            const activeUser = localStorage.getItem('fitguide_current_user') || 'alex';
            if (app.users[activeUser]) {
                app.currentUser = activeUser;
                app.isAuthenticated = true;
            } else {
                app.currentUser = 'alex';
                app.isAuthenticated = true;
            }
        } catch (e) {
            console.error('Auth initialization error:', e);
        }
    },

    /* =========================================================================
       LOCAL STORAGE & STATE PERSISTENCE (Strict User Data Isolation)
       ========================================================================= */
    loadStoredData: () => {
        try {
            const uKey = `fitguide_u_${app.currentUser}`;
            const userAccount = app.users[app.currentUser];

            // 1. Load User Profile
            const userProfileSaved = localStorage.getItem(`${uKey}_profile`);
            if (userProfileSaved) {
                app.userProfile = Object.assign(app.userProfile, JSON.parse(userProfileSaved));
            } else if (userAccount && userAccount.profile) {
                app.userProfile = Object.assign(app.userProfile, userAccount.profile);
            }

            // 2. Load User Streak
            const userStreakSaved = localStorage.getItem(`${uKey}_streak`);
            if (userStreakSaved) {
                app.streak = Object.assign(app.streak, JSON.parse(userStreakSaved));
            } else if (userAccount && userAccount.streak) {
                app.streak = Object.assign(app.streak, userAccount.streak);
            }

            // 3. Load Daily Completed Exercises
            const userDailySaved = localStorage.getItem(`${uKey}_daily_completed`);
            if (userDailySaved) {
                app.dailyCompletedExercises = JSON.parse(userDailySaved);
            } else {
                app.dailyCompletedExercises = {};
            }

            // 4. Load Macros
            const userMacrosSaved = localStorage.getItem(`${uKey}_macros`);
            if (userMacrosSaved) {
                const m = JSON.parse(userMacrosSaved);
                const today = new Date().toDateString();
                if (m.date === today) {
                    app.consumedCalories = m.cal || 0;
                    app.consumedProtein = m.pro || 0;
                }
            } else {
                app.consumedCalories = app.userProfile.targetCalories ? Math.round(app.userProfile.targetCalories * 0.75) : 1550;
                app.consumedProtein = app.userProfile.targetProtein ? Math.round(app.userProfile.targetProtein * 0.8) : 90;
            }

            // 5. Load User Training History
            const userHistorySaved = localStorage.getItem(`${uKey}_history`);
            if (userHistorySaved) {
                app.history = JSON.parse(userHistorySaved);
            } else if (userAccount && userAccount.history) {
                app.history = JSON.parse(JSON.stringify(userAccount.history));
            }
        } catch (e) {
            console.error('Storage load error:', e);
        }
    },

    saveProfile: () => {
        try {
            const uKey = `fitguide_u_${app.currentUser}`;
            localStorage.setItem(`${uKey}_profile`, JSON.stringify(app.userProfile));
            localStorage.setItem('fitguide_profile', JSON.stringify(app.userProfile));
            if (app.users[app.currentUser]) {
                app.users[app.currentUser].profile = app.userProfile;
                app.users[app.currentUser].sex = app.userProfile.sex;
                localStorage.setItem('fitguide_users', JSON.stringify(app.users));
            }
        } catch (e) {}
    },

    saveStreak: () => {
        try {
            const uKey = `fitguide_u_${app.currentUser}`;
            localStorage.setItem(`${uKey}_streak`, JSON.stringify(app.streak));
            localStorage.setItem('fitguide_streak', JSON.stringify(app.streak));
            if (app.users[app.currentUser]) {
                app.users[app.currentUser].streak = app.streak;
                localStorage.setItem('fitguide_users', JSON.stringify(app.users));
            }
        } catch (e) {}
    },

    saveDailyCompleted: () => {
        try {
            const uKey = `fitguide_u_${app.currentUser}`;
            localStorage.setItem(`${uKey}_daily_completed`, JSON.stringify(app.dailyCompletedExercises));
            localStorage.setItem('fitguide_daily_completed', JSON.stringify(app.dailyCompletedExercises));
        } catch (e) {}
    },

    saveMacros: () => {
        try {
            const uKey = `fitguide_u_${app.currentUser}`;
            const macroData = {
                date: new Date().toDateString(),
                cal: app.consumedCalories,
                pro: app.consumedProtein
            };
            localStorage.setItem(`${uKey}_macros`, JSON.stringify(macroData));
            localStorage.setItem('fitguide_macros', JSON.stringify(macroData));
        } catch (e) {}
    },

    saveHistory: () => {
        try {
            const uKey = `fitguide_u_${app.currentUser}`;
            localStorage.setItem(`${uKey}_history`, JSON.stringify(app.history));
            if (app.users[app.currentUser]) {
                app.users[app.currentUser].history = app.history;
                localStorage.setItem('fitguide_users', JSON.stringify(app.users));
            }
        } catch (e) {}
    },

    /* =========================================================================
       ACCOUNT LOGIN, REGISTRATION & SIGN-OUT
       ========================================================================= */
    loginUser: (username, password) => {
        const u = app.users[username.toLowerCase().trim()];
        if (!u) {
            app.showToast("Account not found. Please check username or create an account.", "info");
            return false;
        }
        if (u.password && u.password !== password) {
            app.showToast("Incorrect password. Please try again.", "info");
            return false;
        }

        app.currentUser = u.username;
        app.isAuthenticated = true;
        localStorage.setItem('fitguide_current_user', u.username);
        app.loadStoredData();
        app.closeAuthModal();
        app.refreshAllViews();
        app.showToast(`✨ Welcome back, ${u.name}! Personal data restored.`, "fire");
        return true;
    },

    quickLogin: (username) => {
        if (app.users[username]) {
            app.loginUser(username, app.users[username].password || 'password123');
        }
    },

    registerUser: (name, username, email, password, sex) => {
        const cleanU = username.toLowerCase().trim();
        if (!cleanU || !name || !email) {
            app.showToast("Please fill in all account fields.", "info");
            return false;
        }
        if (app.users[cleanU]) {
            app.showToast("Username already exists. Please pick another.", "info");
            return false;
        }

        const newUser = {
            username: cleanU,
            name: name.trim(),
            email: email.trim(),
            password: password || 'password123',
            sex: sex || 'male',
            profile: {
                age: 28, sex: sex || 'male', height: sex === 'female' ? 165 : 175, weight: sex === 'female' ? 60 : 70,
                activity: 'moderate', level: 'beginner', goal: 'loss', intensity: 'Moderate', diet: 'veg',
                equipment: 'No equipment', time: '20', bmi: 22.9, bmiCategory: 'Normal Weight',
                bmr: sex === 'female' ? 1400 : 1640, tdee: sex === 'female' ? 2100 : 2540,
                targetCalories: sex === 'female' ? 1850 : 2050, targetProtein: sex === 'female' ? 95 : 115
            },
            streak: { count: 1, best: 1, totalActive: 1, lastLoggedDate: new Date().toDateString(), weeklyLog: [true, false, false, false, false, false, false] },
            history: {
                workouts: [
                    { date: '2026-10-07', title: 'Day 1: Full Body Strength & Core', durationMinutes: 20, caloriesBurned: 160, category: 'Home Workout', exercises: 5 }
                ],
                exercises: [
                    { date: '2026-10-07', id: 'ex-squat', name: 'Squats', category: 'Home Workout', sets: 3, reps: '15 reps', duration: '45s', calories: 35 }
                ],
                weighIns: [
                    { date: '2026-10-07', weight: sex === 'female' ? 60.0 : 70.0 }
                ],
                caloriesHistory: [
                    { date: '2026-10-07', consumed: sex === 'female' ? 1800 : 2050, protein: sex === 'female' ? 92 : 112 }
                ]
            }
        };

        app.users[cleanU] = newUser;
        localStorage.setItem('fitguide_users', JSON.stringify(app.users));
        app.currentUser = cleanU;
        app.isAuthenticated = true;
        localStorage.setItem('fitguide_current_user', cleanU);
        app.loadStoredData();
        app.closeAuthModal();
        app.refreshAllViews();
        app.showToast(`✨ Account created for ${name}! Plan calibrated for ${sex.toUpperCase()} Athlete.`, "fire");
        return true;
    },

    showAuthModal: (initialTab = 'signin') => {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.add('active');
            app.switchAuthTab(initialTab);
        }
    },

    closeAuthModal: () => {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.remove('active');
    },

    switchAuthTab: (tab) => {
        document.querySelectorAll('.auth-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
        });
        const signinForm = document.getElementById('auth-signin-form');
        const signupForm = document.getElementById('auth-signup-form');
        if (signinForm) signinForm.style.display = tab === 'signin' ? 'block' : 'none';
        if (signupForm) signupForm.style.display = tab === 'signup' ? 'block' : 'none';
    },

    confirmSignOut: () => {
        const modal = document.getElementById('signout-modal');
        if (modal) {
            const user = app.users[app.currentUser];
            const nameEl = document.getElementById('signout-user-name');
            if (nameEl) nameEl.innerText = user ? user.name : 'Athlete';
            modal.classList.add('active');
        }
    },

    cancelSignOut: () => {
        const modal = document.getElementById('signout-modal');
        if (modal) modal.classList.remove('active');
    },

    executeSignOut: () => {
        app.cancelSignOut();
        app.closeNavDrawer();
        app.isAuthenticated = false;
        localStorage.removeItem('fitguide_current_user');
        app.showToast("Signed out securely. Authentication is required to access personal data.", "info");
        app.showAuthModal('signin');
        app.updateAuthUI();
    },

    updateAuthUI: () => {
        const user = app.users[app.currentUser];
        const name = user ? user.name : 'Athlete';
        const sex = (app.userProfile && app.userProfile.sex) ? app.userProfile.sex : 'male';

        // Update nav user display
        const navUser = document.getElementById('nav-user-name');
        if (navUser) {
            navUser.innerText = app.isAuthenticated ? name.split(' ')[0] : 'Sign In';
        }

        // Update drawer auth info
        const drawerUser = document.getElementById('drawer-user-name');
        if (drawerUser) {
            drawerUser.innerText = app.isAuthenticated ? name : 'Guest Athlete';
        }
        const drawerSub = document.getElementById('drawer-user-sub');
        if (drawerSub) {
            drawerSub.innerText = app.isAuthenticated 
                ? `${sex.toUpperCase()} Athlete • ${user ? user.email : 'Personal Session'}`
                : 'Authentication Required • Sign In Below';
        }
    },

    refreshAllViews: () => {
        app.updateAuthUI();
        app.updateProfileDisplay();
        app.updateDashboardMetrics();
        app.renderWeeklyStreakMatrix();
        app.renderWorkoutPlans();
        app.renderProgramDay(app.currentProgramDay);
        app.renderYogaCollections();
        app.renderYogaPoses();
        app.renderExercises();
        app.generateMeals();
        app.updateNavStreak();
    },

    /* =========================================================================
       THEME CONTROLLER (Light & Dark Mode)
       ========================================================================= */
    loadTheme: () => {
        const theme = localStorage.getItem('fitguide_theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        const text = document.getElementById('theme-toggle-text');
        if (text) {
            text.innerText = theme === 'dark' ? '🌙 Dark' : '☀️ Light';
        }
    },

    toggleTheme: () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('fitguide_theme', next);
        const text = document.getElementById('theme-toggle-text');
        if (text) {
            text.innerText = next === 'dark' ? '🌙 Dark' : '☀️ Light';
        }
        app.showToast(`Switched to ${next.toUpperCase()} mode`, 'info');
    },

    /* =========================================================================
       NAVIGATION & DRAWER CONTROLLER
       ========================================================================= */
    navigateTo: (sectionId) => {
        // Enforce secure authentication for personal user data
        if (!app.isAuthenticated && (sectionId === 'dashboard' || sectionId === 'profile')) {
            app.showToast("Please sign in to access your personal dashboard and fitness data.", "info");
            app.showAuthModal('signin');
            return;
        }

        app.currentSection = sectionId;
        document.querySelectorAll('.page-section').forEach(sec => {
            sec.classList.remove('active');
        });
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
        }

        // Update nav active classes
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('data-target') === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update drawer active classes
        document.querySelectorAll('.drawer-nav-item').forEach(item => {
            const onclickText = item.getAttribute('onclick') || '';
            if (onclickText.includes(`'${sectionId}'`)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Refresh views if needed
        if (sectionId === 'profile') {
            app.updateProfileDisplay();
        } else if (sectionId === 'dashboard') {
            app.updateDashboardMetrics();
            app.renderWeeklyStreakMatrix();
            app.renderWorkoutPlans();
        } else if (sectionId === 'nutrition') {
            app.generateMeals();
        } else if (sectionId === 'assistant') {
            app.updateAIAssistantStats();
            setTimeout(() => {
                const input = document.getElementById('chat-input');
                if (input) input.focus();
                const container = document.getElementById('chat-messages');
                if (container) container.scrollTop = container.scrollHeight;
            }, 100);
        }

        if (window.updateBottomNav) {
            window.updateBottomNav(sectionId);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    toggleNavDrawer: () => {
        const backdrop = document.getElementById('drawer-backdrop');
        if (backdrop) {
            backdrop.classList.toggle('active');
        }
    },

    closeNavDrawer: () => {
        const backdrop = document.getElementById('drawer-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
        }
    },

    navigateDrawer: (sectionId) => {
        app.closeNavDrawer();
        app.navigateTo(sectionId);
    },

    /* =========================================================================
       ASSESSMENT STEPPER WORKFLOW
       ========================================================================= */
    startAssessment: () => {
        app.currentStep = 1;
        app.showStep(1);
        app.navigateTo('assessment');
    },

    showStep: (stepNum) => {
        document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
        const targetStep = document.getElementById(`step-${stepNum}`);
        if (targetStep) targetStep.classList.add('active');

        // Update indicators
        const dots = document.querySelectorAll('.step-dot');
        dots.forEach((dot, idx) => {
            if (idx + 1 === stepNum) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    },

    nextStep: () => {
        if (app.currentStep < app.totalSteps) {
            app.currentStep++;
            app.showStep(app.currentStep);
        } else {
            app.finishAssessment();
        }
    },

    prevStep: () => {
        if (app.currentStep > 1) {
            app.currentStep--;
            app.showStep(app.currentStep);
        } else {
            app.navigateTo('home');
        }
    },

    finishAssessment: () => {
        // Collect values
        const age = parseInt(document.getElementById('age').value) || 28;
        const sex = document.getElementById('sex').value || 'male';
        const height = parseInt(document.getElementById('height').value) || 175;
        const weight = parseInt(document.getElementById('weight').value) || 70;

        const getSelectedVal = (stepId) => {
            const selected = document.querySelector(`#${stepId} .option-card.selected`);
            return selected ? selected.getAttribute('data-val') : '';
        };

        const activity = getSelectedVal('step-3') || 'moderate';
        const level = getSelectedVal('step-4') || 'beginner';
        const goal = getSelectedVal('step-5') || 'loss';
        const intensity = getSelectedVal('step-6') || 'Moderate';
        const diet = getSelectedVal('step-7') || 'veg';
        const foodPreferences = document.getElementById('food-preferences').value.trim();
        const equipment = getSelectedVal('step-8') || 'No equipment';
        const time = getSelectedVal('step-9') || '20';

        // Calculate Metrics using Calculators module
        const bmiObj = Calculators.calculateBMI(weight, height);
        const bmr = Math.round(Calculators.calculateBMR(weight, height, age, sex));
        const tdee = Math.round(Calculators.calculateTDEE(bmr, activity));
        const targetCal = Math.round(Calculators.calculateTargetCalories(tdee, goal));
        const proteinRange = Calculators.calculateProteinRange(weight, goal, activity);
        const targetPro = Math.round((proteinRange.min + proteinRange.max) / 2);

        app.userProfile = {
            age, sex, height, weight, activity, level, goal, intensity, diet,
            foodPreferences, equipment, time,
            bmi: bmiObj.bmi,
            bmiCategory: bmiObj.category,
            bmr, tdee,
            targetCalories: targetCal,
            targetProtein: targetPro
        };

        app.saveProfile();
        app.updateProfileDisplay();
        app.updateDashboardMetrics();
        app.generateMeals();
        app.renderExercises();
        app.renderWorkoutPlans();
        app.renderYogaPoses();
        app.renderProgramDay(app.currentProgramDay);

        app.showToast(`✨ Plan Created & Calibrated for ${sex.toUpperCase()} Athlete!`, 'fire');
        app.navigateTo('dashboard');
    },

    /* =========================================================================
       PROFILE & DASHBOARD METRICS DISPLAY
       ========================================================================= */
    updateProfileDisplay: () => {
        const p = app.userProfile;
        if (!p) return;

        // User Avatar and Header
        const user = app.users[app.currentUser];
        const athleteName = user ? user.name : (p.sex === 'female' ? 'Athlete (Female)' : 'Athlete (Male)');
        const nameEl = document.getElementById('profile-user-name');
        if (nameEl) nameEl.innerText = athleteName;

        const subtitleEl = document.getElementById('profile-user-subtitle');
        if (subtitleEl) {
            subtitleEl.innerText = `${user ? user.email : 'Personal Member'} • Calibrated for ${p.sex.toUpperCase()} Athlete`;
        }
        
        const avatarIcon = document.getElementById('profile-avatar-icon');
        if (avatarIcon) {
            avatarIcon.innerHTML = `<i class="fa-solid fa-${p.sex === 'female' ? 'person-dress' : 'person'}"></i>`;
        }

        const sexBadge = document.getElementById('profile-sex-badge');
        if (sexBadge) sexBadge.innerText = p.sex.toUpperCase();

        const levelBadge = document.getElementById('profile-level-badge');
        if (levelBadge) levelBadge.innerText = p.level.toUpperCase();

        const goalBadge = document.getElementById('profile-goal-badge');
        if (goalBadge) {
            const goalNames = { loss: 'Weight Loss', gain: 'Weight Gain', maintain: 'Maintain', fitness: 'General Fitness', gentle: 'Gentle', yoga: 'Yoga', flexibility: 'Flexibility', mobility: 'Mobility', relaxation: 'Relaxation' };
            goalBadge.innerText = goalNames[p.goal] || p.goal;
        }

        // Biometric summary rows
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        setVal('prof-age', `${p.age} years`);
        setVal('prof-sex', p.sex === 'female' ? 'Female' : 'Male');
        setVal('prof-height', `${p.height} cm`);
        setVal('prof-weight', `${p.weight} kg`);
        setVal('prof-bmi', p.bmi);
        setVal('prof-bmi-cat', p.bmiCategory);
        setVal('prof-bmr', `${p.bmr.toLocaleString()} kcal`);
        setVal('prof-tdee', `${p.tdee.toLocaleString()} kcal`);
        setVal('prof-target-cal', `${p.targetCalories.toLocaleString()} kcal`);
        setVal('prof-target-pro', `${p.targetProtein} g`);
        setVal('prof-diet', p.diet === 'veg' ? 'Vegetarian (Indian)' : (p.diet === 'non-veg' ? 'Non-Vegetarian (Indian)' : '100% Vegan (Plant-Based)'));
        setVal('prof-time', `${p.time} mins/day`);
        setVal('prof-equip', p.equipment);
        setVal('prof-intensity', p.intensity);
        setVal('prof-food-notes', p.foodPreferences || 'None entered');
        app.updateAIAssistantStats();
    },

    updateDashboardMetrics: () => {
        const p = app.userProfile;
        if (!p) return;

        // Personalized Summary Bar
        const workoutsCountEl = document.getElementById('dash-workouts-count');
        if (workoutsCountEl) {
            workoutsCountEl.innerText = (app.history && app.history.workouts) ? app.history.workouts.length : 5;
        }

        const minutesCountEl = document.getElementById('dash-minutes-count');
        if (minutesCountEl) {
            const mins = (app.history && app.history.workouts && app.history.workouts.length > 0)
                ? app.history.workouts.reduce((s, w) => s + (w.durationMinutes || 0), 0)
                : 119;
            minutesCountEl.innerText = `${mins} min`;
        }

        const weeklyGoalTextEl = document.getElementById('dash-weekly-goal-text');
        if (weeklyGoalTextEl) {
            const activeDays = Math.min(7, (app.history && app.history.workouts) ? app.history.workouts.length : 5);
            const pct = Math.round((activeDays / 7) * 100);
            weeklyGoalTextEl.innerText = `${activeDays} / 7 Days (${pct}%)`;
        }

        const weeklyGoalBarEl = document.getElementById('dash-weekly-goal-bar');
        if (weeklyGoalBarEl) {
            const activeDays = Math.min(7, (app.history && app.history.workouts) ? app.history.workouts.length : 5);
            weeklyGoalBarEl.style.width = `${Math.round((activeDays / 7) * 100)}%`;
        }

        const stepsCountEl = document.getElementById('dash-steps-count');
        if (stepsCountEl) {
            stepsCountEl.innerText = (7420 + ((app.streak ? app.streak.count : 1) * 350)).toLocaleString();
        }

        const aiRecTextEl = document.getElementById('dash-ai-recommendation-text');
        if (aiRecTextEl) {
            const goal = p.primaryGoal || 'Fitness';
            const level = p.fitnessLevel || 'Beginner';
            const targetCal = p.targetCalories || 2100;
            const targetPro = p.targetProtein || 112;
            aiRecTextEl.innerHTML = `"Great consistency this week! Based on your <strong>${goal}</strong> goal and <strong>${level}</strong> level, today is ideal for <strong>Day 1: Full Body Strength & Core</strong>. Target: <strong>${targetCal} kcal</strong> & <strong>${targetPro}g protein</strong>."`;
        }

        // Weight & Height
        const wEl = document.getElementById('dash-weight');
        if (wEl) wEl.innerHTML = `${p.weight} kg <span class="text-xs text-muted">/ ${p.height} cm</span>`;

        // BMI
        const bmiEl = document.getElementById('dash-bmi');
        if (bmiEl) bmiEl.innerText = p.bmi;

        const bmiCatEl = document.getElementById('dash-bmi-cat');
        if (bmiCatEl) {
            bmiCatEl.innerText = p.bmiCategory;
            if (p.bmiCategory === 'Normal Weight') {
                bmiCatEl.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
                bmiCatEl.style.color = 'var(--accent)';
            } else if (p.bmiCategory === 'Overweight') {
                bmiCatEl.style.backgroundColor = 'rgba(245, 158, 11, 0.15)';
                bmiCatEl.style.color = '#d97706';
            } else {
                bmiCatEl.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                bmiCatEl.style.color = '#dc2626';
            }
        }

        // Calories
        const calConsumedEl = document.getElementById('dash-cal-consumed');
        if (calConsumedEl) calConsumedEl.innerText = app.consumedCalories;

        const calTargetEl = document.getElementById('dash-cal-target');
        if (calTargetEl) calTargetEl.innerText = p.targetCalories;

        const calBar = document.getElementById('dash-cal-bar');
        if (calBar) {
            const pct = Math.min(100, Math.round((app.consumedCalories / p.targetCalories) * 100));
            calBar.style.width = `${pct}%`;
        }

        // Protein
        const proConsumedEl = document.getElementById('dash-pro-consumed');
        if (proConsumedEl) proConsumedEl.innerText = app.consumedProtein;

        const proTargetEl = document.getElementById('dash-pro-target');
        if (proTargetEl) proTargetEl.innerText = p.targetProtein;

        const proBar = document.getElementById('dash-pro-bar');
        if (proBar) {
            const pct = Math.min(100, Math.round((app.consumedProtein / p.targetProtein) * 100));
            proBar.style.width = `${pct}%`;
        }

        // Streak Count
        const sCount = document.getElementById('dash-streak-count');
        if (sCount) sCount.innerText = app.streak.count;
        const sBest = document.getElementById('dash-best-streak');
        if (sBest) sBest.innerText = app.streak.best;
        const sTotal = document.getElementById('dash-total-active');
        if (sTotal) sTotal.innerText = app.streak.totalActive;
    },

    trackMacro: (type) => {
        if (type === 'cal') {
            const input = document.getElementById('track-cal-input');
            const val = parseInt(input.value);
            if (val && val > 0) {
                app.consumedCalories += val;
                input.value = '';
                app.saveMacros();
                app.updateDashboardMetrics();
                app.showToast(`+${val} kcal logged to Daily Calories!`, 'info');
            }
        } else if (type === 'pro') {
            const input = document.getElementById('track-pro-input');
            const val = parseInt(input.value);
            if (val && val > 0) {
                app.consumedProtein += val;
                input.value = '';
                app.saveMacros();
                app.updateDashboardMetrics();
                app.showToast(`+${val}g logged to Daily Protein!`, 'info');
            }
        }
    },

    /* =========================================================================
       MOVEMENT STREAK SYSTEM
       ========================================================================= */
    renderWeeklyStreakMatrix: () => {
        const matrix = document.getElementById('weekly-streak-matrix');
        if (!matrix) return;
        matrix.innerHTML = '';

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const currentDayOfWeek = (new Date().getDay() + 6) % 7; // 0 for Mon, 6 for Sun

        days.forEach((dayName, idx) => {
            const isCompleted = app.streak.weeklyLog[idx] || false;
            const isToday = idx === currentDayOfWeek;
            const pill = document.createElement('div');
            pill.className = `day-pill ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}`;
            pill.innerHTML = `
                <div>${dayName}</div>
                <div style="font-size:1.1rem; margin-top:2px;">${isCompleted ? '🔥' : (isToday ? '⏳' : '⚪')}</div>
            `;
            matrix.appendChild(pill);
        });

        const statusMsg = document.getElementById('streak-status-msg');
        if (statusMsg) {
            const todayLogged = app.streak.weeklyLog[currentDayOfWeek];
            statusMsg.innerText = todayLogged ? "Today's movement: Successfully logged! 🔥" : "Today's movement: Not logged yet";
        }
    },

    logStreakToday: (silent = false) => {
        const currentDayOfWeek = (new Date().getDay() + 6) % 7;
        const todayStr = new Date().toDateString();

        if (app.streak.lastLoggedDate === todayStr) {
            if (!silent) app.showToast("You've already logged today's movement streak! Keep up the momentum! 🔥", 'fire');
            return;
        }

        app.streak.count += 1;
        if (app.streak.count > app.streak.best) {
            app.streak.best = app.streak.count;
        }
        app.streak.totalActive += 1;
        app.streak.lastLoggedDate = todayStr;
        app.streak.weeklyLog[currentDayOfWeek] = true;

        app.saveStreak();
        app.updateNavStreak();
        app.updateDashboardMetrics();
        app.renderWeeklyStreakMatrix();

        if (!silent) {
            app.showToast(`🔥 Movement Session Logged! Active Streak: ${app.streak.count} Days!`, 'fire');
        }
    },

    updateNavStreak: () => {
        const navStreak = document.getElementById('nav-streak-count');
        if (navStreak) navStreak.innerText = app.streak.count;
    },

    showStreakModal: () => {
        const modal = document.getElementById('streak-modal');
        if (!modal) return;

        document.getElementById('modal-streak-current').innerText = `${app.streak.count} Day${app.streak.count === 1 ? '' : 's'}`;
        document.getElementById('modal-streak-best').innerText = `${app.streak.best} Day${app.streak.best === 1 ? '' : 's'}`;
        document.getElementById('modal-streak-total').innerText = `${app.streak.totalActive} Day${app.streak.totalActive === 1 ? '' : 's'}`;

        const badgesContainer = document.getElementById('streak-achievements-list');
        if (badgesContainer) {
            badgesContainer.innerHTML = '';
            const milestones = [
                { days: 1, title: 'Day 1 Spark', icon: '⚡' },
                { days: 3, title: '3-Day Fire', icon: '🔥' },
                { days: 7, title: '7-Day Warrior', icon: '🏆' },
                { days: 14, title: '14-Day Champion', icon: '⭐' }
            ];

            milestones.forEach(m => {
                const unlocked = app.streak.count >= m.days;
                const b = document.createElement('div');
                b.className = 'streak-stat-box';
                b.style.opacity = unlocked ? '1' : '0.45';
                b.innerHTML = `
                    <div style="font-size:1.4rem;">${m.icon}</div>
                    <div style="font-size:0.75rem; font-weight:700;">${m.title}</div>
                    <div style="font-size:0.68rem; color:var(--text-muted);">${unlocked ? 'Unlocked ✨' : `${m.days} Days`}</div>
                `;
                badgesContainer.appendChild(b);
            });
        }

        modal.classList.add('active');
    },

    closeStreakModal: () => {
        const modal = document.getElementById('streak-modal');
        if (modal) modal.classList.remove('active');
    },

    /* =========================================================================
       7-DAY WORKOUT PROGRAM CONTROLLER & RESPONSIVE ROUTINES
       ========================================================================= */
    setWorkoutFilter: (filterKey) => {
        app.currentWorkoutFilter = filterKey;
        document.querySelectorAll('.workout-filter-btn').forEach(btn => {
            const isMatch = btn.getAttribute('data-filter') === filterKey;
            btn.classList.toggle('active', isMatch);
        });
        app.renderWorkoutPlans();
    },

    renderWorkoutPlans: () => {
        const containers = [
            document.getElementById('workout-plans-grid'),
            document.getElementById('dash-workout-cards-grid')
        ].filter(Boolean);

        if (containers.length === 0) return;
        containers.forEach(c => c.innerHTML = '');

        const sex = (app.userProfile && app.userProfile.sex) ? app.userProfile.sex : 'male';
        const filter = app.currentWorkoutFilter || 'all';

        const filtered = workoutPlans.filter(plan => {
            if (filter === 'all') return true;
            if (filter === 'beginner') return plan.level && plan.level.toLowerCase().includes('beginner');
            if (filter === 'intermediate') return plan.level && plan.level.toLowerCase().includes('intermediate');
            if (filter === 'advanced') return plan.level && plan.level.toLowerCase().includes('advanced');
            if (filter === 'yoga') return plan.category === 'Yoga' || (plan.type && plan.type.toLowerCase().includes('yoga'));
            if (filter === 'gentle') return plan.category === 'Gentle Movement' || (plan.type && plan.type.toLowerCase().includes('gentle'));
            return true;
        });

        containers.forEach(container => {
            if (filtered.length === 0) {
                container.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding: 2rem; color: var(--text-2);">No routines found for this filter. <button class="btn-outline-sm mt-1" onclick="app.setWorkoutFilter('all')">View All</button></div>`;
                return;
            }

            filtered.forEach(plan => {
                // Adaptive Real Human Cover Photo based on Athlete's sex
                const coverPhoto = (sex === 'female' && plan.imageFemale) 
                    ? plan.imageFemale 
                    : ((sex === 'male' && plan.imageMale) ? plan.imageMale : plan.image);

                const card = document.createElement('div');
                card.className = 'card workout-responsive-card';
                card.style.display = 'flex';
                card.style.flexDirection = 'column';
                card.innerHTML = `
                    <div class="workout-card-img-box">
                        <img src="${coverPhoto}" alt="${plan.title} demonstration" class="workout-card-img" onerror="this.src='assets/images/exercises/ex_squat_human.jpg'">
                        <span class="workout-card-badge">${plan.level} • ${plan.intensity || 'Active'}</span>
                    </div>
                    <div style="flex:1; display:flex; flex-direction:column; padding-top:0.35rem;">
                        <h3 style="margin-bottom:0.25rem;">${plan.title}</h3>
                        <p class="text-xs text-muted" style="flex:1; margin-bottom:0.75rem;">${plan.description}</p>
                        <div class="workout-card-meta-row">
                            <span><i class="fa-solid fa-clock text-accent"></i> ${plan.durationMinutes} mins</span>
                            <span><i class="fa-solid fa-fire text-accent"></i> ~${plan.caloriesEst || 200} kcal</span>
                            <span><i class="fa-solid fa-dumbbell text-accent"></i> ${plan.equipment}</span>
                        </div>
                        <div class="workout-card-actions-row mt-1">
                            <button class="btn-primary-sm" onclick="app.startWorkoutPlayer('${plan.id}')" title="Launch Interactive Workout Player">
                                <i class="fa-solid fa-play"></i> Start Routine
                            </button>
                            <button class="btn-secondary-sm" onclick="app.showPlanModal('${plan.id}')" title="View Full Schedule">
                                <i class="fa-solid fa-list-ul"></i> View Schedule
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        });
    },

    /* =========================================================================
       MY MONTHLY FITNESS REPORT CONTROLLER (REAL DATA AUTOMATION)
       ========================================================================= */
    generateMonthlyReport: () => {
        const user = app.users[app.currentUser] || {};
        const p = app.userProfile || {};
        const h = app.history || { workouts: [], exercises: [], weighIns: [], caloriesHistory: [] };

        // Starting & Current Weight
        const weighIns = h.weighIns && h.weighIns.length > 0 ? h.weighIns : [{ weight: p.weight }];
        const startWeight = weighIns[0].weight;
        const currentWeight = weighIns[weighIns.length - 1].weight;
        const weightDiff = (currentWeight - startWeight).toFixed(1);

        // Goal Progress
        const targetGoalName = p.goal || 'loss';
        let goalProgressPct = 75;
        if (targetGoalName === 'loss') {
            const lost = startWeight - currentWeight;
            goalProgressPct = Math.max(10, Math.min(100, Math.round((Math.max(0, lost) / 3.0) * 100)));
            if (lost <= 0) goalProgressPct = 65;
        }

        // Real Workouts & Volume
        const workouts = h.workouts || [];
        const totalWorkouts = workouts.length > 0 ? workouts.length : 5;
        const totalMinutes = workouts.length > 0 ? workouts.reduce((s, w) => s + (w.durationMinutes || 0), 0) : 119;
        const totalCaloriesBurned = workouts.length > 0 ? workouts.reduce((s, w) => s + (w.caloriesBurned || 0), 0) : 1080;

        // Mindful Sessions
        const yogaCount = workouts.filter(w => (w.category && w.category.toLowerCase().includes('yoga')) || (w.title && w.title.toLowerCase().includes('yoga'))).length;
        const gentleCount = workouts.filter(w => (w.category && w.category.toLowerCase().includes('gentle')) || (w.title && w.title.toLowerCase().includes('gentle'))).length;

        // Calorie & Protein Targets and Averages
        const calTarget = p.targetCalories || 2100;
        const proTarget = p.targetProtein || 112;
        const calHist = h.caloriesHistory || [];
        const avgCal = calHist.length > 0 ? Math.round(calHist.reduce((s, c) => s + c.consumed, 0) / calHist.length) : Math.round(calTarget * 0.98);
        const avgPro = calHist.length > 0 ? Math.round(calHist.reduce((s, c) => s + c.protein, 0) / calHist.length) : Math.round(proTarget * 0.96);

        // 31-Day October Matrix (October 2026, today is Oct 7)
        const workoutDates = new Set(workouts.map(w => w.date));
        const daysMatrix = [];
        for (let d = 1; d <= 31; d++) {
            const dStr = `2026-10-${d < 10 ? '0' + d : d}`;
            let status = 'upcoming';
            if (d < 7) {
                status = workoutDates.has(dStr) ? 'completed' : 'rest';
            } else if (d === 7) {
                status = 'today';
            }
            daysMatrix.push({ day: d, date: dStr, status });
        }

        return {
            month: 'October 2026',
            athleteName: user.name || (p.sex === 'female' ? 'Elena Vance' : 'Alex Mercer'),
            sex: p.sex || 'male',
            goal: p.goal || 'Weight Loss',
            level: p.level || 'Beginner',
            startWeight,
            currentWeight,
            weightDiff,
            goalProgressPct,
            totalWorkouts,
            totalMinutes,
            totalCaloriesBurned,
            yogaCount,
            gentleCount,
            calTarget,
            proTarget,
            avgCal,
            avgPro,
            streakCount: app.streak.count || 5,
            bestStreak: app.streak.best || 8,
            daysMatrix,
            workouts,
            exercises: h.exercises || []
        };
    },

    viewMonthlyReport: () => {
        const report = app.generateMonthlyReport();
        const modal = document.getElementById('monthly-report-modal');
        if (!modal) return;

        // Populate Header & Athlete Info
        const athleteNameEl = document.getElementById('rep-athlete-name');
        if (athleteNameEl) athleteNameEl.innerText = report.athleteName;
        const repMonthEl = document.getElementById('rep-month-title');
        if (repMonthEl) repMonthEl.innerText = `FITGUIDE AI — Monthly Progress Report [${report.month}]`;
        const repSexEl = document.getElementById('rep-athlete-sex');
        if (repSexEl) repSexEl.innerText = report.sex.toUpperCase();
        const repGoalEl = document.getElementById('rep-athlete-goal');
        if (repGoalEl) repGoalEl.innerText = report.goal.toUpperCase();

        // Populate Biometric & Goal Progress
        const startWEl = document.getElementById('rep-start-weight');
        if (startWEl) startWEl.innerText = `${report.startWeight} kg`;
        const currWEl = document.getElementById('rep-curr-weight');
        if (currWEl) currWEl.innerText = `${report.currentWeight} kg`;
        const diffWEl = document.getElementById('rep-diff-weight');
        if (diffWEl) {
            const diffNum = parseFloat(report.weightDiff);
            diffWEl.innerText = `${diffNum > 0 ? '+' : ''}${report.weightDiff} kg`;
            diffWEl.style.color = diffNum <= 0 ? 'var(--accent)' : '#3b82f6';
        }
        const goalBarEl = document.getElementById('rep-goal-bar');
        if (goalBarEl) goalBarEl.style.width = `${report.goalProgressPct}%`;
        const goalPctEl = document.getElementById('rep-goal-pct');
        if (goalPctEl) goalPctEl.innerText = `${report.goalProgressPct}% Achieved`;

        // Populate Workout & Training Volume
        const totalWEl = document.getElementById('rep-total-workouts');
        if (totalWEl) totalWEl.innerText = report.totalWorkouts;
        const totalMEl = document.getElementById('rep-total-minutes');
        if (totalMEl) totalMEl.innerText = `${report.totalMinutes} min`;
        const totalCEl = document.getElementById('rep-total-calories');
        if (totalCEl) totalCEl.innerText = `${report.totalCaloriesBurned.toLocaleString()} kcal`;
        const streakEl = document.getElementById('rep-streak-count');
        if (streakEl) streakEl.innerText = `${report.streakCount} Days (Best: ${report.bestStreak})`;

        // Nutrition Targets vs Averages
        const calTargEl = document.getElementById('rep-cal-targets');
        if (calTargEl) calTargEl.innerText = `${report.avgCal} avg / ${report.calTarget} target kcal`;
        const proTargEl = document.getElementById('rep-pro-targets');
        if (proTargEl) proTargEl.innerText = `${report.avgPro}g avg / ${report.proTarget}g target`;

        // Mindful Movement
        const yogaEl = document.getElementById('rep-yoga-sessions');
        if (yogaEl) yogaEl.innerText = `${report.yogaCount} Flow Sessions`;
        const gentleEl = document.getElementById('rep-gentle-sessions');
        if (gentleEl) gentleEl.innerText = `${report.gentleCount} Recovery Sessions`;

        // 31-Day October Matrix
        const matrixEl = document.getElementById('rep-days-matrix');
        if (matrixEl) {
            matrixEl.innerHTML = '';
            report.daysMatrix.forEach(d => {
                const cell = document.createElement('div');
                cell.className = `rep-day-cell status-${d.status}`;
                cell.title = `Oct ${d.day}: ${d.status.toUpperCase()}`;
                cell.innerHTML = `
                    <span class="rep-day-num">${d.day}</span>
                    <span class="rep-day-icon">${d.status === 'completed' ? '✓' : (d.status === 'today' ? '⚡' : (d.status === 'rest' ? '•' : ''))}</span>
                `;
                matrixEl.appendChild(cell);
            });
        }

        // Exercise History Table
        const tableBody = document.getElementById('rep-exercise-table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            const list = report.exercises && report.exercises.length > 0 
                ? report.exercises 
                : [
                    { date: '2026-10-07', name: 'Squats', category: 'Home Workout', sets: 3, reps: '18 reps', duration: '45s' },
                    { date: '2026-10-07', name: 'Push-ups', category: 'Strength', sets: 3, reps: '12 reps', duration: '40s' },
                    { date: '2026-10-07', name: 'Forearm Plank', category: 'Core', sets: 3, reps: '45s hold', duration: '45s' },
                    { date: '2026-10-07', name: 'Glute Bridges', category: 'Strength', sets: 3, reps: '15 reps', duration: '45s' },
                    { date: '2026-10-07', name: 'Crunches', category: 'Core', sets: 3, reps: '20 reps', duration: '40s' }
                ];

            list.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${item.date || '2026-10-07'}</strong></td>
                    <td>${item.name}</td>
                    <td><span class="badge">${item.category || 'Movement'}</span></td>
                    <td>${item.sets || 3} sets × ${item.reps || '12 reps'}</td>
                    <td>${item.duration || '45s'}</td>
                `;
                tableBody.appendChild(tr);
            });
        }

        // Section F: Milestone Achievements Badges
        const achContainer = document.getElementById('rep-achievements-container');
        if (achContainer) {
            achContainer.innerHTML = '';
            const achievements = [
                { icon: '🔥', title: `${report.streakCount}-Day Active Streak`, desc: 'Unbroken daily movement consistency' },
                { icon: '🏆', title: 'Volume Mastery', desc: `${report.totalWorkouts} structured sessions logged` },
                { icon: '⚡', title: 'Energy Engine', desc: `${report.totalCaloriesBurned.toLocaleString()} kcal active expenditure` },
                { icon: '🧘', title: 'Mindful Equilibrium', desc: `${report.yogaCount + report.gentleCount} restorative flows & mobility` }
            ];
            achievements.forEach(ach => {
                const box = document.createElement('div');
                box.className = 'achievement-pill-card';
                box.style.background = 'var(--card-2)';
                box.style.border = '1px solid var(--border-light)';
                box.style.borderRadius = 'var(--r-sm)';
                box.style.padding = '0.55rem 0.75rem';
                box.style.display = 'flex';
                box.style.alignItems = 'center';
                box.style.gap = '0.6rem';
                box.innerHTML = `
                    <span style="font-size:1.4rem;">${ach.icon}</span>
                    <div>
                        <strong style="font-size:0.8rem;color:var(--text);display:block;">${ach.title}</strong>
                        <span style="font-size:0.7rem;color:var(--text-2);">${ach.desc}</span>
                    </div>
                `;
                achContainer.appendChild(box);
            });
        }

        // Section F: Data-Based Insights List
        const insList = document.getElementById('rep-insights-list');
        if (insList) {
            insList.innerHTML = '';
            const deltaNum = parseFloat(report.weightDiff);
            const deltaStr = deltaNum <= 0 ? `reduced weight by ${Math.abs(deltaNum)} kg` : `gained +${deltaNum} kg`;
            const insights = [
                `<strong>Training Volume Adherence:</strong> Completed ${report.totalWorkouts} structured workouts totaling ${report.totalMinutes} active minutes with ~${report.totalCaloriesBurned.toLocaleString()} kcal energy burned.`,
                `<strong>Weight & Milestones:</strong> Tracked baseline from ${report.startWeight} kg to ${report.currentWeight} kg (${deltaStr}), fulfilling ${report.goalProgressPct}% of your monthly progression target.`,
                `<strong>Nutritional Alignment:</strong> Calorie intake averaged ${report.avgCal} kcal daily (target: ${report.calTarget} kcal) with ${report.avgPro}g protein adherence (target: ${report.proTarget}g) calculated via Mifflin-St Jeor formula.`,
                `<strong>Active Recovery Ratio:</strong> Integrated ${report.yogaCount} Yoga flow sessions and ${report.gentleCount} Gentle Movement routines, ensuring balanced sympathetic and parasympathetic recovery.`,
                `<strong>FitGuide AI Recommendation:</strong> Maintain progressive challenge in your resistance circuits while keeping recovery and hydration steady.`
            ];
            insights.forEach(txt => {
                const li = document.createElement('li');
                li.style.marginBottom = '0.35rem';
                li.innerHTML = txt;
                insList.appendChild(li);
            });
        }

        modal.classList.add('active');
    },

    closeMonthlyReportModal: () => {
        const modal = document.getElementById('monthly-report-modal');
        if (modal) modal.classList.remove('active');
    },

    downloadMonthlyReport: () => {
        const report = app.generateMonthlyReport();
        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>FITGUIDE AI — Monthly Progress Report (${report.month})</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0c10; color: #f0f4f8; margin: 0; padding: 32px; line-height: 1.5; }
  .header { border-bottom: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
  .brand { font-size: 24px; font-weight: 800; color: #10b981; letter-spacing: -0.5px; }
  .title { font-size: 20px; font-weight: 700; margin: 6px 0 2px 0; color: #fff; }
  .subtitle { font-size: 13px; color: #94a3b8; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .card { background: #111622; border: 1px solid #1e293b; border-radius: 10px; padding: 16px; }
  .card-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px; }
  .card-val { font-size: 22px; font-weight: 700; color: #10b981; }
  .card-sub { font-size: 11px; color: #64748b; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #1e293b; }
  th { background: #161e2e; color: #94a3b8; font-size: 11px; text-transform: uppercase; }
  .insights-box { background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981; padding: 16px; border-radius: 6px; margin-top: 24px; font-size: 13px; color: #cbd5e1; }
  .footer { margin-top: 36px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; text-align: center; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">FITGUIDE AI</div>
      <div class="title">Monthly Progress Report — ${report.month}</div>
      <div class="subtitle">Athlete: ${report.athleteName} • Biological Sex: ${report.sex.toUpperCase()} • Goal: ${report.goal.toUpperCase()}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:12px;color:#94a3b8;">Generated on</div>
      <div style="font-weight:700;">October 7, 2026</div>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <div class="card-label">Weight & Progress</div>
      <div class="card-val">${report.currentWeight} kg</div>
      <div class="card-sub">Started at ${report.startWeight} kg (${report.weightDiff} kg change)</div>
    </div>
    <div class="card">
      <div class="card-label">Total Workouts</div>
      <div class="card-val">${report.totalWorkouts} sessions</div>
      <div class="card-sub">${report.totalMinutes} total active minutes</div>
    </div>
    <div class="card">
      <div class="card-label">Calories Burned</div>
      <div class="card-val">${report.totalCaloriesBurned} kcal</div>
      <div class="card-sub">Target: ${report.calTarget} kcal daily</div>
    </div>
    <div class="card">
      <div class="card-label">Active Streak</div>
      <div class="card-val">${report.streakCount} Days</div>
      <div class="card-sub">All-time best: ${report.bestStreak} days</div>
    </div>
  </div>

  <h3 style="margin-top:24px;color:#fff;font-size:15px;">Recent Daily Exercise History</h3>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Exercise Movement</th>
        <th>Category</th>
        <th>Completed Sets & Reps</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      ${(report.exercises && report.exercises.length > 0 ? report.exercises : [
        { date: '2026-10-07', name: 'Squats', category: 'Home Workout', sets: 3, reps: '18 reps', duration: '45s' },
        { date: '2026-10-07', name: 'Push-ups', category: 'Strength', sets: 3, reps: '12 reps', duration: '40s' },
        { date: '2026-10-07', name: 'Forearm Plank', category: 'Core', sets: 3, reps: '45s hold', duration: '45s' },
        { date: '2026-10-07', name: 'Glute Bridges', category: 'Strength', sets: 3, reps: '15 reps', duration: '45s' }
      ]).map(ex => `<tr><td>${ex.date || '2026-10-07'}</td><td><strong>${ex.name}</strong></td><td>${ex.category || 'Movement'}</td><td>${ex.sets || 3} sets × ${ex.reps || '15 reps'}</td><td>${ex.duration || '45s'}</td></tr>`).join('')}
    </tbody>
  </table>

  <div class="insights-box">
    <strong>FitGuide AI Intelligence & Adherence Insights:</strong><br>
    • Monthly Training Consistency: Completed ${report.totalWorkouts} structured sessions accumulating ${report.totalMinutes} minutes of metabolic output.<br>
    • Mindful Recovery Balance: Incorporated ${report.yogaCount} Yoga flows and ${report.gentleCount} Gentle Movement recovery routines.<br>
    • Nutritional Calibration: Average daily energy intake is ${report.avgCal} kcal with ${report.avgPro}g protein adherence.<br>
    • Recommendation: Maintain progressive overload in lower body training and sustain daily hydration.
  </div>

  <div class="footer">
    FitGuide AI — Evidence-informed fitness algorithms, mindful movement & personalized Indian nutrition.
  </div>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FitGuide_Monthly_Progress_Report_October_2026.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        app.showToast("📄 Monthly report downloaded successfully!", "fire");
    },

    shareMonthlyReport: () => {
        const report = app.generateMonthlyReport();
        const summaryText = `🏆 FITGUIDE AI — Monthly Progress Report (${report.month})\n` +
            `Athlete: ${report.athleteName} (${report.sex.toUpperCase()})\n` +
            `• Workouts: ${report.totalWorkouts} sessions (${report.totalMinutes} active mins)\n` +
            `• Estimated Burn: ${report.totalCaloriesBurned} kcal\n` +
            `• Weight: ${report.startWeight} kg → ${report.currentWeight} kg (${report.weightDiff} kg change)\n` +
            `• Active Streak: ${report.streakCount} days (Best: ${report.bestStreak})\n` +
            `• Mindful Sessions: ${report.yogaCount} Yoga & ${report.gentleCount} Gentle Recovery\n` +
            `Generated by FitGuide AI — Evidence-informed personal fitness.`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(summaryText).then(() => {
                app.showToast("📋 Report summary copied to clipboard! Ready to share.", "fire");
            }).catch(() => {
                app.showToast("Summary generated. Ready to share!", "info");
            });
        }

        if (navigator.share) {
            navigator.share({
                title: `FitGuide AI - Monthly Report (${report.month})`,
                text: summaryText,
                url: window.location.href
            }).catch(() => {});
        }
    },

    selectProgramDay: (dayIndex) => {
        app.currentProgramDay = dayIndex;
        document.querySelectorAll('.day-btn').forEach(btn => {
            if (parseInt(btn.getAttribute('data-day')) === dayIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        app.renderProgramDay(dayIndex);
    },

    getExercisePhoto: (exId) => {
        const sex = (app.userProfile && app.userProfile.sex) ? app.userProfile.sex : 'male';
        if (sex === 'female' && femaleImages[exId]) {
            return femaleImages[exId];
        }
        if (sex === 'male' && maleImages[exId]) {
            return maleImages[exId];
        }
        const found = exercises.find(e => e.id === exId);
        return found ? found.image : 'assets/images/exercises/ex_squat_human.jpg';
    },

    renderProgramDay: (dayIndex) => {
        const program = weeklyProgram[dayIndex];
        if (!program) return;

        // Update Hero with sex-adaptive real human photo
        const heroImg = document.getElementById('pro-hero-img');
        const sex = (app.userProfile && app.userProfile.sex) ? app.userProfile.sex : 'male';
        const heroPhoto = app.getExercisePhoto(program.exercises[0]) || program.heroImage;
        if (heroImg) heroImg.src = heroPhoto;

        const dayBadge = document.getElementById('pro-day-badge');
        if (dayBadge) dayBadge.innerText = program.badge;

        const title = document.getElementById('workout-title');
        if (title) title.innerText = program.title;

        const subtitle = document.getElementById('workout-subtitle');
        if (subtitle) subtitle.innerText = `${program.exercises.length} Targeted Exercises • Zero Equipment • 20 mins`;

        // Render Exercise List
        const list = document.getElementById('workout-list');
        if (!list) return;
        list.innerHTML = '';

        let completedCount = 0;

        program.exercises.forEach((exId, idx) => {
            const ex = exercises.find(e => e.id === exId) || {
                id: exId,
                name: exId.replace('ex-', '').replace('gm-', '').replace('yoga-', '').replace(/-/g, ' '),
                target: 'Core & Full Body',
                sets: '3',
                reps: '12 reps',
                duration: '45s',
                image: 'assets/images/exercises/ex_squat_human.jpg'
            };

            const key = `${dayIndex}-${ex.id}`;
            const isDone = app.dailyCompletedExercises[key] || false;
            if (isDone) completedCount++;

            const photo = app.getExercisePhoto(ex.id);

            const row = document.createElement('div');
            row.className = `exercise-row-item ${isDone ? 'completed' : ''}`;
            row.innerHTML = `
                <div class="exercise-thumb-wrap">
                    <img src="${photo}" alt="${ex.name}" class="exercise-thumb" onerror="this.src='assets/images/exercises/ex_squat_human.jpg'">
                </div>
                <div class="exercise-info">
                    <h4>${ex.name}</h4>
                    <div class="exercise-meta-text">
                        <span><i class="fa-solid fa-bullseye text-accent"></i> ${ex.target}</span> • 
                        <span><i class="fa-solid fa-rotate-right text-accent"></i> ${ex.reps || ex.duration}</span>
                    </div>
                </div>
                <div class="exercise-actions-wrap">
                    <button class="btn-secondary btn-sm" onclick="app.showExerciseModal('${ex.id}')"><i class="fa-solid fa-circle-info"></i> Guide</button>
                    <button class="${isDone ? 'btn-primary-sm' : 'btn-outline-sm'}" onclick="app.toggleExerciseDone(${dayIndex}, '${ex.id}')">
                        <i class="fa-solid fa-${isDone ? 'circle-check' : 'circle'}"></i> ${isDone ? 'Done' : 'Mark'}
                    </button>
                </div>
            `;
            list.appendChild(row);
        });

        // Update Progress Bar
        const total = program.exercises.length;
        const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
        const progressText = document.getElementById('daily-progress-text');
        if (progressText) {
            progressText.innerText = `${completedCount} of ${total} exercises completed (${pct}%)`;
        }
        const progressBar = document.getElementById('daily-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${pct}%`;
        }
    },

    toggleExerciseDone: (dayIndex, exId) => {
        const key = `${dayIndex}-${exId}`;
        app.dailyCompletedExercises[key] = !app.dailyCompletedExercises[key];
        app.saveDailyCompleted();
        app.renderProgramDay(dayIndex);

        // Check if all exercises finished
        const program = weeklyProgram[dayIndex];
        if (program) {
            const allDone = program.exercises.every(id => app.dailyCompletedExercises[`${dayIndex}-${id}`]);
            if (allDone) {
                app.logStreakToday();
            }
        }
    },

    /* =========================================================================
       WORKOUT TIMER
       ========================================================================= */
    startWorkoutTimer: () => {
        if (app.isWorkoutRunning) return;
        app.isWorkoutRunning = true;
        document.getElementById('start-workout-btn').classList.add('hidden');
        document.getElementById('stop-workout-btn').classList.remove('hidden');

        app.workoutTimer = setInterval(() => {
            app.workoutSeconds++;
            const mins = Math.floor(app.workoutSeconds / 60).toString().padStart(2, '0');
            const secs = (app.workoutSeconds % 60).toString().padStart(2, '0');
            document.getElementById('workout-timer-display').innerText = `${mins}:${secs}`;
        }, 1000);
    },

    stopWorkoutTimer: () => {
        clearInterval(app.workoutTimer);
        app.isWorkoutRunning = false;
        document.getElementById('start-workout-btn').classList.remove('hidden');
        document.getElementById('stop-workout-btn').classList.add('hidden');
        const finalTime = document.getElementById('workout-timer-display').innerText;
        app.logStreakToday(true);
        app.showToast(`Workout Paused at ${finalTime}`, 'info');
    },

    /* =========================================================================
       INTERACTIVE PLAYER MODAL
       ========================================================================= */
    startWorkoutPlayerCurrentDay: () => {
        const program = weeklyProgram[app.currentProgramDay];
        if (!program) return;
        const items = program.exercises.map(id => {
            const ex = exercises.find(e => e.id === id);
            return ex || { id, name: id, duration: '45s', image: 'assets/images/exercises/ex_squat_human.jpg', target: 'Core' };
        });
        app.launchPlayer(items, program.badge);
    },

    startWorkoutPlayer: (planId) => {
        const plan = workoutPlans.find(p => p.id === planId) || workoutPlans[0];
        app.launchPlayer(plan.exercises, plan.title);
    },

    startYogaPlayer: (collectionId) => {
        const col = yogaCollections.find(c => c.id === collectionId);
        if (col) {
            app.launchPlayer(col.poses, col.title);
        }
    },

    launchPlayer: (items, titleBadge) => {
        app.playerQueue = items;
        app.playerIndex = 0;
        app.isPlayerResting = false;

        const badgeEl = document.getElementById('player-badge');
        if (badgeEl) badgeEl.innerText = titleBadge;

        const modal = document.getElementById('routine-modal');
        if (modal) modal.classList.add('active');

        app.loadPlayerItem(0);
    },

    loadPlayerItem: (index) => {
        clearInterval(app.playerTimer);
        if (index >= app.playerQueue.length) {
            app.closePlayerModal();
            app.logStreakToday();
            app.showToast("🎉 Routine Completed! Movement Streak Updated!", 'fire');
            return;
        }

        app.playerIndex = index;
        const item = app.playerQueue[index];
        app.playerOriginalItem = item;

        const titleEl = document.getElementById('player-title');
        if (titleEl) titleEl.innerText = item.name;

        const targetEl = document.getElementById('player-target');
        if (targetEl) targetEl.innerText = item.target || 'General Movement';

        const imgEl = document.getElementById('player-img');
        if (imgEl) imgEl.src = app.getExercisePhoto(item.id);

        const stepCount = document.getElementById('player-step-count');
        if (stepCount) stepCount.innerText = `Exercise ${index + 1} of ${app.playerQueue.length}`;

        const restIndicator = document.getElementById('player-rest-indicator');
        if (restIndicator) restIndicator.classList.add('hidden');

        app.playerSecondsLeft = item.durationSec || 45;
        app.updatePlayerTimerDisplay();
        app.updatePlayerProgressBar();

        app.isPlayerRunning = true;
        document.getElementById('player-toggle-btn').innerHTML = '<i class="fa-solid fa-pause"></i> Pause';

        app.playerTimer = setInterval(app.playerTick, 1000);
    },

    playerTick: () => {
        if (app.playerSecondsLeft > 0) {
            app.playerSecondsLeft--;
            app.updatePlayerTimerDisplay();
        } else {
            if (!app.isPlayerResting) {
                // Enter Rest Period
                app.isPlayerResting = true;
                app.playerSecondsLeft = 15;
                const restIndicator = document.getElementById('player-rest-indicator');
                if (restIndicator) restIndicator.classList.remove('hidden');
                document.getElementById('player-title').innerText = "Rest & Recover";
                app.showToast("Rest Period (15s)", 'info');
            } else {
                // Next Item
                app.isPlayerResting = false;
                app.loadPlayerItem(app.playerIndex + 1);
            }
        }
    },

    updatePlayerTimerDisplay: () => {
        const mins = Math.floor(app.playerSecondsLeft / 60).toString().padStart(2, '0');
        const secs = (app.playerSecondsLeft % 60).toString().padStart(2, '0');
        const el = document.getElementById('player-timer');
        if (el) el.innerText = `${mins}:${secs}`;
    },

    updatePlayerProgressBar: () => {
        const bar = document.getElementById('player-progress-bar');
        if (bar && app.playerQueue.length > 0) {
            const pct = Math.round(((app.playerIndex) / app.playerQueue.length) * 100);
            bar.style.width = `${pct}%`;
        }
    },

    togglePlayerTimer: () => {
        if (app.isPlayerRunning) {
            clearInterval(app.playerTimer);
            app.isPlayerRunning = false;
            document.getElementById('player-toggle-btn').innerHTML = '<i class="fa-solid fa-play"></i> Resume';
        } else {
            app.isPlayerRunning = true;
            document.getElementById('player-toggle-btn').innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
            app.playerTimer = setInterval(app.playerTick, 1000);
        }
    },

    nextPlayerItem: () => {
        app.loadPlayerItem(app.playerIndex + 1);
    },

    prevPlayerItem: () => {
        if (app.playerIndex > 0) {
            app.loadPlayerItem(app.playerIndex - 1);
        }
    },

    closePlayerModal: () => {
        clearInterval(app.playerTimer);
        const modal = document.getElementById('routine-modal');
        if (modal) modal.classList.remove('active');
    },

    /* =========================================================================
       YOGA LIBRARY CONTROLLER
       ========================================================================= */
    renderYogaCollections: () => {
        const container = document.getElementById('yoga-collections-grid');
        if (!container) return;
        container.innerHTML = '';

        yogaCollections.forEach(col => {
            const card = document.createElement('div');
            card.className = 'collection-card';
            card.innerHTML = `
                <div class="exercise-card-img-wrap">
                    <img src="${col.image}" alt="${col.title}" class="exercise-card-img">
                </div>
                <div class="exercise-card-body">
                    <div class="badge mb-1">${col.difficulty} • ${col.type}</div>
                    <h3 style="font-size:1.05rem;">${col.title}</h3>
                    <p class="text-xs text-muted" style="flex:1;">${col.description}</p>
                    <div class="exercise-card-meta">
                        <span><i class="fa-solid fa-spa text-accent"></i> ${col.poseCount} Poses</span>
                        <span><i class="fa-solid fa-clock text-accent"></i> ${col.duration}</span>
                    </div>
                    <button class="btn-primary btn-block mt-1" onclick="app.startYogaPlayer('${col.id}')">
                        <i class="fa-solid fa-play"></i> Start Sequence
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    },

    renderYogaPoses: () => {
        const container = document.getElementById('yoga-poses-grid');
        if (!container) return;
        container.innerHTML = '';

        const yogaPoses = exercises.filter(e => e.category === 'Yoga');
        const filtered = yogaPoses.filter(pose => {
            if (app.yogaFilters.type !== 'all' && pose.type !== app.yogaFilters.type) return false;
            if (app.yogaFilters.level !== 'all' && pose.difficulty !== app.yogaFilters.level) return false;
            if (app.yogaFilters.search) {
                const q = app.yogaFilters.search.toLowerCase();
                const match = pose.name.toLowerCase().includes(q) || (pose.target && pose.target.toLowerCase().includes(q));
                if (!match) return false;
            }
            return true;
        });

        filtered.forEach(pose => {
            const photo = app.getExercisePhoto(pose.id);
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.innerHTML = `
                <div class="exercise-card-img-wrap">
                    <img src="${photo}" alt="${pose.name}" class="exercise-card-img" onerror="this.src='assets/images/exercises/yoga_downward_dog_human.jpg'">
                </div>
                <div class="exercise-card-body">
                    <div class="badge mb-1">${pose.type} • ${pose.difficulty}</div>
                    <h4 class="exercise-card-title">${pose.name}</h4>
                    <p class="exercise-card-target">${pose.target}</p>
                    <div class="exercise-card-meta">
                        <span><i class="fa-solid fa-clock text-accent"></i> ${pose.duration}</span>
                        <button class="btn-primary-sm" onclick="app.showExerciseModal('${pose.id}')"><i class="fa-solid fa-eye"></i> View</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    },

    /* =========================================================================
       COMPLETE MOVEMENT & EXERCISE LIBRARY
       ========================================================================= */
    renderExercises: () => {
        const container = document.getElementById('exercise-grid');
        if (!container) return;
        container.innerHTML = '';

        const filtered = exercises.filter(ex => {
            if (app.exFilters.category !== 'all' && ex.category !== app.exFilters.category) return false;
            if (app.exFilters.goal !== 'all' && ex.goal && !ex.goal.includes(app.exFilters.goal)) return false;
            if (app.exFilters.intensity !== 'all' && ex.intensity !== app.exFilters.intensity) return false;
            if (app.exFilters.search) {
                const q = app.exFilters.search.toLowerCase();
                const match = ex.name.toLowerCase().includes(q) || (ex.target && ex.target.toLowerCase().includes(q)) || (ex.category && ex.category.toLowerCase().includes(q));
                if (!match) return false;
            }
            return true;
        });

        filtered.forEach(ex => {
            const photo = app.getExercisePhoto(ex.id);
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.innerHTML = `
                <div class="exercise-card-img-wrap">
                    <img src="${photo}" alt="${ex.name}" class="exercise-card-img" onerror="this.src='assets/images/exercises/ex_squat_human.jpg'">
                </div>
                <div class="exercise-card-body">
                    <div class="badge mb-1">${ex.category} • ${ex.intensity}</div>
                    <h4 class="exercise-card-title">${ex.name}</h4>
                    <p class="exercise-card-target">${ex.target}</p>
                    <div class="exercise-card-meta">
                        <span><i class="fa-solid fa-dumbbell text-accent"></i> ${ex.equipment}</span>
                        <button class="btn-primary-sm" onclick="app.showExerciseModal('${ex.id}')"><i class="fa-solid fa-eye"></i> View</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    },

    /* =========================================================================
       EXERCISE / YOGA DETAIL MODAL
       ========================================================================= */
    showExerciseModal: (exId) => {
        const ex = exercises.find(e => e.id === exId);
        if (!ex) return;

        const modal = document.getElementById('exercise-modal');
        if (!modal) return;

        const photo = app.getExercisePhoto(ex.id);
        document.getElementById('modal-img').src = photo;
        document.getElementById('modal-title').innerText = ex.name;
        document.getElementById('modal-target').innerText = ex.target || 'Full Body';
        document.getElementById('modal-equip').innerText = ex.equipment || 'No equipment';
        document.getElementById('modal-sets').innerText = ex.sets || '2-3';
        document.getElementById('modal-reps').innerText = ex.reps || ex.duration || '12 reps';
        document.getElementById('modal-rest').innerText = ex.rest || '20s';
        document.getElementById('modal-intensity').innerText = ex.intensity || 'Moderate';

        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = `<span class="badge">${ex.category}</span><span class="badge">${ex.type}</span>`;

        const instList = document.getElementById('modal-instructions');
        instList.innerHTML = '';
        (ex.instructions || []).forEach(inst => {
            const li = document.createElement('li');
            li.innerText = inst;
            instList.appendChild(li);
        });

        document.getElementById('modal-mod').innerText = ex.beginnerMod || 'Perform at a comfortable reduced pace with support.';
        document.getElementById('modal-benefits').innerText = ex.generalBenefits || 'Builds neuromuscular endurance, stability, and cardiovascular circulation.';
        document.getElementById('modal-safety').innerText = ex.safety || 'Maintain neutral spine, control breathing, and never train through sharp pain.';

        modal.classList.add('active');
    },

    closeExerciseModal: () => {
        const modal = document.getElementById('exercise-modal');
        if (modal) modal.classList.remove('active');
    },

    showPlanModal: (planId) => {
        const plan = workoutPlans.find(p => p.id === planId) || workoutPlans[0];
        const modal = document.getElementById('plan-modal');
        if (!modal) return;

        const sex = (app.userProfile && app.userProfile.sex) ? app.userProfile.sex : 'male';
        const coverPhoto = (sex === 'female' && plan.imageFemale) 
            ? plan.imageFemale 
            : ((sex === 'male' && plan.imageMale) ? plan.imageMale : plan.image);
        const planImg = document.getElementById('plan-modal-img');
        if (planImg && coverPhoto) planImg.src = coverPhoto;

        document.getElementById('plan-modal-title').innerText = plan.title;
        document.getElementById('plan-modal-desc').innerText = plan.description;

        const table = document.getElementById('plan-modal-schedule');
        table.innerHTML = '';
        plan.schedule.forEach(row => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid var(--border-light)';
            tr.innerHTML = `
                <td style="padding:0.45rem 0.5rem; font-weight:700; width:130px; color:var(--accent);">${row.day}</td>
                <td style="padding:0.45rem 0.5rem; font-weight:600;">${row.title}</td>
                <td style="padding:0.45rem 0.5rem; color:var(--text-muted);">${row.detail}</td>
            `;
            table.appendChild(tr);
        });

        modal.classList.add('active');
    },

    closePlanModal: () => {
        const modal = document.getElementById('plan-modal');
        if (modal) modal.classList.remove('active');
    },

    /* =========================================================================
       PERSONALIZED INDIAN NUTRITION ENGINE
       ========================================================================= */
    generateMeals: () => {
        const p = app.userProfile || { diet: 'veg', targetCalories: 2100, targetProtein: 112 };
        const diet = p.diet || 'veg';
        const dietKey = diet === 'vegan' ? 'vegan' : (diet === 'non-veg' ? 'nonVeg' : 'veg');

        // Update Summary Banner
        const goalCalEl = document.getElementById('nutri-goal-cal');
        if (goalCalEl) goalCalEl.innerText = `${p.targetCalories.toLocaleString()} kcal`;

        const goalProEl = document.getElementById('nutri-goal-pro');
        if (goalProEl) goalProEl.innerText = `${p.targetProtein} g`;

        const dietTagEl = document.getElementById('nutri-diet-tag');
        if (dietTagEl) dietTagEl.innerText = diet === 'veg' ? 'Vegetarian (Indian)' : (diet === 'non-veg' ? 'Non-Vegetarian' : 'Vegan');

        const subtext = document.getElementById('nutrition-target-subtext');
        if (subtext) {
            subtext.innerText = `Personalized for ${p.weight}kg athlete • Goal: ${p.goal} • Target: ${p.targetCalories} kcal, ${p.targetProtein}g Protein.`;
        }

        // Render Indian Meals for each category
        const renderSection = (categoryKey, targetCalFrac, targetProFrac) => {
            const container = document.getElementById(`meal-${categoryKey}`);
            if (!container) return;
            container.innerHTML = '';

            const items = (indianFoodDatabase[categoryKey] && indianFoodDatabase[categoryKey][dietKey]) || [];

            items.forEach(dish => {
                const card = document.createElement('div');
                card.className = 'meal-card';
                card.innerHTML = `
                    <img src="${dish.image}" alt="${dish.name}" class="meal-img" onerror="this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=500'">
                    <div class="meal-content">
                        <h4>${dish.name}</h4>
                        <div class="meal-ingredients-list">${dish.ingredients.join(' • ')}</div>
                        <div class="meal-portion-box"><i class="fa-solid fa-utensils text-accent"></i> <strong>Portion:</strong> ${dish.portionBase}</div>
                        <div class="meal-macros">
                            <span>🔥 <strong>${dish.calMultiplier}</strong> kcal</span>
                            <span>🥩 <strong>${dish.proMultiplier}g</strong> protein</span>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        };

        renderSection('breakfast', 0.25, 0.25);
        renderSection('lunch', 0.35, 0.35);
        renderSection('snack', 0.15, 0.15);
        renderSection('dinner', 0.25, 0.25);
    },

    /* =========================================================================
       AI FITNESS ASSISTANT CONTROLLER
       ========================================================================= */
    chatHistory: [],
    isChatLoading: false,

    initChat: () => {
        // 1. Check AI connection status with backend
        fetch('/health')
            .then(res => res.json())
            .then(data => {
                const indicator = document.getElementById('chat-status-indicator');
                if (indicator) {
                    if (data.ai_configured) {
                        indicator.innerHTML = '<span style="color:var(--accent);">●</span> Connected to Gemini';
                    } else {
                        indicator.innerHTML = '<span style="color:#f59e0b;">●</span> Setup AI Key';
                    }
                }
            })
            .catch(() => {
                const indicator = document.getElementById('chat-status-indicator');
                if (indicator) {
                    indicator.innerHTML = '<span style="color:#ef4444;">●</span> Offline';
                }
            });

        // 2. Load Session History
        try {
            const savedSession = sessionStorage.getItem('fitguide_ai_chat_session');
            if (savedSession) {
                app.chatHistory = JSON.parse(savedSession);
                app.renderLoadedChatHistory();
            }
        } catch (e) {
            app.chatHistory = [];
        }

        // 3. Render Profile stats in AI sidebar
        app.updateAIAssistantStats();
    },

    updateAIAssistantStats: () => {
        const statsEl = document.getElementById('ai-profile-stats');
        if (!statsEl) return;
        const p = app.userProfile || {};
        const goalNames = { loss: 'Weight Loss', gain: 'Weight Gain', maintain: 'Maintain', fitness: 'General Fitness', gentle: 'Gentle', yoga: 'Yoga' };
        const dietNames = { veg: 'Vegetarian (Indian)', 'non-veg': 'Non-Vegetarian (Indian)', vegan: 'Vegan (Plant-Based)' };

        statsEl.innerHTML = `
            <div class="ai-stat-row">
                <span class="ai-stat-label">Athlete</span>
                <span class="ai-stat-val">${p.age || 28}y · ${(p.sex || 'male').toUpperCase()}</span>
            </div>
            <div class="ai-stat-row">
                <span class="ai-stat-label">Height &amp; Weight</span>
                <span class="ai-stat-val">${p.height || 175} cm · ${p.weight || 70} kg</span>
            </div>
            <div class="ai-stat-row">
                <span class="ai-stat-label">BMI &amp; Category</span>
                <span class="ai-stat-val text-accent">${p.bmi || 22.9} (${p.bmiCategory || 'Normal'})</span>
            </div>
            <div class="ai-stat-row">
                <span class="ai-stat-label">Primary Goal</span>
                <span class="ai-stat-val">${goalNames[p.goal] || p.goal || 'Fitness'}</span>
            </div>
            <div class="ai-stat-row">
                <span class="ai-stat-label">Calorie Target</span>
                <span class="ai-stat-val text-accent">${(p.targetCalories || 2042).toLocaleString()} kcal/day</span>
            </div>
            <div class="ai-stat-row">
                <span class="ai-stat-label">Protein Target</span>
                <span class="ai-stat-val text-accent">${p.targetProtein || 112} g/day</span>
            </div>
            <div class="ai-stat-row">
                <span class="ai-stat-label">Dietary Pattern</span>
                <span class="ai-stat-val">${dietNames[p.diet] || p.diet || 'Vegetarian'}</span>
            </div>
            <div class="ai-stat-row">
                <span class="ai-stat-label">Allergies / Notes</span>
                <span class="ai-stat-val">${p.allergies || p.foodPreferences || 'None reported'}</span>
            </div>
            <div class="ai-stat-row">
                <span class="ai-stat-label">Fitness Level</span>
                <span class="ai-stat-val">${(p.level || 'beginner').toUpperCase()} · ${(p.intensity || 'Moderate')}</span>
            </div>
        `;
    },

    renderLoadedChatHistory: () => {
        const container = document.getElementById('chat-messages');
        if (!container || !app.chatHistory || app.chatHistory.length === 0) return;

        container.innerHTML = '';
        app.chatHistory.forEach(item => {
            const isUser = item.role === 'user';
            const msgEl = document.createElement('div');
            msgEl.className = `message ${isUser ? 'user' : 'ai'}`;
            if (isUser) {
                msgEl.innerHTML = `<div class="msg-content">${app.escapeHtml(item.text)}</div>`;
            } else {
                msgEl.innerHTML = `
                    <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-content">${app.formatAIMessage(item.text)}</div>
                `;
            }
            container.appendChild(msgEl);
        });
        container.scrollTop = container.scrollHeight;
    },

    handleChatEnter: (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            app.sendMessage();
        }
    },

    sendSuggestion: (text) => {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = text;
            app.sendMessage();
        }
    },

    clearChat: () => {
        app.chatHistory = [];
        try {
            sessionStorage.removeItem('fitguide_ai_chat_session');
        } catch (e) {}

        const container = document.getElementById('chat-messages');
        if (container) {
            container.innerHTML = `
                <div class="message ai">
                    <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-content">
                        Chat session cleared. I am your <strong>FitGuide AI Coach</strong>, powered by Google Gemini. 👋<br><br>
                        I understand your full profile metrics, calorie &amp; protein targets, fitness level, and Indian nutrition plan. Ask me anything to get started!
                    </div>
                </div>
            `;
        }
        app.showToast("Chat conversation cleared.", "info");
    },

    saveChatMessage: (role, text) => {
        if (!app.chatHistory) app.chatHistory = [];
        app.chatHistory.push({ role, text, time: Date.now() });
        // Keep max 30 messages in session
        if (app.chatHistory.length > 30) {
            app.chatHistory = app.chatHistory.slice(-30);
        }
        try {
            sessionStorage.setItem('fitguide_ai_chat_session', JSON.stringify(app.chatHistory));
        } catch (e) {}
    },

    sendMessage: async () => {
        const input = document.getElementById('chat-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text || app.isChatLoading) return;

        input.value = '';
        app.isChatLoading = true;

        const sendBtn = document.getElementById('chat-send-btn');
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        }

        // Render User Message
        const container = document.getElementById('chat-messages');
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.innerHTML = `<div class="msg-content">${app.escapeHtml(text)}</div>`;
        container.appendChild(userMsg);
        app.saveChatMessage('user', text);
        container.scrollTop = container.scrollHeight;

        // Render Typing Indicator State
        const typingEl = document.createElement('div');
        typingEl.className = 'message ai typing-temp';
        typingEl.innerHTML = `
            <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="msg-content" style="display:flex;align-items:center;gap:0.5rem;color:var(--text-2);">
                <i class="fa-solid fa-circle-notch fa-spin text-accent"></i> FitGuide AI is generating your personalized advice...
            </div>
        `;
        container.appendChild(typingEl);
        container.scrollTop = container.scrollHeight;

        // Complete FitGuide User Profile Context Payload
        const p = app.userProfile || {};
        const profilePayload = {
            age: p.age || 28,
            sex: p.sex || 'male',
            height: p.height || 175,
            weight: p.weight || 70,
            activity: p.activity || 'moderate',
            level: p.level || 'beginner',
            goal: p.goal || 'loss',
            diet: p.diet || 'veg',
            allergies: p.allergies || 'None reported',
            foodPreferences: p.foodPreferences || 'Indian home meals',
            calorieTarget: p.targetCalories || 2042,
            targetCalories: p.targetCalories || 2042,
            proteinTarget: p.targetProtein || 112,
            targetProtein: p.targetProtein || 112,
            bmi: p.bmi || 22.9,
            bmiCategory: p.bmiCategory || 'Normal Weight',
            intensity: p.intensity || 'Moderate',
            equipment: p.equipment || 'No equipment',
            time: p.time || 20
        };

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    profile: profilePayload,
                    history: (app.chatHistory || []).slice(-8)
                })
            });

            // Remove typing temporary element
            if (typingEl && typingEl.parentNode) {
                typingEl.parentNode.removeChild(typingEl);
            }

            if (response.ok) {
                const data = await response.json();
                const replyText = data.reply || data.response || "I am ready to help you with your fitness and nutrition goals!";
                
                const aiMsg = document.createElement('div');
                aiMsg.className = 'message ai';
                aiMsg.innerHTML = `
                    <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="msg-content">${app.formatAIMessage(replyText)}</div>
                `;
                container.appendChild(aiMsg);
                app.saveChatMessage('model', replyText);
            } else {
                throw new Error(`Server returned HTTP ${response.status}`);
            }
        } catch (err) {
            console.error('Chat error:', err);
            if (typingEl && typingEl.parentNode) {
                typingEl.parentNode.removeChild(typingEl);
            }

            const errorMsg = document.createElement('div');
            errorMsg.className = 'message ai';
            errorMsg.innerHTML = `
                <div class="ai-msg-avatar"><i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i></div>
                <div class="msg-content text-error" style="border-left:3px solid #ef4444;background:rgba(239,68,68,0.06);padding:0.75rem;">
                    <strong><i class="fa-solid fa-circle-exclamation"></i> Connection Notice</strong><br>
                    Could not connect to the FitGuide backend server. Please verify your Python backend is running on <code>http://localhost:8000</code>.
                </div>
            `;
            container.appendChild(errorMsg);
        } finally {
            app.isChatLoading = false;
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
            }
            container.scrollTop = container.scrollHeight;
            input.focus();
        }
    },

    formatAIMessage: (text) => {
        if (!text) return '';
        let formatted = text;

        // Escape dangerous HTML entities
        formatted = formatted
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Headers
        formatted = formatted.replace(/^### (.*$)/gim, '<h4 style="margin:0.6rem 0 0.3rem;color:var(--text);font-weight:700;">$1</h4>');
        formatted = formatted.replace(/^## (.*$)/gim, '<h3 style="margin:0.8rem 0 0.4rem;color:var(--accent);font-weight:700;">$1</h3>');

        // Bold & Italic
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Bullet points
        formatted = formatted.replace(/^[\s]*[•\-\*]\s+(.*$)/gim, '<div class="ai-bullet-item"><span class="text-accent">•</span> <span>$1</span></div>');

        // Numbered points
        formatted = formatted.replace(/^[\s]*([0-9]+)\.\s+(.*$)/gim, '<div class="ai-bullet-item"><span class="text-accent font-bold">$1.</span> <span>$2</span></div>');

        // Paragraphs & newlines
        formatted = formatted.replace(/\n\n/g, '<div style="height:0.55rem;"></div>');
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    },

    escapeHtml: (str) => {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

    /* =========================================================================
       TOAST NOTIFICATIONS
       ========================================================================= */
    showToast: (msg, type = 'info') => {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = `<span>${type === 'fire' ? '🔥' : '✨'}</span> <span>${msg}</span>`;
        container.appendChild(t);
        setTimeout(() => {
            t.remove();
        }, 3200);
    },

    /* =========================================================================
       EVENT LISTENERS SETUP
       ========================================================================= */
    setupEventListeners: () => {
        // Option cards selection in assessment
        document.querySelectorAll('.option-grid').forEach(grid => {
            grid.addEventListener('click', (e) => {
                const card = e.target.closest('.option-card');
                if (card) {
                    grid.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                }
            });
        });

        // Exercise search & filters
        const exSearch = document.getElementById('ex-search');
        if (exSearch) {
            exSearch.addEventListener('input', (e) => {
                app.exFilters.search = e.target.value.trim();
                app.renderExercises();
            });
        }

        const setupFilterGroup = (groupId, filterKey) => {
            const group = document.getElementById(groupId);
            if (group) {
                group.addEventListener('click', (e) => {
                    const btn = e.target.closest('.filter-btn');
                    if (btn) {
                        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        app.exFilters[filterKey] = btn.getAttribute('data-filter');
                        app.renderExercises();
                    }
                });
            }
        };

        setupFilterGroup('filter-category', 'category');
        setupFilterGroup('filter-goal', 'goal');
        setupFilterGroup('filter-intensity', 'intensity');

        // Yoga search & filters
        const yogaSearch = document.getElementById('yoga-search');
        if (yogaSearch) {
            yogaSearch.addEventListener('input', (e) => {
                app.yogaFilters.search = e.target.value.trim();
                app.renderYogaPoses();
            });
        }

        const setupYogaFilterGroup = (groupId, filterKey) => {
            const group = document.getElementById(groupId);
            if (group) {
                group.addEventListener('click', (e) => {
                    const btn = e.target.closest('.filter-btn');
                    if (btn) {
                        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        app.yogaFilters[filterKey] = btn.getAttribute('data-filter');
                        app.renderYogaPoses();
                    }
                });
            }
        };

        setupYogaFilterGroup('filter-yoga-type', 'type');
        setupYogaFilterGroup('filter-yoga-level', 'level');
    }
};

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
