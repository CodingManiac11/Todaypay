import React from 'react';

const ProgressBar = ({ current, total, timeRemaining }) => {
  const progressPercentage = ((current + 1) / total) * 100;
  const timePercentage = (timeRemaining / 30) * 100;

  const getTimeColor = () => {
    if (timeRemaining <= 5) return 'from-red-500 to-red-600';
    if (timeRemaining <= 10) return 'from-orange-500 to-red-500';
    if (timeRemaining <= 20) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  const getTimeGlow = () => {
    if (timeRemaining <= 5) return 'shadow-red-500/50';
    if (timeRemaining <= 10) return 'shadow-orange-500/50';
    return 'shadow-green-500/50';
  };

  return (
    <div className="w-full mb-6 sm:mb-8 px-2 sm:px-0">
      <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 quiz-card">
        {/* Header with Question Counter and Timer - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-4 sm:mb-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white font-bold text-sm sm:text-base">{current + 1}</span>
              </div>
              <div>
                <div className="text-white font-bold text-base sm:text-lg">
                  Question {current + 1}
                </div>
                <div className="text-white/60 text-xs sm:text-sm">
                  of {total} questions
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-center sm:text-right">
              <div className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                timeRemaining <= 10 ? 'text-red-400 animate-pulse' : 'text-white'
              }`}>
                {timeRemaining}s
              </div>
              <div className="text-white/60 text-xs sm:text-sm">remaining</div>
            </div>
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl ${
              timeRemaining <= 10 ? 'animate-pulse' : ''
            }`}>
              {timeRemaining > 20 ? '😊' : timeRemaining > 10 ? '😐' : timeRemaining > 5 ? '😰' : '😱'}
            </div>
          </div>
        </div>

        {/* Question Progress Bar - Responsive */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-medium text-white/80">Quiz Progress</span>
            <span className="text-xs sm:text-sm font-medium text-white/80">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress Steps - Responsive */}
            <div className="flex justify-between mt-1 sm:mt-2">
              {Array.from({ length: total }, (_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    i <= current 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg' 
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timer Progress Bar - Responsive */}
        <div>
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm font-medium text-white/80">Time Remaining</span>
            <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
              timeRemaining <= 10 ? 'text-red-400' : 'text-white/80'
            }`}>
              {timeRemaining <= 10 ? 'Hurry up!' : 'Take your time'}
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className={`h-2 sm:h-3 rounded-full transition-all duration-1000 ease-linear bg-gradient-to-r ${getTimeColor()} ${
                  timeRemaining <= 10 ? `shadow-lg ${getTimeGlow()} animate-pulse` : ''
                }`}
                style={{ width: `${timePercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>

            {/* Time Warning Indicator - Responsive */}
            {timeRemaining <= 10 && (
              <div className="absolute -top-6 sm:-top-8 right-0 transform -translate-x-1/2">
                <div className="bg-red-500 text-white px-1 sm:px-2 py-1 rounded text-xs font-bold animate-bounce">
                  ⚠️ {timeRemaining}s
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-3 sm:mt-4 text-xs text-white/60 space-y-1 sm:space-y-0">
          <span className="text-center sm:text-left">
            {current === 0 ? 'Just started!' : 
             current === total - 1 ? 'Final question!' : 
             'Keep going!'}
          </span>
          <span className="text-center sm:text-right">
            {timeRemaining <= 5 ? 'Time\'s almost up!' : 
             timeRemaining <= 15 ? 'Think quickly!' : 
             'You\'ve got time'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
