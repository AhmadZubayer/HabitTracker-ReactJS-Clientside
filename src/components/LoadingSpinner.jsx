import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <span className={`loading loading-bars loading-${size}`}></span>
    </div>
  );
};

export default LoadingSpinner;
