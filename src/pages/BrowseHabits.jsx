import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaSearch, FaTrophy, FaEye } from 'react-icons/fa';
import { MdOutlineTaskAlt } from 'react-icons/md';
import axios from 'axios';

const BrowseHabits = () => {
  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = ['All', 'Morning', 'Work', 'Fitness', 'Evening', 'Study'];

  const loadHabits = React.useCallback(() => {
    let url = 'http://localhost:3000/habits/public';
    const params = new URLSearchParams();
    
    if (searchTerm) params.append('search', searchTerm);
    if (selectedCategory) params.append('category', selectedCategory);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    axios.get(url)
      .then(res => {
        setHabits(res.data);
      })
      .catch(err => {
        console.error('Error loading habits:', err);
      });
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === 'All' ? '' : category);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Browse Public Habits</h2>
          <p className="text-center text-lg text-gray-600 mb-8">
            Discover and get inspired by habits from our community
          </p>

          {/* Search and Filter Section */}
          <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="form-control flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search habits by title or keyword..."
                    className="input input-bordered w-full rounded-xl pr-12"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <button className="btn btn-primary btn-circle absolute right-2 top-1/2 -translate-y-1/2">
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="form-control md:w-48">
                <select
                  className="select select-bordered rounded-xl"
                  value={selectedCategory || 'All'}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`badge badge-lg cursor-pointer transition-all rounded-full ${
                    (cat === 'All' && !selectedCategory) || selectedCategory === cat
                      ? 'badge-primary'
                      : 'badge-outline hover:badge-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Habits Table */}
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No habits found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-base-100 rounded-3xl shadow-xl">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Habit</th>
                    <th>Category</th>
                    <th>Streak</th>
                    <th>Creator</th>
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
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <FaTrophy className="text-warning text-xl" />
                          <span className="font-bold text-lg">🔥 {habit.currentStreak}</span>
                          <span className="text-sm text-gray-500">days</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="w-8 rounded-full">
                              <img
                                src={habit.userPhotoURL || 'https://via.placeholder.com/40'}
                                alt={habit.userName}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{habit.userName}</div>
                            <div className="text-xs text-gray-500">{habit.userEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Link 
                          to={`/habit/${habit._id}`} 
                          className="inline-flex items-center gap-2 p-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <FaEye className="text-lg" />
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Results Count */}
          <div className="text-center mt-8">
            <p className="text-lg text-gray-600">
              Showing <span className="font-bold">{habits.length}</span> habit{habits.length !== 1 ? 's' : ''}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseHabits;
