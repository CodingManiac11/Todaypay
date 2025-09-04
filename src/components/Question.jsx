import React, { useState } from 'react';

const Question = ({ question, onAnswer, disabled = false }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (optionIndex) => {
    if (disabled) return;
    setSelectedOption(optionIndex);
    onAnswer(optionIndex);
  };

  const getOptionStyle = (optionIndex) => {
    let baseStyle = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 transform hover:scale-102 ";
    
    if (disabled) {
      baseStyle += "cursor-not-allowed opacity-60 ";
    } else {
      baseStyle += "cursor-pointer hover:shadow-lg ";
    }

    if (selectedOption === optionIndex) {
      baseStyle += "border-blue-500 bg-blue-600/20 shadow-lg scale-102 ";
    } else {
      baseStyle += "border-gray-600 bg-white/5 hover:border-gray-500 hover:bg-white/10 ";
    }

    return baseStyle;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600/20 text-green-400 border-green-400';
      case 'medium': return 'bg-yellow-600/20 text-yellow-400 border-yellow-400';
      case 'hard': return 'bg-red-600/20 text-red-400 border-red-400';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Difficulty Badge */}
        <div className="flex justify-center mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyBadge(question.difficulty)}`}>
            {question.difficulty.toUpperCase()}
          </span>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={getOptionStyle(index)}
              disabled={disabled}
            >
              <div className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium mr-4">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-lg">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selection Indicator */}
        {selectedOption !== null && (
          <div className="mt-6 text-center">
            <p className="text-blue-300 font-medium">
              Selected: Option {String.fromCharCode(65 + selectedOption)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
