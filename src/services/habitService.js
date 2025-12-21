// Local storage based habit management service
const HABITS_KEY = 'habits_tracker_data';

// Helper function to generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get all habits from localStorage
export const getAllHabits = () => {
  const habits = localStorage.getItem(HABITS_KEY);
  return habits ? JSON.parse(habits) : [];
};

// Get habits by user email
export const getHabitsByUser = (userEmail) => {
  const habits = getAllHabits();
  return habits.filter(habit => habit.userEmail === userEmail);
};

// Get public habits (for Browse page)
export const getPublicHabits = () => {
  const habits = getAllHabits();
  return habits.filter(habit => habit.isPublic === true);
};

// Get habit by ID
export const getHabitById = (id) => {
  const habits = getAllHabits();
  return habits.find(habit => habit.id === id);
};

// Create new habit
export const createHabit = (habitData) => {
  const habits = getAllHabits();
  const newHabit = {
    id: generateId(),
    ...habitData,
    createdAt: new Date().toISOString(),
    completionHistory: [],
    currentStreak: 0,
    isPublic: habitData.isPublic !== undefined ? habitData.isPublic : true
  };
  habits.push(newHabit);
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  return newHabit;
};

// Update habit
export const updateHabit = (id, updatedData) => {
  const habits = getAllHabits();
  const index = habits.findIndex(habit => habit.id === id);
  if (index !== -1) {
    habits[index] = { ...habits[index], ...updatedData };
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    return habits[index];
  }
  return null;
};

// Delete habit
export const deleteHabit = (id) => {
  const habits = getAllHabits();
  const filteredHabits = habits.filter(habit => habit.id !== id);
  localStorage.setItem(HABITS_KEY, JSON.stringify(filteredHabits));
  return true;
};

// Mark habit as complete for today
export const markHabitComplete = (id) => {
  const habits = getAllHabits();
  const habit = habits.find(h => h.id === id);
  
  if (!habit) return null;

  const today = new Date().toISOString().split('T')[0];
  
  // Check if already completed today
  if (habit.completionHistory.includes(today)) {
    return habit; // Already completed today
  }

  // Add today to completion history
  habit.completionHistory.push(today);
  
  // Calculate current streak
  habit.currentStreak = calculateStreak(habit.completionHistory);
  
  // Update in storage
  const index = habits.findIndex(h => h.id === id);
  habits[index] = habit;
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  
  return habit;
};

// Calculate current streak from completion history
export const calculateStreak = (completionHistory) => {
  if (!completionHistory || completionHistory.length === 0) return 0;

  // Sort dates in descending order
  const sortedDates = completionHistory
    .map(date => new Date(date))
    .sort((a, b) => b - a);

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    currentDate.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    if (currentDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Get newest public habits for featured section
export const getFeaturedHabits = (limit = 6) => {
  const publicHabits = getPublicHabits();
  return publicHabits
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

// Search and filter habits
export const searchAndFilterHabits = (searchTerm = '', category = '') => {
  let habits = getPublicHabits();
  
  if (searchTerm) {
    habits = habits.filter(habit => 
      habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      habit.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (category && category !== 'All') {
    habits = habits.filter(habit => habit.category === category);
  }
  
  return habits;
};
