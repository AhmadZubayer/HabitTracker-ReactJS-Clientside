import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import HabitCard from '../components/HabitCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';

const BrowseHabits = () => {
  const axiosSecure = useAxiosSecure();
  const [habits, setHabits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  
  const categories = ['All', 'Morning', 'Work', 'Fitness', 'Evening', 'Study'];

  const loadHabits = React.useCallback(() => {
    setLoading(true);
    let url = '/habits/public';
    const params = new URLSearchParams();
    
    if (searchTerm) params.append('search', searchTerm);
    if (selectedCategory) params.append('category', selectedCategory);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    axiosSecure.get(url)
      .then(res => {
        setHabits(res.data);
      })
      .catch(err => {
        console.error('Error loading habits:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, selectedCategory, axiosSecure]);

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
    <div className="min-h-screen bg-base-200 overflow-x-hidden" style={{ paddingTop: '48px', paddingBottom: '48px', paddingLeft: '12px', paddingRight: '12px' }}>
      <div className="w-full" style={{ maxWidth: '1280px', margin: '0 auto' }}>
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
          <div className="bg-base-100 shadow-lg mb-8" style={{ padding: '24px', borderRadius: '24px' }}>
            {/* Search Bar */}
            <div className="form-control mb-4">
              <div className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Search habits by title or keyword..."
                  className="input input-bordered flex-1"
                  style={{ borderRadius: '50px', paddingLeft: '20px', paddingRight: '20px', height: '48px' }}
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button 
                  className="bg-primary hover:bg-primary-focus transition-colors rounded-full flex items-center justify-center"
                  style={{ width: '48px', height: '48px', minWidth: '48px' }}
                >
                  <FaSearch className="text-white" size={20} />
                </button>
              </div>
            </div>

            {/* Category Badges */}
            <div className="flex flex-wrap gap-2">
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

          {/* Habits Cards Grid */}
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : habits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No habits found matching your criteria.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {habits.map((habit) => (
                <HabitCard key={habit._id} habit={habit} variants={itemVariants} />
              ))}
            </motion.div>
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
