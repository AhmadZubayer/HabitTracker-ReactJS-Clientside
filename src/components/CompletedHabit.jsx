import React from 'react';
import { toast } from 'react-hot-toast';

/**
 * Calculate streak from completion history
 */
const calculateStreak = (completionHistory) => {
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
 * Check if habit is completed today
 */
export const isCompletedToday = (habit) => {
  const today = new Date().toISOString().split('T')[0];
  return habit.completionHistory && habit.completionHistory.includes(today);
};

/**
 * CompletedHabit Component - Handles marking habits as complete
 */
const CompletedHabit = {
  /**
   * Mark habit as complete for today
   * @param {string} habitId - The habit ID
   * @param {object} habit - The complete habit object
   * @param {function} onSuccess - Callback function on success (receives updated data)
   * @param {function} onError - Optional callback function on error
   * @param {object} axiosSecure - Authenticated axios instance
   */
  markComplete: async (habitId, habit, onSuccess, onError, axiosSecure) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already completed today
    if (habit.completionHistory && habit.completionHistory.includes(today)) {
      toast.error('Already completed today!');
      return;
    }

    try {
      // Prepare data to send to backend
      const payload = {
        habitId,
        date: today
      };

      // Use the provided axiosSecure instance to call backend API
      if (!axiosSecure) {
        toast.error('Authentication required');
        return;
      }
      
      const response = await axiosSecure.post(`/habits/${habitId}/complete`, payload);
      
      if (response.data) {
        toast.success('Habit marked as complete! 🎉');
        if (onSuccess) {
          // Pass the response data including streak info
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
  }
};

export default CompletedHabit;
