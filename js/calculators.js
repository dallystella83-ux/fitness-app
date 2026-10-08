const Calculators = {
    /**
     * Calculate BMI
     * @param {number} weight - Weight in kg
     * @param {number} height - Height in cm
     * @returns {Object} { bmi: number, category: string, colorClass: string, percentage: number }
     */
    calculateBMI: (weight, height) => {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        let category = '';
        let colorClass = '';
        let percentage = 0; // For progress bar visualization (approximate scale)

        if (bmi < 18.5) {
            category = 'Underweight';
            colorClass = 'var(--bmi-under)';
            percentage = Math.min((bmi / 40) * 100, 25);
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal Weight';
            colorClass = 'var(--bmi-normal)';
            percentage = 40;
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            colorClass = 'var(--bmi-over)';
            percentage = 65;
        } else {
            category = 'Obesity';
            colorClass = 'var(--bmi-obese)';
            percentage = Math.min((bmi / 40) * 100, 95);
        }

        return {
            bmi: parseFloat(bmi.toFixed(1)),
            category,
            colorClass,
            percentage
        };
    },

    /**
     * Calculate BMR using Mifflin-St Jeor Equation
     */
    calculateBMR: (weight, height, age, sex) => {
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        if (sex === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }
        return bmr;
    },

    /**
     * Calculate Total Daily Energy Expenditure (TDEE)
     */
    calculateTDEE: (bmr, activityLevel) => {
        const multipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'active': 1.725,
            'extreme': 1.9
        };
        return bmr * (multipliers[activityLevel] || 1.2);
    },

    /**
     * Calculate Target Calories based on Goal
     */
    calculateTargetCalories: (tdee, goal) => {
        if (goal === 'loss') return tdee - 500; // 500 cal deficit
        if (goal === 'gain') return tdee + 300; // 300 cal surplus
        return tdee; // maintain or fitness
    },

    /**
     * Calculate Protein target range in grams
     */
    calculateProteinRange: (weight, goal, activityLevel) => {
        let minMultiplier = 1.2;
        let maxMultiplier = 1.6;

        if (goal === 'gain' || activityLevel === 'active' || activityLevel === 'extreme') {
            minMultiplier = 1.6;
            maxMultiplier = 2.2;
        } else if (goal === 'loss') {
            // Higher protein during weight loss to preserve muscle
            minMultiplier = 1.8;
            maxMultiplier = 2.4;
        }

        return {
            min: Math.round(weight * minMultiplier),
            max: Math.round(weight * maxMultiplier)
        };
    }
};
