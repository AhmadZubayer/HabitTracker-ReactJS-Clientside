import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Banner from '../components/Banner';
import HabitCard from '../components/HabitCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { 
  FaBullseye, 
  FaChartLine, 
  FaUsers, 
  FaTrophy,
  FaCheckCircle,
  FaBrain,
  FaHeart,
  FaClock,
  FaPlus,
  FaEye
} from 'react-icons/fa';
import { MdOutlineTaskAlt } from 'react-icons/md';

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [featuredHabits, setFeaturedHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch 4 newest public habits
    axiosSecure.get('/habits/public?limit=4')
      .then(res => {
        setFeaturedHabits(res.data);
      })
      .catch(err => {
        console.error('Error loading featured habits:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="overflow-x-hidden">
      <Banner />

      <section className="bg-base-100" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="w-full" style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '12px', paddingRight: '12px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Habits</h2>
            <p className="text-lg text-gray-600">Discover popular habits from our community</p>
          </motion.div>

          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredHabits.length > 0 ? (
                featuredHabits.map((habit) => (
                  <HabitCard key={habit._id} habit={habit} variants={itemVariants} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-xl text-gray-600">No habits yet. Be the first to create one!</p>
                  <Link to="/add-habit" className="btn btn-primary mt-4">
                    <FaPlus /> Create Your First Habit
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Build Habits?</h2>
            <p className="text-lg text-gray-600">Discover the power of consistent daily actions</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="card bg-base-100 shadow-lg rounded-3xl p-6 text-center">
              <FaBullseye className="text-6xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Clear Goals</h3>
              <p className="text-gray-600">
                Define and track specific, measurable goals for personal growth
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="card bg-base-100 shadow-lg rounded-3xl p-6 text-center">
              <FaChartLine className="text-6xl text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your consistency and see your improvements over time
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="card bg-base-100 shadow-lg rounded-3xl p-6 text-center">
              <FaTrophy className="text-6xl text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Achieve Success</h3>
              <p className="text-gray-600">
                Build momentum and celebrate milestones on your journey
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="card bg-base-100 shadow-lg rounded-3xl p-6 text-center">
              <FaUsers className="text-6xl text-info mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Get inspired by others and share your progress with the community
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">Real results from real people</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="card bg-base-200 shadow-xl rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=1" alt="User" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Fitness Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Thanks to HabitTracker, I maintained my morning workout routine for 180 days straight! 
                It changed my life completely."
              </p>
              <div className="mt-4">
                <span className="badge badge-success text-white">180-day streak</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card bg-base-200 shadow-xl rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=12" alt="User" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Building a daily reading habit was impossible until I found this app. 
                Now I've read 52 books in a year!"
              </p>
              <div className="mt-4">
                <span className="badge badge-success text-white">365-day streak</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card bg-base-200 shadow-xl rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src="https://i.pravatar.cc/150?img=5" alt="User" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-600">Teacher</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The streak tracking keeps me motivated. I've successfully built 5 new habits 
                that improved my productivity tremendously."
              </p>
              <div className="mt-4">
                <span className="badge badge-success text-white">120-day streak</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Start building better habits in 3 simple steps</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-10">
                  1
                </div>
                <img 
                  src="/home-imgs/createHabit.png" 
                  alt="Create Your Habit" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Create Your Habit</h3>
                <p className="text-gray-600">
                  Define what habit you want to build, set a category, and choose a reminder time
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-10">
                  2
                </div>
                <img 
                  src="/home-imgs/completeDaily.png" 
                  alt="Track Daily" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Track Daily</h3>
                <p className="text-gray-600">
                  Mark your habit complete each day and watch your streak grow
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-10">
                  3
                </div>
                <img 
                  src="/home-imgs/viewStreak.png" 
                  alt="Build Consistency" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Build Consistency</h3>
                <p className="text-gray-600">
                  See your progress, celebrate milestones, and make habits stick
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/signup" className="btn btn-primary btn-lg">
              Start Your Journey Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
