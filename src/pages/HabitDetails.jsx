import React, { use, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaTrophy, FaCalendarCheck, FaClock } from 'react-icons/fa';
import { MdOutlineTaskAlt } from 'react-icons/md';
import CompletedHabit from '../components/CompletedHabit';
import CompletionModal from '../components/CompletionModal';

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  
  const [habit, setHabit] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionData, setCompletionData] = useState({ streak: 0, habitTitle: '' });
  
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
    
    CompletedHabit.markComplete(id, habit, (data) => {
      // Show completion modal with streak data
      setCompletionData({
        streak: data.currentStreak || 1,
        habitTitle: habit.title
      });
      setShowCompletionModal(true);
      
      // Reload habit after successful completion
      loadHabit();
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
  const completedToday = habit.completionHistory?.includes(new Date().toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-base-200 overflow-x-hidden" style={{ paddingTop: '24px', paddingBottom: '24px', paddingLeft: '12px', paddingRight: '12px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
        style={{ maxWidth: '1152px', margin: '0 auto' }}
      >
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full" style={{ gap: '16px' }}>
          {/* Div 1 - Top Row (Habit Card + Current Streak Card) */}
          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-5" style={{ gap: '16px', marginBottom: '16px' }}>
            {/* Div 1.1 - Habit Card (3/5 = 60%) */}
            <div className="lg:col-span-3 card bg-base-100 shadow-xl rounded-3xl" style={{ height: '100%' }}>
              <div className="card-body" style={{ padding: '24px' }}>
              {/* Habit Image and Info in horizontal layout */}
              <div className="flex flex-col sm:flex-row items-start" style={{ gap: '16px' }}>
                {/* Habit Image */}
                <div className="w-full sm:w-48 flex-shrink-0">
                  <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img
                      src={habit.imageUrl || '/default-habit-img/51359.jpg'}
                      alt={habit.title}
                      className="w-full sm:h-full object-cover"
                      style={{ height: '200px' }}
                    />
                  </div>
                </div>

                {/* Icon, Habit Name and Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start" style={{ gap: '12px', marginBottom: '12px' }}>
                    {/* Habit Icon */}
                    <div className="avatar flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <MdOutlineTaskAlt className="text-primary text-2xl md:text-3xl" />
                      </div>
                    </div>
                    
                    {/* Habit Name */}
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold break-words mb-2">{habit.title}</h2>
                      <div className="flex flex-wrap gap-2">
                        <span className="badge badge-primary text-xs md:text-sm px-3 py-2">{habit.category}</span>
                        <span className="badge badge-outline text-xs md:text-sm px-3 py-2">
                          <FaClock className="mr-1" />
                          {habit.reminderTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: '12px' }}>
                    <h3 className="text-base font-semibold" style={{ marginBottom: '6px' }}>Description</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{habit.description}</p>
                  </div>

                  {/* Creator Info */}
                  <div style={{ marginBottom: '16px' }}>
                    <h3 className="text-base font-semibold" style={{ marginBottom: '6px' }}>Created by</h3>
                    <div className="flex items-center bg-base-200 rounded-3xl" style={{ gap: '12px', padding: '12px' }}>
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={habit.userPhotoURL || 'https://via.placeholder.com/50'}
                            alt={habit.userName}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-base">{habit.userName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Mark Complete Button or Completed Status - At Bottom */}
                  {isUserHabit && (
                    <div>
                      {completedToday ? (
                        <div className="badge badge-success gap-2 px-3 py-2 md:px-6 md:py-4 text-xs md:text-base whitespace-nowrap rounded-full">
                          <FaCalendarCheck className="text-sm md:text-lg" />
                          <span>Completed for Today</span>
                        </div>
                      ) : (
                        <button
                          onClick={handleMarkComplete}
                          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                          <FaCalendarCheck className="text-lg" />
                          <span>Mark Complete</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Div 1.2 - Current Streak Card (2/5 = 40%) */}
          <div className="lg:col-span-2 card bg-info/20 shadow-xl rounded-3xl" style={{ height: '100%' }}>
            <div className="card-body flex flex-col justify-between" style={{ padding: '24px' }}>
              <div>
                <h3 className="text-lg font-bold text-center mb-4">Current Streak</h3>
                
                {/* Streak Display */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full border-8 border-orange-500 bg-transparent shadow-lg mb-3">
                    <div className="text-center">
                      <FaTrophy className="text-orange-500 text-2xl md:text-3xl mb-1 mx-auto" />
                      <p className="text-orange-500 text-3xl md:text-4xl font-bold">{habit.currentStreak || 0}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 font-semibold text-base">
                    Day{habit.currentStreak !== 1 ? 's' : ''} 🔥
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center p-3 bg-base-200 rounded-xl">
                  <span className="text-gray-500 font-medium text-xs mb-1">Total Completions</span>
                  <span className="text-primary font-bold text-xl">{habit.completionHistory?.length || 0}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-base-200 rounded-xl">
                  <span className="text-gray-500 font-medium text-xs mb-1">Success Rate</span>
                  <span className="text-success font-bold text-xl">{completionRate}%</span>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Div 2 - Bottom Row - 30 Days Streak Card (Full Width) */}
          <div className="lg:col-span-2 w-full">
          <div className="card bg-success/20 shadow-xl rounded-3xl">
            <div className="card-body p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">30 Days Streak</h3>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Completion Rate</span>
                  <span className="font-bold" style={{ color: '#16a34a' }}>{completionRate}%</span>
                </div>
                <div className="w-full bg-base-300 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-success rounded-full transition-all duration-500"
                    style={{ 
                      width: `${completionRate}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 sm:grid-cols-10 lg:grid-cols-15 gap-1.5 sm:gap-2">
                {progressData.map((day, index) => (
                  <div
                    key={index}
                    className={`tooltip ${day.completed ? 'tooltip-success' : 'tooltip-error'}`}
                    data-tip={`${day.date}: ${day.completed ? 'Completed' : 'Missed'}`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
                <div className="stat bg-base-200 rounded-3xl p-3 md:p-4">
                  <div className="stat-title text-xs md:text-sm">Total Completions</div>
                  <div className="stat-value text-primary text-2xl md:text-3xl">{habit.completionHistory?.length || 0}</div>
                </div>
                <div className="stat bg-base-200 rounded-3xl p-3 md:p-4">
                  <div className="stat-title text-xs md:text-sm">Current Streak</div>
                  <div className="stat-value text-success text-2xl md:text-3xl">{habit.currentStreak || 0}</div>
                </div>
                <div className="stat bg-base-200 rounded-3xl p-3 md:p-4">
                  <div className="stat-title text-xs md:text-sm">Last 30 Days</div>
                  <div className="stat-value text-warning text-2xl md:text-3xl">
                    {progressData.filter(d => d.completed).length}
                  </div>
                </div>
                <div className="stat bg-base-200 rounded-3xl p-3 md:p-4">
                  <div className="stat-title text-xs md:text-sm">Success Rate</div>
                  <div className="stat-value text-info text-2xl md:text-3xl">{completionRate}%</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </motion.div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        streak={completionData.streak}
        habitTitle={completionData.habitTitle}
      />
    </div>
  );
};

export default HabitDetails;
