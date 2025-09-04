import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz, QUIZ_ACTIONS } from '../context/QuizContext';
import questionsData from '../data/questions.json';

const Home = () => {
  const { state, dispatch } = useQuiz();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  useEffect(() => {
    // Load questions on component mount
    dispatch({ type: QUIZ_ACTIONS.SET_LOADING, payload: true });
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredQuestions = questionsData.questions;
      
      // Filter by difficulty if not 'all'
      if (state.difficulty !== 'all') {
        filteredQuestions = questionsData.questions.filter(
          q => q.difficulty === state.difficulty
        );
      }
      
      dispatch({ type: QUIZ_ACTIONS.SET_QUESTIONS, payload: filteredQuestions });
    }, 500);
  }, [dispatch, state.difficulty]);

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    dispatch({ type: QUIZ_ACTIONS.SET_DIFFICULTY, payload: difficulty });
  };

  const getDifficultyConfig = (difficulty) => {
    const configs = {
      all: { 
        color: 'from-purple-500 to-indigo-600', 
        icon: '🌟', 
        label: 'All Levels',
        description: 'Mixed difficulty questions'
      },
      easy: { 
        color: 'from-green-500 to-emerald-600', 
        icon: '🌱', 
        label: 'Easy',
        description: 'Perfect for beginners'
      },
      medium: { 
        color: 'from-yellow-500 to-orange-600', 
        icon: '⚡', 
        label: 'Medium',
        description: 'Good challenge level'
      },
      hard: { 
        color: 'from-red-500 to-pink-600', 
        icon: '🔥', 
        label: 'Hard',
        description: 'For quiz masters'
      }
    };
    return configs[difficulty];
  };

  const getQuestionCount = () => {
    if (state.difficulty === 'all') return questionsData.questions.length;
    return questionsData.questions.filter(q => q.difficulty === state.difficulty).length;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* Welcome Section - Responsive */}
      <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl mb-6 sm:mb-8 quiz-card hover-lift">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-4xl sm:text-6xl mb-2 sm:mb-4 animate-float">🎯</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-white">
            Ready for the Challenge?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-2">
            Test your knowledge across various topics. Choose your difficulty level and see how much you really know!
          </p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-6 text-center hover-lift">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📚</div>
            <div className="text-lg sm:text-2xl font-bold text-white">{getQuestionCount()}</div>
            <div className="text-xs sm:text-sm text-white/70">Questions</div>
          </div>
          <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-6 text-center hover-lift">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⏱️</div>
            <div className="text-lg sm:text-2xl font-bold text-white">30s</div>
            <div className="text-xs sm:text-sm text-white/70">Per Question</div>
          </div>
          <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-6 text-center hover-lift">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🏆</div>
            <div className="text-lg sm:text-2xl font-bold text-white">∞</div>
            <div className="text-xs sm:text-sm text-white/70">Attempts</div>
          </div>
        </div>
      </div>

      {/* Difficulty Selection - Responsive */}
      <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl mb-6 sm:mb-8 quiz-card">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-white">
          Choose Your Challenge Level
        </h3>
        
        {/* Difficulty Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {['all', 'easy', 'medium', 'hard'].map((difficulty) => {
            const config = getDifficultyConfig(difficulty);
            const isSelected = selectedDifficulty === difficulty;
            
            return (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={`relative p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 option-button ${
                  isSelected
                    ? 'border-white shadow-lg scale-105 animate-pulse-glow'
                    : 'border-white/30 hover:border-white/60'
                }`}
                style={{
                  background: isSelected 
                    ? `linear-gradient(135deg, var(--tw-gradient-stops))` 
                    : 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl mb-1 sm:mb-3">{config.icon}</div>
                  <div className="text-sm sm:text-xl font-bold text-white mb-1">{config.label}</div>
                  <div className="text-xs sm:text-sm text-white/80 hidden sm:block">{config.description}</div>
                  {isSelected && (
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-white">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
                        ✓
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quiz Info - Responsive Grid */}
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="p-2">
              <div className="text-xl sm:text-3xl font-bold text-blue-400">{getQuestionCount()}</div>
              <div className="text-white/70 text-xs sm:text-sm">Total Questions</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-3xl font-bold text-purple-400">30s</div>
              <div className="text-white/70 text-xs sm:text-sm">Time Limit</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-3xl font-bold text-pink-400 capitalize">{selectedDifficulty}</div>
              <div className="text-white/70 text-xs sm:text-sm">Difficulty</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-3xl font-bold text-green-400">∞</div>
              <div className="text-white/70 text-xs sm:text-sm">Retries</div>
            </div>
          </div>
        </div>

        {/* Start Button - Responsive */}
        <div className="text-center">
          {state.isLoading ? (
            <div className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white/20 rounded-xl sm:rounded-2xl">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
              <span className="text-white font-medium text-sm sm:text-base">Loading Questions...</span>
            </div>
          ) : (
            <Link
              to="/quiz"
              className="inline-block group relative w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl text-white transform transition-all duration-200 group-hover:scale-105 hover-lift">
                <span className="flex items-center justify-center">
                  <span className="mr-2 sm:mr-3 text-lg sm:text-xl">🚀</span>
                  <span className="text-sm sm:text-lg">Start Quiz Challenge</span>
                  <span className="ml-2 sm:ml-3">→</span>
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Features List - Responsive */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
          <div className="flex items-center">
            <span className="mr-1 sm:mr-2">✨</span>
            <span className="truncate">Real-time scoring</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 sm:mr-2">📊</span>
            <span className="truncate">Detailed results</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 sm:mr-2">🎮</span>
            <span className="truncate">Interactive UI</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1 sm:mr-2">📱</span>
            <span className="truncate">Mobile ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
