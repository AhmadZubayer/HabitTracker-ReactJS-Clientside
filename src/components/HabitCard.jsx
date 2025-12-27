import React, { Suspense, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaTrophy, FaEye, FaChartLine } from 'react-icons/fa';
import { MdOutlineTaskAlt } from 'react-icons/md';

const HabitCard = ({ habit, variants }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div
      variants={variants}
      className="card bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
      style={{ borderRadius: '20px' }}
    >
      {/* Habit Image/Banner */}
      <figure className="h-44 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
            <span className="loading loading-bars loading-md"></span>
          </div>
        )}
        <img
          src={habit.imageUrl || '/default-habit-img/51359.jpg'}
          alt={habit.title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-50"
          onLoad={() => setImageLoading(false)}
          style={{ display: imageLoading ? 'none' : 'block' }}
        />
        {/* Hover Description Overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm text-center line-clamp-6">
            {habit.description}
          </p>
        </div>
      </figure>

      {/* Card Body */}
      <div style={{ padding: '16px' }}>
        {/* Habit Icon and Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <MdOutlineTaskAlt className="text-blue-600 text-2xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base line-clamp-1 mb-1">
              {habit.title}
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <FaChartLine className="text-green-500 text-xs" />
              <span className="font-semibold">{habit.currentStreak || 0}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/habit/${habit._id}`}
          className="btn-secondary w-full text-center flex items-center justify-center"
        >
          See Details
        </Link>
      </div>
    </motion.div>
  );
};

export default HabitCard;
