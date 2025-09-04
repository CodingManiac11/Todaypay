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
        // Time's up - auto submit current answer or skip
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
      // Submit current answer
      dispatch({ type: QUIZ_ACTIONS.ANSWER_QUESTION, payload: currentAnswer });
    }
    setIsAnswered(true);
    
    // Auto-advance after a short delay
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
    dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION });
    setCurrentAnswer(null);
    setIsAnswered(false);
  };

  const handlePreviousQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({ type: QUIZ_ACTIONS.PREVIOUS_QUESTION });
      setCurrentAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleFinishQuiz = () => {
    dispatch({ type: QUIZ_ACTIONS.COMPLETE_QUIZ });
  };

  const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;
  const currentQuestion = state.questions[state.currentQuestionIndex];

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-red-600/20 border border-red-600 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Error Loading Quiz</h2>
          <p className="text-red-300 mb-4">{state.error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-yellow-600/20 border border-yellow-600 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-yellow-300 mb-4">Please try selecting a different difficulty level.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <ProgressBar
        current={state.currentQuestionIndex}
        total={state.questions.length}
        timeRemaining={state.timeRemaining}
      />

      {/* Question Component */}
      <Question
        question={currentQuestion}
        onAnswer={handleAnswer}
        disabled={isAnswered}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePreviousQuestion}
          disabled={state.currentQuestionIndex === 0}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
        >
          ← Previous
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">
            Score: {state.score} / {state.userAnswers.length}
          </p>
          {isAnswered && (
            <p className="text-sm text-green-400 font-medium">
              ✓ Answer submitted
            </p>
          )}
        </div>

        {isLastQuestion ? (
          <button
            onClick={handleFinishQuiz}
            disabled={!isAnswered}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            Finish Quiz ✓
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={!isAnswered}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            Next →
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-sm text-gray-400">
        {!isAnswered && (
          <p>Select an answer to continue. Timer will auto-submit when it reaches zero.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
