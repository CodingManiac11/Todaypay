import React, { useState, useEffect } from 'react';

const Question = ({ question, onAnswer, disabled = false }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset selection when question changes
    setSelectedOption(null);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [question.id]);

  const handleOptionSelect = (optionIndex) => {
    if (disabled) return;
    
    setSelectedOption(optionIndex);
    
    // Add visual feedback delay
    setTimeout(() => {
      onAnswer(optionIndex);
    }, 150);
  };

  const getOptionStyle = (optionIndex) => {
    let baseStyle = "w-full p-3 sm:p-4 md:p-6 text-left rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform relative overflow-hidden option-button ";
    
    if (disabled) {
      baseStyle += "cursor-not-allowed opacity-70 ";
    } else {
      baseStyle += "cursor-pointer hover:scale-102 hover:shadow-xl ";
    }

    if (selectedOption === optionIndex) {
      baseStyle += "border-blue-400 bg-gradient-to-r from-blue-600/30 to-purple-600/30 shadow-2xl scale-102 animate-pulse-glow ";
    } else {
      baseStyle += "border-white/20 glass hover:border-white/40 hover:shadow-lg ";
    }

    return baseStyle;
  };

  const getDifficultyConfig = (difficulty) => {
    const configs = {
      easy: { color: 'from-green-400 to-emerald-500', icon: '🌱', label: 'Easy' },
      medium: { color: 'from-yellow-400 to-orange-500', icon: '⚡', label: 'Medium' },
      hard: { color: 'from-red-400 to-pink-500', icon: '🔥', label: 'Hard' }
    };
    return configs[difficulty] || { color: 'from-gray-400 to-gray-500', icon: '❓', label: 'Unknown' };
  };

  const difficultyConfig = getDifficultyConfig(question.difficulty);

  return (
    <div className={`w-full max-w-5xl mx-auto px-2 sm:px-4 transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
      <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl quiz-card">
        {/* Question Header - Responsive */}
        <div className="text-center mb-6 sm:mb-8">
          {/* Difficulty Badge */}
          <div className="inline-flex items-center mb-4 sm:mb-6">
            <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r ${difficultyConfig.color} shadow-lg`}>
              <span className="mr-1 sm:mr-2">{difficultyConfig.icon}</span>
              {difficultyConfig.label}
            </div>
          </div>

          {/* Question Text - Responsive */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl blur opacity-25"></div>
            <div className="relative glass rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed text-white">
                {question.question}
              </h2>
            </div>
          </div>
        </div>

        {/* Options Grid - Responsive */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={getOptionStyle(index)}
              disabled={disabled}
            >
              <div className="flex items-center relative z-10 p-2 sm:p-0">
                {/* Option Letter - Responsive */}
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-sm sm:text-base md:text-lg font-bold mr-3 sm:mr-4 transition-all duration-300 ${
                  selectedOption === index 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-white/20 text-white/80'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                
                {/* Option Text - Responsive */}
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white flex-1 text-left">
                  {option}
                </span>

                {/* Selection Indicator - Responsive */}
                {selectedOption === index && (
                  <div className="flex-shrink-0 ml-2 sm:ml-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce-in">
                      <span className="text-white text-xs sm:text-sm">✓</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-xl sm:rounded-2xl"></div>
            </button>
          ))}
        </div>

        {/* Selection Status - Responsive */}
        <div className="text-center">
          {selectedOption !== null ? (
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl sm:rounded-2xl animate-bounce-in">
              <span className="text-green-400 mr-1 sm:mr-2">✓</span>
              <span className="text-white font-medium text-sm sm:text-base">
                Option {String.fromCharCode(65 + selectedOption)} selected
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl">
              <span className="text-yellow-400 mr-1 sm:mr-2">⏳</span>
              <span className="text-white/70 text-sm sm:text-base">
                Choose your answer above
              </span>
            </div>
          )}
        </div>

        {/* Visual Effects - Responsive */}
        {selectedOption !== null && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-1 h-1 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-1 h-1 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
