import React from 'react';

const ProgressBar = ({ current, total, timeRemaining }) => {
  const progressPercentage = ((current + 1) / total) * 100;
  const timePercentage = (timeRemaining / 30) * 100;

  return (
    <div className="w-full mb-6">
      {/* Question Progress */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-medium text-gray-300">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Timer */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">Time Remaining</span>
        <span className={`text-sm font-medium ${timeRemaining <= 10 ? 'text-red-400' : 'text-gray-300'}`}>
          {timeRemaining}s
        </span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-linear ${
            timeRemaining <= 10 ? 'bg-red-500' : timeRemaining <= 20 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${timePercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
