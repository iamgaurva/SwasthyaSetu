// BMI Chart functionality will be added here

// BMI Chart Button and Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // BMI Modal Elements
    const bmiModal = document.getElementById('bmi-modal');
    const bmiChartBtn = document.getElementById('bmi-chart-btn');
    
    // Diet Plan Modal Elements
    const dietModal = document.getElementById('diet-modal');
    const dietPlanBtn = document.getElementById('diet-plan-btn');
    const dietTabBtns = document.querySelectorAll('.diet-tab-btn');
    const dietTabContents = document.querySelectorAll('.diet-tab-content');
    
    // Toggle switches for vegetarian options
    const gainVegToggle = document.getElementById('gain-veg-toggle');
    const maintainVegToggle = document.getElementById('maintain-veg-toggle');
    const lossVegToggle = document.getElementById('loss-veg-toggle');
    
    // Load more buttons
    const loadMoreBtns = document.querySelectorAll('.load-more-btn');
    
    // General modal elements
    const closeBtns = document.querySelectorAll('.close');
    
    // Open BMI modal when the button is clicked
    if (bmiChartBtn) {
        bmiChartBtn.addEventListener('click', function() {
            bmiModal.style.display = 'block';
        });
    }
    
    // Open Diet Plan modal when the button is clicked
    if (dietPlanBtn) {
        dietPlanBtn.addEventListener('click', function() {
            dietModal.style.display = 'block';
        });
    }
    
    // Close modals when X is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = btn.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === bmiModal) {
            bmiModal.style.display = 'none';
        }
        if (event.target === dietModal) {
            dietModal.style.display = 'none';
        }
    });
    
    // Diet Plan Tab Switching
    dietTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            dietTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the tab to show
            const tabToShow = this.getAttribute('data-diet-tab');
            
            // Hide all tab contents
            dietTabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            document.getElementById(tabToShow + '-tab').classList.add('active');
        });
    });
    
    // Vegetarian Toggle Functionality
    if (gainVegToggle) {
        gainVegToggle.addEventListener('change', function() {
            toggleVegetarianPlan('gain', this.checked);
        });
    }
    
    if (maintainVegToggle) {
        maintainVegToggle.addEventListener('change', function() {
            toggleVegetarianPlan('maintain', this.checked);
        });
    }
    
    if (lossVegToggle) {
        lossVegToggle.addEventListener('change', function() {
            toggleVegetarianPlan('loss', this.checked);
        });
    }
    
    function toggleVegetarianPlan(planType, isVegetarian) {
        const nonVegElements = document.querySelectorAll(`#${planType}-tab .non-vegetarian`);
        const vegElements = document.querySelectorAll(`#${planType}-tab .vegetarian`);
        
        if (isVegetarian) {
            nonVegElements.forEach(el => el.classList.add('hidden'));
            vegElements.forEach(el => el.classList.remove('hidden'));
        } else {
            nonVegElements.forEach(el => el.classList.remove('hidden'));
            vegElements.forEach(el => el.classList.add('hidden'));
        }
    }
    
    // Load More Days Functionality
    loadMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const planType = this.getAttribute('data-plan');
            loadMoreMealDays(planType);
        });
    });
    
    // Load additional meal days (day 2, 3, 4)
    function loadMoreMealDays(planType) {
        const mealDaysContainer = document.querySelector(`#${planType}-tab .meal-days`);
        const loadMoreBtn = document.querySelector(`#${planType}-tab .load-more-btn`);
        const isVegetarian = document.getElementById(`${planType}-veg-toggle`).checked;
        
        // Check if days 2-4 are already loaded
        if (document.getElementById(`${planType}-day2-non-veg`)) {
            loadMoreBtn.textContent = 'All days loaded';
            loadMoreBtn.disabled = true;
            return;
        }
        
        // Create days 2-4
        for (let day = 2; day <= 4; day++) {
            const dayElement = createMealDay(planType, day, isVegetarian);
            mealDaysContainer.appendChild(dayElement);
        }
        
        // Update button state
        loadMoreBtn.textContent = 'All days loaded';
        loadMoreBtn.disabled = true;
    }
    
    // Create a meal day element (simplified for example)
    function createMealDay(planType, dayNum, isVegetarian) {
        const mealDay = document.createElement('div');
        mealDay.className = 'meal-day';
        
        const dayTitle = document.createElement('h4');
        dayTitle.textContent = `Day ${dayNum}`;
        mealDay.appendChild(dayTitle);
        
        // Non-vegetarian meal plan
        const nonVegPlan = document.createElement('div');
        nonVegPlan.className = `meal-plan non-vegetarian ${isVegetarian ? 'hidden' : ''}`;
        nonVegPlan.id = `${planType}-day${dayNum}-non-veg`;
        
        // Vegetarian meal plan
        const vegPlan = document.createElement('div');
        vegPlan.className = `meal-plan vegetarian ${isVegetarian ? '' : 'hidden'}`;
        vegPlan.id = `${planType}-day${dayNum}-veg`;
        
        // Add sample meal content based on plan type and day
        nonVegPlan.innerHTML = getMealPlanContent(planType, dayNum, false);
        vegPlan.innerHTML = getMealPlanContent(planType, dayNum, true);
        
        mealDay.appendChild(nonVegPlan);
        mealDay.appendChild(vegPlan);
        
        return mealDay;
    }
    
    // Get meal plan content based on plan type, day, and vegetarian preference
    function getMealPlanContent(planType, dayNum, isVegetarian) {
        // This function would ideally contain all meal plans for different days
        // For simplicity, we'll return a template with some variations
        
        const mealTypes = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
        let content = '';
        
        mealTypes.forEach(mealType => {
            content += `
                <div class="meal">
                    <h5>${mealType}</h5>
                    <ul>
                        ${getMealItems(planType, dayNum, mealType, isVegetarian).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        return content;
    }
    
    // Get meal items based on plan type, day, meal type, and vegetarian preference
    function getMealItems(planType, dayNum, mealType, isVegetarian) {
        // This would ideally be a database of meal plans
        // For simplicity, we'll return some example meals
        
        const mealPlans = {
            gain: {
                vegetarian: {
                    2: {
                        Breakfast: ['Protein smoothie with banana, peanut butter, oats', 'Whole grain toast with avocado', 'Plant-based yogurt with nuts and seeds'],
                        Lunch: ['Quinoa bowl with chickpeas and vegetables', 'Hummus with whole grain pita', 'Mixed fruit salad'],
                        Snack: ['Protein bar', 'Mixed nuts (50g)', 'Soy milk'],
                        Dinner: ['Bean and vegetable curry', 'Brown rice (1 cup)', 'Side salad with olive oil dressing', 'Coconut yogurt dessert']
                    },
                    3: {
                        Breakfast: ['Tofu scramble with vegetables', 'Whole grain bagel with nut butter', 'Fresh orange juice'],
                        Lunch: ['Lentil soup', 'Vegetable stir-fry with tempeh', 'Quinoa (1 cup)'],
                        Snack: ['Trail mix with dried fruits', 'Protein shake', 'Banana'],
                        Dinner: ['Vegan pasta with plant-based protein', 'Garlic bread', 'Steamed vegetables', 'Fruit sorbet']
                    },
                    4: {
                        Breakfast: ['Overnight oats with nuts and fruits', 'Plant-based protein shake', 'Whole grain toast with avocado'],
                        Lunch: ['Falafel wrap with tahini', 'Sweet potato fries', 'Greek salad (no feta)'],
                        Snack: ['Energy balls (3-4)', 'Fruit smoothie', 'Mixed nuts'],
                        Dinner: ['Stuffed bell peppers with quinoa and beans', 'Side salad', 'Coconut rice pudding']
                    }
                },
                nonVegetarian: {
                    2: {
                        Breakfast: ['4 egg omelette with cheese and vegetables', 'Whole grain toast with butter', 'Greek yogurt with honey'],
                        Lunch: ['Tuna sandwich on whole grain bread', 'Side salad with olive oil', 'Whole milk'],
                        Snack: ['Protein shake', 'Banana with peanut butter', 'Trail mix'],
                        Dinner: ['Beef stir-fry with vegetables', 'Brown rice (1 cup)', 'Avocado salad']
                    },
                    3: {
                        Breakfast: ['Protein pancakes with maple syrup', 'Bacon (3 slices)', 'Whole milk'],
                        Lunch: ['Chicken wrap with avocado', 'Sweet potato fries', 'Fruit smoothie'],
                        Snack: ['Hard-boiled eggs (2)', 'Cheese stick', 'Apple with peanut butter'],
                        Dinner: ['Steak (200g)', 'Baked potato with sour cream', 'Steamed vegetables']
                    },
                    4: {
                        Breakfast: ['French toast with maple syrup', 'Scrambled eggs with cheese', 'Orange juice'],
                        Lunch: ['Turkey and cheese sandwich', 'Potato salad', 'Greek yogurt'],
                        Snack: ['Protein bar', 'Mixed nuts', 'Chocolate milk'],
                        Dinner: ['Grilled salmon', 'Quinoa pilaf', 'Roasted vegetables', 'Ice cream']
                    }
                }
            },
            maintain: {
                vegetarian: {
                    2: {
                        Breakfast: ['Overnight oats with berries', 'Plant-based yogurt', 'Green tea'],
                        Lunch: ['Mediterranean salad with chickpeas', 'Whole grain pita', 'Hummus'],
                        Snack: ['Apple with almond butter', 'Handful of nuts'],
                        Dinner: ['Vegetable stir-fry with tofu', 'Brown rice (1/2 cup)', 'Steamed broccoli']
                    },
                    3: {
                        Breakfast: ['Smoothie with plant-based protein', 'Whole grain toast with avocado', 'Green tea'],
                        Lunch: ['Lentil soup', 'Mixed green salad', 'Whole grain crackers'],
                        Snack: ['Carrot sticks with hummus', 'Small handful of almonds'],
                        Dinner: ['Bean and vegetable chili', 'Small side salad', 'Baked sweet potato']
                    },
                    4: {
                        Breakfast: ['Tofu scramble with vegetables', 'Whole grain toast', 'Fresh fruit'],
                        Lunch: ['Quinoa bowl with roasted vegetables', 'Tahini dressing', 'Orange'],
                        Snack: ['Greek yogurt with berries', 'Herbal tea'],
                        Dinner: ['Vegetable curry', 'Brown rice (1/2 cup)', 'Steamed vegetables']
                    }
                },
                nonVegetarian: {
                    2: {
                        Breakfast: ['Greek yogurt with berries and honey', 'Whole grain toast', 'Green tea'],
                        Lunch: ['Tuna salad with mixed greens', 'Whole grain crackers', 'Apple'],
                        Snack: ['Protein shake', 'Small handful of almonds'],
                        Dinner: ['Grilled chicken (120g)', 'Quinoa (1/2 cup)', 'Roasted vegetables']
                    },
                    3: {
                        Breakfast: ['Omelette with vegetables', 'Whole grain toast', 'Fresh fruit'],
                        Lunch: ['Turkey and avocado wrap', 'Side salad', 'Orange'],
                        Snack: ['Greek yogurt', 'Small handful of walnuts'],
                        Dinner: ['Baked salmon (120g)', 'Sweet potato (small)', 'Steamed broccoli']
                    },
                    4: {
                        Breakfast: ['Scrambled eggs with spinach', 'Whole grain toast', 'Green tea'],
                        Lunch: ['Chicken salad with mixed greens', 'Whole grain roll', 'Apple'],
                        Snack: ['Protein bar', 'Pear'],
                        Dinner: ['Lean beef stir-fry', 'Brown rice (1/2 cup)', 'Mixed vegetables']
                    }
                }
            },
            loss: {
                vegetarian: {
                    2: {
                        Breakfast: ['Smoothie with plant protein and spinach', 'Green tea'],
                        Lunch: ['Large salad with chickpeas', 'Balsamic vinegar dressing', 'Apple'],
                        Snack: ['Celery sticks with 1 tbsp almond butter'],
                        Dinner: ['Vegetable soup', 'Small side salad', 'Herbal tea']
                    },
                    3: {
                        Breakfast: ['Tofu scramble with vegetables', '1/2 grapefruit', 'Green tea'],
                        Lunch: ['Lentil soup', 'Side salad with lemon juice', 'Tangerine'],
                        Snack: ['Plant-based protein shake with water', 'Cucumber slices'],
                        Dinner: ['Zucchini noodles with tomato sauce', 'Herbal tea']
                    },
                    4: {
                        Breakfast: ['1/2 cup oatmeal with berries', 'Green tea'],
                        Lunch: ['Buddha bowl with quinoa and vegetables', 'Lemon tahini dressing', 'Orange'],
                        Snack: ['Rice cake with 1 tbsp hummus'],
                        Dinner: ['Cauliflower rice stir-fry with tofu', 'Steamed vegetables', 'Herbal tea']
                    }
                },
                nonVegetarian: {
                    2: {
                        Breakfast: ['Protein smoothie with spinach', 'Green tea'],
                        Lunch: ['Grilled chicken salad', 'Lemon juice dressing', 'Apple'],
                        Snack: ['Celery sticks with 1 tbsp peanut butter'],
                        Dinner: ['Baked cod (100g)', 'Steamed asparagus', 'Herbal tea']
                    },
                    3: {
                        Breakfast: ['Egg white omelette with vegetables', '1/2 grapefruit', 'Green tea'],
                        Lunch: ['Turkey and vegetable soup', 'Side salad with lemon juice', 'Tangerine'],
                        Snack: ['Protein shake with water', 'Cucumber slices'],
                        Dinner: ['Grilled shrimp (100g)', 'Zucchini noodles', 'Herbal tea']
                    },
                    4: {
                        Breakfast: ['1/2 cup oatmeal with berries', 'Green tea'],
                        Lunch: ['Tuna salad in lettuce wraps', 'Carrot and celery sticks', 'Orange'],
                        Snack: ['Rice cake with 1 tbsp cottage cheese'],
                        Dinner: ['Baked chicken breast (100g)', 'Steamed vegetables', 'Herbal tea']
                    }
                }
            }
        };
        
        const dietType = isVegetarian ? 'vegetarian' : 'nonVegetarian';
        
        // Return default meal items if specific plan not found
        if (!mealPlans[planType] || !mealPlans[planType][dietType] || !mealPlans[planType][dietType][dayNum] || !mealPlans[planType][dietType][dayNum][mealType]) {
            return ['Meal item 1', 'Meal item 2', 'Meal item 3'];
        }
        
        return mealPlans[planType][dietType][dayNum][mealType];
    }
    
    // BMI Calculator elements and functionality
    const calcHeightInput = document.getElementById('calc-height');
    const calcWeightInput = document.getElementById('calc-weight');
    const calcAgeInput = document.getElementById('calc-age');
    const calcBmiBtn = document.getElementById('calc-bmi-btn');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiRecommendation = document.getElementById('bmi-recommendation');
    
    // Calculate BMI when button is clicked
    if (calcBmiBtn) {
        calcBmiBtn.addEventListener('click', calculateBMI);
    }
    
    function calculateBMI() {
        const height = parseFloat(calcHeightInput.value); // in feet
        const weight = parseFloat(calcWeightInput.value); // in kg
        const age = parseInt(calcAgeInput.value);
        
        if (!height || !weight || !age) {
            alert('Please fill all fields with valid numbers');
            return;
        }
        
        // Convert height from feet to meters
        const heightInMeters = height * 0.3048;
        
        // Calculate BMI: weight (kg) / (height (m))^2
        const bmi = weight / (heightInMeters * heightInMeters);
        const roundedBmi = bmi.toFixed(1);
        
        // Display BMI value
        bmiValue.textContent = roundedBmi;
        
        // Determine BMI category and recommendation
        updateBmiResults(bmi, age);
    }
    
    function updateBmiResults(bmi, age) {
        let category, recommendation;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            recommendation = 'Consider gaining some weight through a healthy diet rich in proteins and calories.';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            recommendation = 'Maintain your current weight with a balanced diet and regular exercise.';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            recommendation = 'Consider losing some weight through a balanced diet and increased physical activity.';
        } else {
            category = 'Obese';
            recommendation = 'It is recommended to consult with a healthcare professional about a weight loss plan.';
        }
        
        // Age-specific adjustments to recommendation
        if (age < 20) {
            recommendation += ' As you are under 20, your BMI should be evaluated against age-specific percentiles.';
        } else if (age > 65) {
            recommendation += ' For adults over 65, a slightly higher BMI (25-27) may be beneficial.';
        }
        
        // Display category and recommendation
        bmiCategory.textContent = category;
        bmiRecommendation.textContent = recommendation;
    }
});

// Exercise Plan Modal Elements
const exerciseModal = document.getElementById('exercise-modal');
const exercisePlanBtn = document.getElementById('exercise-plan-btn');
const exerciseTabBtns = document.querySelectorAll('.exercise-tab-btn');
const exerciseTabContents = document.querySelectorAll('.exercise-tab-content');
const viewAllBtns = document.querySelectorAll('.view-all-btn');

// Open Exercise Plan modal when the button is clicked
if (exercisePlanBtn) {
    exercisePlanBtn.addEventListener('click', function() {
        exerciseModal.style.display = 'block';
    });
}

// Exercise Plan Tab Switching
exerciseTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        exerciseTabBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get the tab to show
        const tabToShow = this.getAttribute('data-exercise-tab');
        
        // Hide all tab contents
        exerciseTabContents.forEach(content => content.classList.remove('active'));
        
        // Show the selected tab content
        document.getElementById(tabToShow + '-tab').classList.add('active');
    });
});

// View Full Week Functionality
viewAllBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const planType = this.getAttribute('data-plan');
        loadFullWeekPlan(planType);
    });
});

// Load full week workout plan
function loadFullWeekPlan(planType) {
    const workoutDaysContainer = document.querySelector(`#${planType}-tab .workout-days`);
    const viewAllBtn = document.querySelector(`#${planType}-tab .view-all-btn`);
    
    // Check if days 3-7 are already loaded
    if (document.querySelector(`#${planType}-tab .workout-day:nth-child(3)`)) {
        viewAllBtn.textContent = 'Full week already loaded';
        viewAllBtn.disabled = true;
        return;
    }
    
    // Create remaining days based on plan type
    const remainingDays = getWorkoutPlan(planType);
    
    // Add remaining days to the container
    for (let dayNum = 3; dayNum <= 7; dayNum++) {
        if (remainingDays[dayNum]) {
            const workoutDay = createWorkoutDay(dayNum, remainingDays[dayNum]);
            workoutDaysContainer.appendChild(workoutDay);
        }
    }
    
    // Update button state
    viewAllBtn.textContent = 'Full week loaded';
    viewAllBtn.disabled = true;
}

// Create a workout day element
function createWorkoutDay(dayNum, dayData) {
    const workoutDay = document.createElement('div');
    workoutDay.className = 'workout-day';
    
    const dayTitle = document.createElement('h4');
    dayTitle.textContent = `Day ${dayNum}: ${dayData.title}`;
    workoutDay.appendChild(dayTitle);
    
    const exerciseList = document.createElement('div');
    exerciseList.className = 'exercise-list';
    
    // Add exercises
    dayData.exercises.forEach(exerciseData => {
        const exercise = document.createElement('div');
        exercise.className = 'exercise';
        
        const exerciseTitle = document.createElement('h5');
        exerciseTitle.textContent = exerciseData.name;
        exercise.appendChild(exerciseTitle);
        
        const exerciseDetails = document.createElement('ul');
        exerciseData.details.forEach(detail => {
            const detailItem = document.createElement('li');
            detailItem.textContent = detail;
            exerciseDetails.appendChild(detailItem);
        });
        
        exercise.appendChild(exerciseDetails);
        exerciseList.appendChild(exercise);
    });
    
    workoutDay.appendChild(exerciseList);
    return workoutDay;
}

// Get workout plan based on plan type
function getWorkoutPlan(planType) {
    const workoutPlans = {
        bulking: {
            3: {
                title: 'Legs & Shoulders',
                exercises: [
                    {
                        name: 'Squats',
                        details: [
                            '4 sets of 6-8 reps',
                            'Focus on heavy weight with proper form',
                            'Rest 2-3 minutes between sets'
                        ]
                    },
                    {
                        name: 'Romanian Deadlifts',
                        details: [
                            '3 sets of 8-10 reps',
                            'Focus on hamstring stretch',
                            'Rest 2 minutes between sets'
                        ]
                    },
                    {
                        name: 'Leg Press',
                        details: [
                            '3 sets of 10-12 reps',
                            'Feet positioned shoulder-width apart',
                            'Rest 90 seconds between sets'
                        ]
                    },
                    {
                        name: 'Military Press',
                        details: [
                            '4 sets of 6-8 reps',
                            'Focus on strict form',
                            'Rest 2 minutes between sets'
                        ]
                    },
                    {
                        name: 'Lateral Raises',
                        details: [
                            '3 sets of 10-12 reps',
                            'Controlled movement',
                            'Rest 60 seconds between sets'
                        ]
                    }
                ]
            },
            4: {
                title: 'Rest Day',
                exercises: [
                    {
                        name: 'Active Recovery',
                        details: [
                            'Light walking or swimming',
                            'Foam rolling and stretching',
                            'Focus on adequate nutrition and hydration',
                            '8-9 hours of quality sleep'
                        ]
                    }
                ]
            },
            5: {
                title: 'Chest & Triceps',
                exercises: [
                    {
                        name: 'Incline Barbell Bench Press',
                        details: [
                            '4 sets of 6-8 reps',
                            'Focus on upper chest activation',
                            'Rest 2 minutes between sets'
                        ]
                    },
                    {
                        name: 'Flat Dumbbell Press',
                        details: [
                            '3 sets of 8-10 reps',
                            'Full range of motion',
                            'Rest 90 seconds between sets'
                        ]
                    },
                    {
                        name: 'Cable Flyes',
                        details: [
                            '3 sets of 10-12 reps',
                            'Focus on chest contraction',
                            'Rest 60 seconds between sets'
                        ]
                    },
                    {
                        name: 'Close-Grip Bench Press',
                        details: [
                            '3 sets of 8-10 reps',
                            'Elbows tucked close to body',
                            'Rest 90 seconds between sets'
                        ]
                    },
                    {
                        name: 'Overhead Tricep Extensions',
                        details: [
                            '3 sets of 10-12 reps',
                            'Focus on full extension',
                            'Rest 60 seconds between sets'
                        ]
                    }
                ]
            },
            6: {
                title: 'Back & Biceps',
                exercises: [
                    {
                        name: 'Barbell Rows',
                        details: [
                            '4 sets of 6-8 reps',
                            'Focus on back thickness',
                            'Rest 2 minutes between sets'
                        ]
                    },
                    {
                        name: 'Pull-ups',
                        details: [
                            '3 sets of 8-10 reps',
                            'Add weight if needed',
                            'Rest 2 minutes between sets'
                        ]
                    },
                    {
                        name: 'Seated Cable Rows',
                        details: [
                            '3 sets of 10-12 reps',
                            'Focus on back contraction',
                            'Rest 90 seconds between sets'
                        ]
                    },
                    {
                        name: 'Dumbbell Curls',
                        details: [
                            '3 sets of 8-10 reps',
                            'Alternating arms',
                            'Rest 60 seconds between sets'
                        ]
                    },
                    {
                        name: 'EZ Bar Preacher Curls',
                        details: [
                            '3 sets of 10-12 reps',
                            'Focus on bicep peak',
                            'Rest 60 seconds between sets'
                        ]
                    }
                ]
            },
            7: {
                title: 'Legs & Shoulders',
                exercises: [
                    {
                        name: 'Leg Press',
                        details: [
                            '4 sets of 8-10 reps',
                            'Feet high on platform for hamstring focus',
                            'Rest 2 minutes between sets'
                        ]
                    },
                    {
                        name: 'Walking Lunges',
                        details: [
                            '3 sets of 12 steps each leg',
                            'Hold dumbbells for added resistance',
                            'Rest 90 seconds between sets'
                        ]
                    },
                    {
                        name: 'Leg Extensions',
                        details: [
                            '3 sets of 12-15 reps',
                            'Focus on quad contraction',
                            'Rest 60 seconds between sets'
                        ]
                    },
                    {
                        name: 'Seated Dumbbell Press',
                        details: [
                            '4 sets of 8-10 reps',
                            'Focus on shoulder development',
                            'Rest 90 seconds between sets'
                        ]
                    },
                    {
                        name: 'Face Pulls',
                        details: [
                            '3 sets of 12-15 reps',
                            'Focus on rear delts and rotator cuff',
                            'Rest 60 seconds between sets'
                        ]
                    }
                ]
            }
        },
        maintaining: {
            3: {
                title: 'Active Recovery',
                exercises: [
                    {
                        name: 'Yoga or Flexibility Session',
                        details: [
                            '30-45 minutes yoga flow',
                            'Focus on full-body mobility',
                            'Deep breathing and relaxation'
                        ]
                    },
                    {
                        name: 'Light Cardio',
                        details: [
                            '20-30 minutes of walking or cycling',
                            'Low intensity (50-60% max heart rate)',
                            'Focus on blood flow and recovery'
                        ]
                    }
                ]
            },
            4: {
                title: 'Upper Body Focus',
                exercises: [
                    {
                        name: 'Pull-ups / Assisted Pull-ups',
                        details: [
                            '3 sets of 8-10 reps',
                            'Focus on controlled movement',
                            'Rest 60-90 seconds between sets'
                        ]
                    },
                    {
                        name: 'Push-ups',
                        details: [
                            '3 sets of 10-15 reps',
                            'Vary hand positions for each set',
                            'Rest 60 seconds between sets'
                        ]
                    },
                    {
                        name: 'Dumbbell Rows',
                        details: [
                            '3 sets of 10-12 reps each arm',
                            'Focus on back contraction',
                            'Rest 60 seconds between sets'
                        ]
                    },
                    {
                        name: 'Lateral Raises',
                        details: [
                            '3 sets of 12-15 reps',
                            'Light to moderate weight',
                            'Rest 45 seconds between sets'
                        ]
                    },
                    {
                        name: '15-minute moderate cardio',
                        details: [
                            'Rowing machine, cycling, or elliptical',
                            'Heart rate at 65-75% of max'
                        ]
                    }
                ]
            },
            5: {
                title: 'Lower Body Focus',
                exercises: [
                    {
                        name: 'Dumbbell Lunges',
                        details: [
                            '3 sets of 10-12 reps each leg',
                            'Alternating legs',
                            'Rest 60-90 seconds between sets'
                        ]
                    },
                    {
                        name: 'Kettlebell Swings',
                        details: [
                            '3 sets of 15 reps',
                            'Focus on hip hinge movement',
                            'Rest 60 seconds between sets'
                        ]
                    },
                    {
                        name: 'Step-ups',
                        details: [
                            '3 sets of 12 reps each leg',
                            'Use bench or plyo box',
                            'Rest 60 seconds between sets'
                        ]
                    },
                    {
                        name: 'Glute Bridges',
                        details: [
                            '3 sets of 15 reps',
                            'Add weight if too easy',
                            'Rest 45 seconds between sets'
                        ]
                    },
                    {
                        name: '15-minute cardio intervals',
                        details: [
                            '1 minute high intensity, 2 minutes moderate',
                            '5 rounds total'
                        ]
                    }
                ]
            },
            6: {
                title: 'Functional Circuit',
                exercises: [
                    {
                        name: 'Full Body Circuit (3-4 rounds)',
                        details: [
                            'Burpees: 10 reps',
                            'Mountain Climbers: 20 reps each leg',
                            'Dumbbell Thrusters: 12 reps',
                            'Renegade Rows: 10 reps each arm',
                            'Rest 90 seconds between rounds'
                        ]
                    },
                    {
                        name: 'Core Circuit',
                        details: [
                            'Plank: 45 seconds',
                            'Russian Twists: 20 reps each side',
                            'Bicycle Crunches: 20 reps each side',
                            'Rest 45 seconds between exercises, 3 rounds total'
                        ]
                    }
                ]
            },
            7: {
                title: 'Active Recovery / Light Activity',
                exercises: [
                    {
                        name: 'Recreational Activity',
                        details: [
                            'Choose something enjoyable: hiking, swimming, dancing, sports',
                            '30-60 minutes at moderate intensity',
                            'Focus on fun and movement rather than structured exercise'
                        ]
                    },
                    {
                        name: 'Mobility Work',
                        details: [
                            'Foam rolling: 10 minutes',
                            'Dynamic stretching: 10 minutes',
                            'Focus on areas that feel tight or sore'
                        ]
                    }
                ]
            }
        },
        cutting: {
            3: {
                title: 'Full Body Circuit',
                exercises: [
                    {
                        name: 'Circuit Training (4 rounds)',
                        details: [
                            'Dumbbell Thrusters: 15 reps',
                            'Renegade Rows: 10 reps each arm',
                            'Mountain Climbers: 30 seconds',
                            'Kettlebell Swings: 15 reps',
                            'Wall Sits: 45 seconds',
                            'Rest 30 seconds between exercises, 90 seconds between rounds'
                        ]
                    },
                    {
                        name: 'Tabata Finisher (4 minutes)',
                        details: [
                            '20 seconds work, 10 seconds rest',
                            'Alternating between Jump Squats and Push-ups',
                            '8 rounds total'
                        ]
                    }
                ]
            },
            4: {
                title: 'High-Intensity Cardio',
                exercises: [
                    {
                        name: 'HIIT Sprint Intervals',
                        details: [
                            '5-minute warm-up jog',
                            '30 seconds sprint, 90 seconds walking recovery',
                            '8-10 rounds total',
                            '5-minute cool-down walk'
                        ]
                    },
                    {
                        name: 'Core Circuit',
                        details: [
                            'Plank: 45 seconds',
                            'Russian Twists: 20 reps each side',
                            'V-ups: 15 reps',
                            'Mountain Climbers: 30 seconds',
                            'Rest 30 seconds between exercises, 3 rounds total'
                        ]
                    }
                ]
            },
            5: {
                title: 'Upper Body & Cardio',
                exercises: [
                    {
                        name: 'Superset 1 (3 rounds)',
                        details: [
                            'Push-ups: 15-20 reps',
                            'Pull-ups or Inverted Rows: 10-12 reps',
                            'Rest 45 seconds between rounds'
                        ]
                    },
                    {
                        name: 'Superset 2 (3 rounds)',
                        details: [
                            'Dumbbell Shoulder Press: 12-15 reps',
                            'Dumbbell Bent-Over Rows: 12-15 reps',
                            'Rest 45 seconds between rounds'
                        ]
                    },
                    {
                        name: 'Superset 3 (3 rounds)',
                        details: [
                            'Tricep Dips: 15 reps',
                            'Bicep Curls: 15 reps',
                            'Rest 45 seconds between rounds'
                        ]
                    },
                    {
                        name: 'Cardio Finisher',
                        details: [
                            '15 minutes of steady-state cardio',
                            'Heart rate at 70-75% of max'
                        ]
                    }
                ]
            },
            6: {
                title: 'Lower Body & HIIT',
                exercises: [
                    {
                        name: 'Superset 1 (3 rounds)',
                        details: [
                            'Bulgarian Split Squats: 12 reps each leg',
                            'Glute Bridges: 15 reps',
                            'Rest 45 seconds between rounds'
                        ]
                    },
                    {
                        name: 'Superset 2 (3 rounds)',
                        details: [
                            'Goblet Squats: 15 reps',
                            'Curtsy Lunges: 12 reps each leg',
                            'Rest 45 seconds between rounds'
                        ]
                    },
                    {
                        name: 'Superset 3 (3 rounds)',
                        details: [
                            'Calf Raises: 20 reps',
                            'Plank with Leg Lifts: 10 reps each leg',
                            'Rest 45 seconds between rounds'
                        ]
                    },
                    {
                        name: 'HIIT Finisher',
                        details: [
                            '30 seconds on, 30 seconds off',
                            'Cycle through: Burpees, High Knees, Jump Squats, Mountain Climbers',
                            '4 rounds (8 minutes total)'
                        ]
                    }
                ]
            },
            7: {
                title: 'Active Recovery or Rest',
                exercises: [
                    {
                        name: 'Light Activity Options',
                        details: [
                            '30-45 minutes walking, swimming, or cycling',
                            'Keep heart rate under 120 BPM',
                            'Focus on recovery, not intensity'
                        ]
                    },
                    {
                        name: 'Stretching & Mobility',
                        details: [
                            '15-20 minutes full-body stretching routine',
                            'Foam rolling tight muscles',
                            'Focus on areas that feel particularly sore'
                        ]
                    }
                ]
            }
        }
    };
    
    return workoutPlans[planType] || {};
}

// Update close modal functionality to include exercise modal
window.addEventListener('click', function(event) {
    if (event.target === exerciseModal) {
        exerciseModal.style.display = 'none';
    }
});
