import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheckCircle, FaPlus, FaTrophy, FaChartLine } from 'react-icons/fa';
import { MdOutlineTaskAlt } from 'react-icons/md';
import axios from 'axios';
import CompletedHabit, { isCompletedToday } from '../components/CompletedHabit';
import CompletionModal from '../components/CompletionModal';

const MyHabits = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionData, setCompletionData] = useState({ streak: 0, habitTitle: '' });

  const loadHabits = () => {
    if (user?.email) {
      axios.get(`http://localhost:3000/habits/user/${user.email}`)
        .then(res => {
          setHabits(res.data);
        })
        .catch(err => {
          console.error('Error loading habits:', err);
          toast.error('Failed to load habits');
        });
    }
  };

  useEffect(() => {
    loadHabits();
  }, [user?.email]);

  const handleDelete = (id, title) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete habit: "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete :('
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/habits/${id}`)
          .then(() => {
            loadHabits();
            toast.success('Habit deleted successfully');
          })
          .catch(err => {
            console.error('Error deleting habit:', err);
            toast.error('Failed to delete habit');
          });
      }
    });
  };

  const handleMarkComplete = (id) => {
    const habit = habits.find(h => h._id === id);
    if (!habit) return;
    
    CompletedHabit.markComplete(id, habit, (data) => {
      // Show completion modal with streak data
      setCompletionData({
        streak: data.currentStreak || 1,
        habitTitle: habit.title
      });
      setShowCompletionModal(true);
      
      // Reload habits after successful completion
      loadHabits();
    });
  };

  const handleEdit = (habitId) => {
    navigate(`/update-habit/${habitId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-base-200 overflow-x-hidden" style={{ paddingTop: '48px', paddingBottom: '48px', paddingLeft: '12px', paddingRight: '12px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
        style={{ maxWidth: '1280px', margin: '0 auto' }}
      >
        <h2 className="text-4xl font-bold text-center mb-8">My Habits</h2>

        {habits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">You haven't created any habits yet.</p>
            <a href="/add-habit" className="btn btn-primary">
              <FaPlus /> Create Your First Habit
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-3xl shadow-xl">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Current Streak</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <motion.tr
                    key={habit._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="cursor-pointer hover:bg-base-200"
                    onClick={() => navigate(`/habit/${habit._id}`)}
                  >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 bg-base-200 flex items-center justify-center">
                              {habit.imageUrl ? (
                                <img
                                  src={habit.imageUrl}
                                  alt={habit.title}
                                />
                              ) : (
                                <MdOutlineTaskAlt className="text-primary text-2xl" />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{habit.title}</div>
                            <div className="text-sm opacity-50 line-clamp-1">{habit.description}</div>
                          </div>
                        </div>
                      </td>
                    <td>
                      <span className="badge badge-primary badge-lg">{habit.category}</span>
                      <br />
                      <span className="badge badge-ghost badge-sm mt-1">{habit.reminderTime}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <FaChartLine className="text-green-500 text-xl" />
                        <span className="font-bold text-lg">{habit.currentStreak || 0}</span>
                        <span className="text-sm text-gray-500">days</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm">{formatDate(habit.createdAt)}</span>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const today = new Date().toISOString().split('T')[0];
                            if (habit.completionHistory && habit.completionHistory.includes(today)) {
                              toast.error('Already completed today!');
                            } else {
                              handleMarkComplete(habit._id);
                            }
                          }}
                          className={`p-2 border-2 rounded-lg transition-all ${
                            isCompletedToday(habit)
                              ? 'border-gray-400 text-gray-400 cursor-not-allowed'
                              : 'border-green-600 text-green-600 hover:bg-green-50'
                          }`}
                          title={isCompletedToday(habit) ? 'Completed Today' : 'Mark Complete'}
                          disabled={isCompletedToday(habit)}
                        >
                          <FaCheckCircle className="text-lg" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(habit._id);
                          }}
                          className="p-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(habit._id, habit.title);
                          }}
                          className="p-2 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

export default MyHabits;
