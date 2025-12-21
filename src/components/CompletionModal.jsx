import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const CompletionModal = ({ isOpen, onClose, streak, habitTitle }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl w-80 h-80 flex flex-col items-center justify-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Animated Checkmark Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="relative mb-4"
            >
              {/* Outer Circle */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center"
              >
                {/* Inner Circle with Checkmark */}
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                  className="w-16 h-16"
                  viewBox="0 0 52 52"
                >
                  <motion.path
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 27l8 8 16-16"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Pulsing rings */}
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-green-400"
              />
            </motion.div>

            {/* Congratulations Text */}
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-2xl font-bold text-green-600 mb-2 text-center px-8"
            >
              Congratulations! 🎉
            </motion.h3>

            {/* Habit Title */}
            {habitTitle && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-sm text-gray-600 mb-4 text-center px-8 line-clamp-2"
              >
                {habitTitle}
              </motion.p>
            )}

            {/* Streak Count */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: 1.6, duration: 0.5, repeat: 2 }}
                className="text-5xl font-bold text-green-600 mb-1"
              >
                {streak}
              </motion.div>
              <p className="text-gray-600 font-medium">
                Day{streak !== 1 ? 's' : ''} Streak 🔥
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompletionModal;
