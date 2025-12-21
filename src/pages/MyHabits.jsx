import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { uploadImageToImageBB } from '../utils/imageUpload';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheckCircle, FaPlus, FaTrophy } from 'react-icons/fa';
import { MdOutlineTaskAlt } from 'react-icons/md';
import axios from 'axios';

const MyHabits = () => {
  const { user } = use(AuthContext);
  const [habits, setHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study'];

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
    const today = new Date().toISOString().split('T')[0];
    const habit = habits.find(h => h._id === id);
    
    if (habit.completionHistory.includes(today)) {
      toast.error('Already completed today!');
      return;
    }

    axios.patch(`http://localhost:3000/habits/${id}/complete`, { date: today })
      .then(() => {
        loadHabits();
        toast.success('Habit marked as complete! 🎉');
      })
      .catch(err => {
        console.error('Error marking habit complete:', err);
        toast.error('Failed to mark habit complete');
      });
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setImageFile(null);
    setImagePreview(null);
    document.getElementById('edit_modal').showModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateHabitDetails = async (formData) => {
    axios.put(`http://localhost:3000/habits/${editingHabit._id}`, formData)
      .then(res => {
        console.log(res.data);
        loadHabits();
        toast.success('Habit updated successfully!');
        document.getElementById('edit_modal').close();
        setLoading(false);
      })
      .catch(err => {
        console.error('Error updating habit:', err);
        toast.error('Failed to update habit');
        setLoading(false);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;
    const isPublic = form.isPublic.checked;

    try {
      let imageUrl = editingHabit.imageUrl;

      // Upload new image if provided
      if (imageFile) {
        imageUrl = await uploadImageToImageBB(imageFile);
      }

      const formData = {
        title,
        description,
        category,
        reminderTime,
        imageUrl,
        isPublic,
        userEmail: editingHabit.userEmail,
        userName: editingHabit.userName,
        createdAt: editingHabit.createdAt
      };

      updateHabitDetails(formData);
    } catch (err) {
      console.error('Error updating habit:', err);
      toast.error('Failed to update habit');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
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
                        <FaTrophy className="text-warning text-xl" />
                        <span className="font-bold text-lg">🔥 {habit.currentStreak}</span>
                        <span className="text-sm text-gray-500">days</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm">{formatDate(habit.createdAt)}</span>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleMarkComplete(habit._id)}
                          className="p-2 border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="Mark Complete"
                        >
                          <FaCheckCircle className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleEdit(habit)}
                          className="p-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(habit._id, habit.title)}
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

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="text-4xl font-bold text-center mb-2 text-[#1085F1]">Edit Habit</h3>
          <p className="text-gray-600 text-center mb-8">Update your habit details</p>
          
          {editingHabit && (
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Habit Title */}
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Habit Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Morning Meditation"
                  defaultValue={editingHabit.title}
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Description *</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your habit and why it's important to you..."
                  defaultValue={editingHabit.description}
                  className="textarea textarea-bordered w-full h-24 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Category */}
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Category *</span>
                </label>
                <select
                  name="category"
                  defaultValue={editingHabit.category}
                  className="select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reminder Time */}
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Reminder Time *</span>
                </label>
                <input
                  type="time"
                  name="reminderTime"
                  defaultValue={editingHabit.reminderTime}
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Habit Image (Optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                />
                {imagePreview ? (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-xs rounded-xl shadow-lg mx-auto"
                    />
                  </div>
                ) : editingHabit.imageUrl ? (
                  <div className="mt-4">
                    <img
                      src={editingHabit.imageUrl}
                      alt="Current"
                      className="w-full max-w-xs rounded-xl shadow-lg mx-auto"
                    />
                  </div>
                ) : null}
              </div>

              {/* User Name (Read-only) */}
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName || 'Anonymous'}
                  className="input input-bordered w-full rounded-xl bg-gray-50"
                  readOnly
                  disabled
                />
              </div>

              {/* User Email (Read-only) */}
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="input input-bordered w-full rounded-xl bg-gray-50"
                  readOnly
                  disabled
                />
              </div>

              {/* Public/Private Toggle */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  name="isPublic"
                  className="checkbox checkbox-primary"
                  defaultChecked={editingHabit.isPublic}
                  id="isPublicEdit"
                />
                <label htmlFor="isPublicEdit" className="font-semibold text-gray-700 cursor-pointer">
                  Make this habit public (visible to others)
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="btn-primary w-full rounded-xl py-3 font-semibold text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating Habit...
                    </>
                  ) : (
                    'Update Habit'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyHabits;
