import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { uploadImageToImageBB } from '../utils/imageUpload';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateHabit = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [habit, setHabit] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study'];

  useEffect(() => {
    if (id) {
      setPageLoading(true);
      console.log('Fetching habit with ID:', id);
      axiosSecure.get(`/habits/${id}`)
        .then(res => {
          console.log('Habit loaded:', res.data);
          setHabit(res.data);
        })
        .catch(err => {
          console.error('Error loading habit:', err);
          console.error('Error details:', err.response?.data || err.message);
          toast.error(`Failed to load habit: ${err.response?.data?.message || err.message}`);
          navigate('/my-habits');
        })
        .finally(() => {
          setPageLoading(false);
        });
    }
  }, [id, axiosSecure, navigate]);

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

  const updateHabitDetails = (formData) => {
    axiosSecure.put(`/habits/${id}`, formData)
      .then(res => {
        console.log(res.data);
        toast.success('Habit updated successfully!');
        navigate('/my-habits');
      })
      .catch(err => {
        console.error('Error updating habit:', err);
        toast.error('Failed to update habit');
      })
      .finally(() => {
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
      let imageUrl = habit.imageUrl;

      if (image) {
        imageUrl = await uploadImageToImageBB(imageFile);
      }

      const formData = {
        title,
        description,
        category,
        reminderTime,
        imageUrl,
        isPublic,
        userEmail: habit.userEmail,
        userName: habit.userName,
        createdAt: habit.createdAt,
        completionHistory: habit.completionHistory || [],
        currentStreak: habit.currentStreak || 0
      };

      updateHabitDetails(formData);
    } catch (err) {
      console.error('Error updating habit:', err);
      toast.error('Failed to update habit');
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Habit not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1085F1]/10 to-[#8129F1]/10 overflow-x-hidden" style={{ paddingTop: '48px', paddingBottom: '48px', paddingLeft: '12px', paddingRight: '12px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
        style={{ maxWidth: '672px' }}
      >
        <div className="card-bg shadow-2xl rounded-2xl">
          <div className="card-body p-8">
            <h2 className="text-4xl font-bold text-center mb-2 text-[#1085F1]">Update Habit</h2>
            <p className="text-gray-600 text-center mb-8">Modify your habit details</p>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Habit Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Morning Meditation"
                  defaultValue={habit.title}
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                  required
                />
              </div>

              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Description *</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your habit and why it's important to you..."
                  defaultValue={habit.description}
                  className="textarea textarea-bordered w-full h-24 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Category *</span>
                </label>
                <select 
                  name="category" 
                  defaultValue={habit.category}
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

              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Reminder Time *</span>
                </label>
                <input
                  type="time"
                  name="reminderTime"
                  defaultValue={habit.reminderTime}
                  className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all"
                  required
                />
              </div>

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
                ) : habit.imageUrl ? (
                  <div className="mt-4">
                    <img
                      src={habit.imageUrl}
                      alt="Current"
                      className="w-full max-w-xs rounded-xl shadow-lg mx-auto"
                    />
                  </div>
                ) : null}
              </div>

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

              <div className="flex items-center gap-3 py-4">
                <input
                  type="checkbox"
                  name="isPublic"
                  className="checkbox checkbox-primary"
                  defaultChecked={habit.isPublic}
                  id="isPublic"
                />
                <label htmlFor="isPublic" className="text-lg font-semibold cursor-pointer">
                  Make this habit public (visible to others)
                </label>
              </div>

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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateHabit;
