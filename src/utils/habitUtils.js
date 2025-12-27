import axiosInstance from './axiosInstance';
import { toast } from 'react-hot-toast';

/**
 * Calculate streak from completion history
 */
export const calculateStreak = (completionHistory) => {
  if (!completionHistory || completionHistory.length === 0) return 0;
  
  const sortedDates = completionHistory.sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  
  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - i);
    const expectedDateStr = expectedDate.toISOString().split('T')[0];
    
    if (sortedDates[i] === expectedDateStr) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

/**
 * Mark habit as complete for today
 * @param {string} habitId - The habit ID
 * @param {object} habit - The complete habit object
 * @param {function} onSuccess - Callback function on success
 * @param {function} onError - Optional callback function on error
 */
export const completeHabit = async (habitId, habit, onSuccess, onError) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Check if already completed today
  if (habit.completionHistory && habit.completionHistory.includes(today)) {
    toast.error('Already completed today!');
    return;
  }

  try {
    // Add today to completionHistory
    const updatedCompletionHistory = [...(habit.completionHistory || []), today];
    
    // Calculate new streak
    const newStreak = calculateStreak(updatedCompletionHistory);
    
    // Update habit with new completion history and streak
    const updatedData = {
      ...habit,
      completionHistory: updatedCompletionHistory,
      currentStreak: newStreak
    };
    
    const response = await axiosInstance.put(`/habits/${habitId}`, updatedData);
    
    if (response.data) {
      toast.success('Habit marked as complete! 🎉');
      if (onSuccess) {
        onSuccess(response.data);
      }
    }
  } catch (err) {
    console.error('Error marking habit complete:', err);
    toast.error('Failed to mark habit complete');
    if (onError) {
      onError(err);
    }
  }
};

/**
 * Check if habit is completed today
 * @param {object} habit - The habit object
 * @returns {boolean}
 */
export const isCompletedToday = (habit) => {
  const today = new Date().toISOString().split('T')[0];
  return habit.completionHistory && habit.completionHistory.includes(today);
};
