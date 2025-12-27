import React, { use, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { uploadImageToImageBB } from '../utils/imageUpload';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AddHabit = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study'];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;
    const isPublic = form.isPublic.checked;

    try {
      let imageUrl = '';
      
      
      if (imageFile) {
        imageUrl = await uploadImageToImageBB(imageFile);
      }

      
      const formData = {
        title,
        description,
        category,
        reminderTime,
        imageUrl,
        userName: user.displayName || 'Anonymous',
        userEmail: user.email,
        userPhotoURL: user.photoURL || '',
        isPublic
      };

     
      axiosSecure.post('/habits', formData)
        .then(res => {
          console.log(res);
          toast.success('Habit created successfully!');
          form.reset();
          setImagePreview(null);
          setImageFile(null);
          navigate('/my-habits');
        })
        .catch(err => {
          console.error('Error creating habit:', err);
          toast.error(err.response?.data?.message || 'Failed to create habit');
        });
    } catch (error) {
      console.error('Error creating habit:', error);
      toast.error(error.message || 'Failed to create habit');
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className="text-4xl font-bold text-center mb-2 text-[#1085F1]">Create New Habit</h2>
            <p className="text-gray-600 text-center mb-8">Start building a better habit today</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
            
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Habit Title *</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Morning Meditation"
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
                  className="textarea textarea-bordered w-full h-24 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all resize-none"
                  required
                ></textarea>
              </div>

          
              <div>
                <label className="label font-semibold text-gray-700">
                  <span className="label-text">Category *</span>
                </label>
                <select name="category" className="select select-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1085F1] transition-all" required>
                  <option value="">Select a category</option>
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
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-xs rounded-xl shadow-lg mx-auto"
                    />
                  </div>
                )}
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
                  defaultChecked
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
                      Creating Habit...
                    </>
                  ) : (
                    'Create Habit'
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

export default AddHabit;
