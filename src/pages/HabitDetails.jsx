import React, { use, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaTrophy, FaCalendarCheck, FaClock, FaUser } from 'react-icons/fa';
import { completeHabit } from '../utils/habitUtils';

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  
  const [habit, setHabit] = useState(null);
  const [progressData, setProgressData] = useState([]);
  
  const loadHabit = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/habits/${id}`);
      const habitState = response.data;
      setHabit(habitState);
      
      // Calculate progress
      const last30Days = [];
      const today = new Date();

      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const isCompleted = habitState.completionHistory?.includes(dateString) || false;
        last30Days.push({
          date: dateString,
          completed: isCompleted,
          day: date.getDate()
        });
      }
      
      setProgressData(last30Days);
    } catch (error) {
      console.error('Error loading habit:', error);
      toast.error('Habit not found');
    }
  };

  useEffect(() => {
    loadHabit();
  }, [id]);

  const handleMarkComplete = () => {
    if (!habit) return;
    
    completeHabit(id, habit, () => {
      loadHabit(); // Reload habit after successful completion
    });
  };

  const getStreakBadgeColor = (streak) => {
    if (streak >= 30) return 'badge-error';
    if (streak >= 14) return 'badge-warning';
    if (streak >= 7) return 'badge-success';
    return 'badge-info';
  };

  const completionRate = habit 
    ? ((progressData.filter(d => d.completed).length / 30) * 100).toFixed(0) 
    : 0;

  if (!habit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const isUserHabit = user && user.email === habit.userEmail;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Hero Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <figure className="h-64 md:h-96 overflow-hidden">
            <img
              src={habit.imageUrl || 'https://via.placeholder.com/800x400'}
              alt={habit.title}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h2 className="card-title text-3xl md:text-4xl">{habit.title}</h2>
              <div className={`badge badge-lg ${getStreakBadgeColor(habit.currentStreak)}`}>
                <FaTrophy className="mr-2" />
                {habit.currentStreak} Day Streak
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge badge-primary badge-lg">{habit.category}</span>
              <span className="badge badge-outline badge-lg">
                <FaClock className="mr-2" />
                {habit.reminderTime}
              </span>
            </div>

            <p className="text-lg mb-6">{habit.description}</p>

            {/* Creator Info */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-base-200 rounded-lg">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={habit.userPhotoURL || 'https://via.placeholder.com/50'}
                    alt={habit.userName}
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold text-lg">{habit.userName}</p>
                <p className="text-sm text-gray-600">{habit.userEmail}</p>
              </div>
            </div>

            {/* Mark Complete Button */}
            {isUserHabit && (
              <button
                onClick={handleMarkComplete}
                className="btn btn-success btn-lg w-full md:w-auto"
              >
                <FaCalendarCheck className="mr-2" />
                Mark Complete for Today
              </button>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h3 className="text-2xl font-bold mb-4">Last 30 Days Progress</h3>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Completion Rate</span>
                <span className="font-bold text-primary">{completionRate}%</span>
              </div>
              <progress
                className="progress progress-primary w-full h-4"
                value={completionRate}
                max="100"
              ></progress>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-10 md:grid-cols-15 gap-2">
              {progressData.map((day, index) => (
                <div
                  key={index}
                  className={`tooltip ${day.completed ? 'tooltip-success' : 'tooltip-error'}`}
                  data-tip={`${day.date}: ${day.completed ? 'Completed' : 'Missed'}`}
                >
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      day.completed
                        ? 'bg-success text-white'
                        : 'bg-base-300 text-gray-500'
                    }`}
                  >
                    {day.day}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Total Completions</div>
                <div className="stat-value text-primary">{habit.completionHistory?.length || 0}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Current Streak</div>
                <div className="stat-value text-success">{habit.currentStreak || 0}</div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Last 30 Days</div>
                <div className="stat-value text-warning">
                  {progressData.filter(d => d.completed).length}
                </div>
              </div>
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title">Success Rate</div>
                <div className="stat-value text-info">{completionRate}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Badge Section */}
        <div className="card bg-gradient-to-r from-primary to-secondary text-white shadow-xl">
          <div className="card-body text-center">
            <FaTrophy className="text-6xl mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">
              {habit.currentStreak === 0 && "Start Your Journey!"}
              {habit.currentStreak > 0 && habit.currentStreak < 7 && "Building Momentum!"}
              {habit.currentStreak >= 7 && habit.currentStreak < 30 && "On Fire! 🔥"}
              {habit.currentStreak >= 30 && "Habit Master! 🏆"}
            </h3>
            <p className="text-xl">
              {habit.currentStreak === 0 && "Begin your streak today!"}
              {habit.currentStreak > 0 && habit.currentStreak < 7 && "Keep going, you're doing great!"}
              {habit.currentStreak >= 7 && habit.currentStreak < 30 && "Consistency is key!"}
              {habit.currentStreak >= 30 && "You've mastered this habit!"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HabitDetails;
