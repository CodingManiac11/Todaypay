import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz, QUIZ_ACTIONS } from '../context/QuizContext';

const Results = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);

  // Redirect to home if no quiz data
  useEffect(() => {
    if (state.questions.length === 0 || !state.isQuizCompleted) {
      navigate('/');
    }
  }, [state.questions, state.isQuizCompleted, navigate]);

  // Trigger animations
  useEffect(() => {
    if (state.isQuizCompleted) {
      const timer1 = setTimeout(() => setAnimateScore(true), 500);
      const timer2 = setTimeout(() => setShowConfetti(true), 1000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [state.isQuizCompleted]);

  // Save high score to localStorage
  useEffect(() => {
    if (state.isQuizCompleted) {
      const highScores = JSON.parse(localStorage.getItem('quizHighScores') || '[]');
      const newScore = {
        score: state.score,
        total: state.questions.length,
        percentage: Math.round((state.score / state.questions.length) * 100),
        difficulty: state.difficulty,
        date: new Date().toISOString()
      };
      
      highScores.push(newScore);
      highScores.sort((a, b) => b.percentage - a.percentage);
      
      const topScores = highScores.slice(0, 10);
      localStorage.setItem('quizHighScores', JSON.stringify(topScores));
    }
  }, [state.isQuizCompleted, state.score, state.questions.length, state.difficulty]);

  const handleRestartQuiz = () => {
    dispatch({ type: QUIZ_ACTIONS.RESTART_QUIZ });
    navigate('/');
  };

  const getScoreConfig = (percentage) => {
    if (percentage >= 90) return {
      color: 'from-green-400 to-emerald-500',
      emoji: '🏆',
      title: 'OUTSTANDING!',
      message: 'You\'re a true quiz master! Incredible performance!',
      celebration: '🎉🎊✨'
    };
    if (percentage >= 80) return {
      color: 'from-blue-400 to-cyan-500',
      emoji: '🌟',
      title: 'EXCELLENT!',
      message: 'Fantastic work! You really know your stuff!',
      celebration: '🎉⭐'
    };
    if (percentage >= 70) return {
      color: 'from-purple-400 to-pink-500',
      emoji: '👏',
      title: 'GOOD JOB!',
      message: 'Well done! You performed really well!',
      celebration: '👏🎯'
    };
    if (percentage >= 60) return {
      color: 'from-yellow-400 to-orange-500',
      emoji: '👍',
      title: 'NOT BAD!',
      message: 'Good effort! There\'s room for improvement!',
      celebration: '👍📚'
    };
    if (percentage >= 50) return {
      color: 'from-orange-400 to-red-500',
      emoji: '📚',
      title: 'KEEP STUDYING!',
      message: 'You can do better! Practice makes perfect!',
      celebration: '📚💪'
    };
    return {
      color: 'from-red-400 to-pink-500',
      emoji: '💪',
      title: 'DON\'T GIVE UP!',
      message: 'Every expert was once a beginner. Keep trying!',
      celebration: '💪🔥'
    };
  };

  const percentage = Math.round((state.score / state.questions.length) * 100);
  const scoreConfig = getScoreConfig(percentage);

  const getAnswerResultIcon = (isCorrect) => {
    return isCorrect ? '✅' : '❌';
  };

  const getAnswerResultColor = (isCorrect) => {
    return isCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10';
  };

  if (state.questions.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto relative px-4 sm:px-6 lg:px-8">
      {/* Confetti Effect */}
      {showConfetti && percentage >= 70 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '⭐', '✨', '🏆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Main Results Card - Responsive */}
      <div className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl mb-6 sm:mb-8 quiz-card hover-lift animate-bounce-in">
        <div className="text-center mb-6 sm:mb-8">
          {/* Celebration Icon - Responsive */}
          <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 animate-float">
            {scoreConfig.emoji}
          </div>

          {/* Title - Responsive */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 text-white">
            {scoreConfig.title}
          </h2>
          
          {/* Score Display - Responsive */}
          <div className={`transition-all duration-1000 ${animateScore ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-3 sm:mb-4 bg-gradient-to-r ${scoreConfig.color} bg-clip-text text-transparent animate-pulse-glow`}>
              {percentage}%
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 mb-2">
              {state.score} out of {state.questions.length} correct
            </div>
          </div>

          {/* Message - Responsive */}
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
            {scoreConfig.message}
          </div>

          {/* Celebration Icons - Responsive */}
          <div className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8 animate-bounce">
            {scoreConfig.celebration}
          </div>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="glass rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center hover-lift">
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">✅</div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400">{state.score}</div>
            <div className="text-white/70 text-xs sm:text-sm">Correct</div>
          </div>
          <div className="glass rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center hover-lift">
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">❌</div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-400">{state.questions.length - state.score}</div>
            <div className="text-white/70 text-xs sm:text-sm">Incorrect</div>
          </div>
          <div className="glass rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center hover-lift">
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">🎯</div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400">{percentage}%</div>
            <div className="text-white/70 text-xs sm:text-sm">Accuracy</div>
          </div>
          <div className="glass rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 text-center hover-lift">
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">⚡</div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 capitalize">{state.difficulty}</div>
            <div className="text-white/70 text-xs sm:text-sm">Level</div>
          </div>
        </div>

        {/* Action Buttons - Responsive */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={handleRestartQuiz}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg text-white transition-all duration-200 transform hover:scale-105 hover-lift shadow-lg"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2 sm:mr-3 group-hover:animate-spin">🔄</span>
              Take Quiz Again
            </span>
          </button>
          <Link
            to="/"
            className="group px-6 sm:px-8 py-3 sm:py-4 glass hover:bg-white/20 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg text-white transition-all duration-200 transform hover:scale-105 hover-lift text-center"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2 sm:mr-3">🏠</span>
              Change Difficulty
            </span>
          </Link>
        </div>
      </div>

      {/* Detailed Results - Responsive */}
      <div className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl quiz-card">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="text-2xl sm:text-3xl">📊</div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left">Detailed Review</h3>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          {state.questions.map((question, index) => {
            const userAnswer = state.userAnswers[index];
            const isCorrect = userAnswer?.isCorrect;
            
            return (
              <div
                key={question.id}
                className={`glass border-2 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-102 ${getAnswerResultColor(isCorrect)}`}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 space-y-2 sm:space-y-0 sm:space-x-3">
                      <div className="flex items-center">
                        <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">{getAnswerResultIcon(isCorrect)}</span>
                        <h4 className="font-bold text-lg sm:text-xl text-white">
                          Question {index + 1}
                        </h4>
                      </div>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold self-start sm:ml-auto ${
                        question.difficulty === 'easy' ? 'bg-green-600/30 text-green-400' :
                        question.difficulty === 'medium' ? 'bg-yellow-600/30 text-yellow-400' :
                        'bg-red-600/30 text-red-400'
                      }`}>
                        {question.difficulty.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 leading-relaxed">{question.question}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <span className="block text-white/60 text-xs sm:text-sm mb-2">Your Answer:</span>
                    <div className={`text-sm sm:text-base lg:text-lg font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {userAnswer ? (
                        <span className="flex items-center">
                          <span className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 flex-shrink-0">
                            {String.fromCharCode(65 + userAnswer.selectedAnswer)}
                          </span>
                          <span className="break-words">{question.options[userAnswer.selectedAnswer]}</span>
                        </span>
                      ) : (
                        <span className="text-gray-400">No answer selected</span>
                      )}
                    </div>
                  </div>
                  <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <span className="block text-white/60 text-xs sm:text-sm mb-2">Correct Answer:</span>
                    <div className="text-green-400 text-sm sm:text-base lg:text-lg font-medium">
                      <span className="flex items-center">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600/30 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 flex-shrink-0">
                          {String.fromCharCode(65 + question.correctAnswer)}
                        </span>
                        <span className="break-words">{question.options[question.correctAnswer]}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Call to Action - Responsive */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">Ready for Another Challenge?</h4>
            <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">Keep practicing to improve your knowledge and score even higher!</p>
            <button
              onClick={handleRestartQuiz}
              className="group px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg lg:text-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2 sm:mr-3 text-lg sm:text-xl lg:text-2xl group-hover:animate-bounce">🚀</span>
                Start New Quiz
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
