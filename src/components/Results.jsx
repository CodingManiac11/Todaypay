import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz, QUIZ_ACTIONS } from '../context/QuizContext';

const Results = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  // Redirect to home if no quiz data
  useEffect(() => {
    if (state.questions.length === 0 || !state.isQuizCompleted) {
      navigate('/');
    }
  }, [state.questions, state.isQuizCompleted, navigate]);

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
      
      // Keep only top 10 scores
      const topScores = highScores.slice(0, 10);
      localStorage.setItem('quizHighScores', JSON.stringify(topScores));
    }
  }, [state.isQuizCompleted, state.score, state.questions.length, state.difficulty]);

  const handleRestartQuiz = () => {
    dispatch({ type: QUIZ_ACTIONS.RESTART_QUIZ });
    navigate('/');
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 90) return '🏆 Outstanding! You\'re a quiz master!';
    if (percentage >= 80) return '🎉 Excellent work! Great knowledge!';
    if (percentage >= 70) return '👏 Good job! You did well!';
    if (percentage >= 60) return '👍 Not bad! Room for improvement!';
    if (percentage >= 50) return '📚 Keep studying! You can do better!';
    return '💪 Don\'t give up! Practice makes perfect!';
  };

  const percentage = Math.round((state.score / state.questions.length) * 100);

  const getAnswerResultIcon = (isCorrect) => {
    return isCorrect ? '✅' : '❌';
  };

  const getAnswerResultColor = (isCorrect) => {
    return isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10';
  };

  if (state.questions.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Score Summary */}
      <div className="text-center mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Quiz Complete!</h2>
          
          <div className="mb-6">
            <div className={`text-6xl md:text-8xl font-bold ${getScoreColor(percentage)} mb-2`}>
              {percentage}%
            </div>
            <div className="text-xl text-gray-300">
              {state.score} out of {state.questions.length} correct
            </div>
          </div>

          <div className="text-lg md:text-xl text-center mb-6">
            {getScoreMessage(percentage)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-600/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">{state.score}</div>
              <div className="text-sm text-gray-300">Correct Answers</div>
            </div>
            <div className="bg-purple-600/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400">{state.questions.length - state.score}</div>
              <div className="text-sm text-gray-300">Incorrect Answers</div>
            </div>
            <div className="bg-yellow-600/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400 capitalize">{state.difficulty}</div>
              <div className="text-sm text-gray-300">Difficulty Level</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestartQuiz}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Take Quiz Again
            </button>
            <Link
              to="/"
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors text-center"
            >
              Change Difficulty
            </Link>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-center">Detailed Results</h3>
        
        <div className="space-y-4">
          {state.questions.map((question, index) => {
            const userAnswer = state.userAnswers[index];
            const isCorrect = userAnswer?.isCorrect;
            
            return (
              <div
                key={question.id}
                className={`border rounded-lg p-4 ${getAnswerResultColor(isCorrect)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">
                      {getAnswerResultIcon(isCorrect)} Question {index + 1}
                    </h4>
                    <p className="text-gray-300 mb-3">{question.question}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    question.difficulty === 'easy' ? 'bg-green-600/20 text-green-400' :
                    question.difficulty === 'medium' ? 'bg-yellow-600/20 text-yellow-400' :
                    'bg-red-600/20 text-red-400'
                  }`}>
                    {question.difficulty.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-gray-400 mb-1">Your Answer:</span>
                    <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                      {userAnswer ? 
                        `${String.fromCharCode(65 + userAnswer.selectedAnswer)}: ${question.options[userAnswer.selectedAnswer]}` :
                        'No answer selected'
                      }
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-400 mb-1">Correct Answer:</span>
                    <span className="text-green-400">
                      {String.fromCharCode(65 + question.correctAnswer)}: {question.options[question.correctAnswer]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleRestartQuiz}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            Try Again 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
