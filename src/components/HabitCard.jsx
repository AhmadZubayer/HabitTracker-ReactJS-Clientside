import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaTrophy, FaEye, FaStar } from 'react-icons/fa';
import { MdOutlineTaskAlt } from 'react-icons/md';

const HabitCard = ({ habit, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="card bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
      style={{ borderRadius: '20px' }}
    >
      {/* Habit Image/Banner */}
      <figure className="h-44 bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
        <img
          src={habit.imageUrl || '/default-habit-img/51359.jpg'}
          alt={habit.title}
          className="w-full h-full object-cover"
        />
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
              <span className="font-semibold">{habit.currentStreak || 0}</span>
              <FaStar className="text-yellow-500 text-xs" />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {habit.description}
        </p>

        {/* See Details Button */}
        <Link
          to={`/habit/${habit._id}`}
          className="btn btn-sm btn-outline btn-primary w-full"
          style={{ borderRadius: '8px' }}
        >
          See Details
        </Link>
      </div>
    </motion.div>
  );
};

export default HabitCard;
