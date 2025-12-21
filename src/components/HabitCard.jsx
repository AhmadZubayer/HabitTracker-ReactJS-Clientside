import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaTrophy, FaEye } from 'react-icons/fa';

const HabitCard = ({ habit, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Habit Image */}
      <figure className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20">
        <img
          src={habit.imageUrl || '/default-habit-img/51359.jpg'}
          alt={habit.title}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body p-3">
        {/* Habit Title */}
        <h3 className="card-title text-sm font-bold line-clamp-2 min-h-[2.5rem]">
          {habit.title}
        </h3>

        {/* Rating/Streak Section */}
        <div className="flex items-center gap-2 my-1">
          <div className="flex items-center gap-1">
            <span className="text-base font-bold">{habit.currentStreak || 0}</span>
            <FaTrophy className="text-warning text-sm" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          <span className="text-xs text-gray-500">{habit.category}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {habit.description}
        </p>

        {/* See Details Button */}
        <Link
          to={`/habit/${habit._id}`}
          className="btn btn-xs btn-outline btn-primary w-full rounded-lg"
        >
          <FaEye className="mr-1" />
          See Details
        </Link>
      </div>
    </motion.div>
  );
};

export default HabitCard;
