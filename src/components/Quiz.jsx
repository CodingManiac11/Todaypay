import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz, QUIZ_ACTIONS } from '../context/QuizContext';
import Question from './Question';
import ProgressBar from './ProgressBar';

const Quiz = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  // Redirect to home if no questions loaded
  useEffect(() => {
    if (state.questions.length === 0 && !state.isLoading) {
      navigate('/');
    }
  }, [state.questions, state.isLoading, navigate]);

  // Timer effect
  useEffect(() => {
    if (state.isQuizCompleted || isAnswered) return;

    const timer = setInterval(() => {
      dispatch({ type: QUIZ_ACTIONS.SET_TIME_REMAINING, payload: state.timeRemaining - 1 });
      
      if (state.timeRemaining <= 1) {
        handleTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeRemaining, state.isQuizCompleted, isAnswered, dispatch]);

  // Check if quiz is completed
  useEffect(() => {
    if (state.isQuizCompleted) {
      navigate('/results');
    }
  }, [state.isQuizCompleted, navigate]);

  const handleTimeUp = () => {
    if (currentAnswer !== null) {
      dispatch({ type: QUIZ_ACTIONS.ANSWER_QUESTION, payload: currentAnswer });
    }
    setIsAnswered(true);
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;
    
    setCurrentAnswer(optionIndex);
    dispatch({ type: QUIZ_ACTIONS.ANSWER_QUESTION, payload: optionIndex });
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setShowTransition(true);
    
    setTimeout(() => {
      dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION });
      setCurrentAnswer(null);
      setIsAnswered(false);
      setShowTransition(false);
    }, 300);
  };

  const handlePreviousQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      setShowTransition(true);
      
      setTimeout(() => {
        dispatch({ type: QUIZ_ACTIONS.PREVIOUS_QUESTION });
        setCurrentAnswer(null);
        setIsAnswered(false);
        setShowTransition(false);
      }, 300);
    }
  };

  const handleFinishQuiz = () => {
    dispatch({ type: QUIZ_ACTIONS.COMPLETE_QUIZ });
  };

  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  const currentQuestion = state.questions[state.currentQuestionIndex];

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500 mx-auto" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Your Quiz...</h2>
          <p className="text-white/60">Preparing questions just for you</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass rounded-3xl p-8 border-2 border-red-500/30">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-3xl font-bold mb-4 text-white">Oops! Something went wrong</h2>
          <p className="text-red-300 mb-6 text-lg">{state.error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-2xl font-bold text-white transition-all duration-200 transform hover:scale-105"
          >
            🏠 Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass rounded-3xl p-8 border-2 border-yellow-500/30">
          <div className="text-6xl mb-4">🤔</div>
          <h2 className="text-3xl font-bold mb-4 text-white">No Questions Available</h2>
          <p className="text-yellow-300 mb-6 text-lg">Try selecting a different difficulty level.</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-2xl font-bold text-white transition-all duration-200 transform hover:scale-105"
          >
            🔄 Choose Different Level
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress Bar */}
      <ProgressBar
        current={state.currentQuestionIndex}
        total={state.questions.length}
        timeRemaining={state.timeRemaining}
      />

      {/* Question Component with Transition - Responsive */}
      <div className={`transition-all duration-300 ${showTransition ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        <Question
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabled={isAnswered}
        />
      </div>

      {/* Navigation and Status - Responsive */}
      <div className="mt-6 sm:mt-8">
        <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Previous Button - Responsive */}
            <button
              onClick={handlePreviousQuestion}
              disabled={state.currentQuestionIndex === 0}
              className="group px-4 sm:px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 disabled:from-gray-800 disabled:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 w-full lg:w-auto"
            >
              <span className="flex items-center justify-center text-white text-sm sm:text-base">
                <span className="mr-2 group-hover:animate-bounce-in">←</span>
                Previous
              </span>
            </button>

            {/* Status Display - Responsive */}
            <div className="text-center px-2 sm:px-6 w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-2">
                <div className="flex items-center">
                  <span className="text-blue-400 text-xl sm:text-2xl font-bold">{state.score}</span>
                  <span className="text-white/60 ml-1 text-sm sm:text-base">/ {state.userAnswers.length}</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/20"></div>
                <div className="text-white/80 text-sm sm:text-base">
                  <span className="text-xs sm:text-sm">Accuracy: </span>
                  <span className="font-bold">
                    {state.userAnswers.length > 0 ? Math.round((state.score / state.userAnswers.length) * 100) : 0}%
                  </span>
                </div>
              </div>
              
              {isAnswered && (
                <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg sm:rounded-xl animate-bounce-in">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-white text-xs sm:text-sm font-medium">Answer locked in!</span>
                </div>
              )}
            </div>

            {/* Next/Finish Button - Responsive */}
            {isLastQuestion ? (
              <button
                onClick={handleFinishQuiz}
                disabled={!isAnswered}
                className="group px-4 sm:px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-800 disabled:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg sm:rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg w-full lg:w-auto"
              >
                <span className="flex items-center justify-center text-white text-sm sm:text-base">
                  <span className="mr-2">🏁</span>
                  Finish Quiz
                  <span className="ml-2 group-hover:animate-bounce-in">✓</span>
                </span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                className="group px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-800 disabled:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 w-full lg:w-auto"
              >
                <span className="flex items-center justify-center text-white text-sm sm:text-base">
                  Next
                  <span className="ml-2 group-hover:animate-bounce-in">→</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Instructions - Responsive */}
      <div className="mt-4 sm:mt-6 text-center px-4 sm:px-0">
        {!isAnswered ? (
          <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
            <p className="text-white/70 text-xs sm:text-sm">
              💡 Select an answer to continue • Timer auto-submits at zero
            </p>
          </div>
        ) : (
          <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
            <p className="text-green-400 text-xs sm:text-sm font-medium">
              🎉 Great! Click Next to continue or wait for auto-advance
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
