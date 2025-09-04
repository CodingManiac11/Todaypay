import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz, QUIZ_ACTIONS } from '../context/QuizContext';
import questionsData from '../data/questions.json';

const Home = () => {
  const { state, dispatch } = useQuiz();

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
    dispatch({ type: QUIZ_ACTIONS.SET_DIFFICULTY, payload: difficulty });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600 hover:bg-green-700';
      case 'medium': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'hard': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-purple-600 hover:bg-purple-700';
    }
  };

  const getQuestionCount = () => {
    if (state.difficulty === 'all') return questionsData.questions.length;
    return questionsData.questions.filter(q => q.difficulty === state.difficulty).length;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Welcome to the Quiz!</h2>
          <p className="text-gray-300 text-lg">
            Test your knowledge with our interactive quiz. Choose your difficulty level and get started!
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Select Difficulty Level</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                  state.difficulty === difficulty
                    ? getDifficultyColor(difficulty)
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="bg-blue-600/20 rounded-lg p-4 mb-6">
            <h4 className="text-lg font-semibold mb-2">Quiz Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="block text-blue-300">Questions</span>
                <span className="text-xl font-bold">{getQuestionCount()}</span>
              </div>
              <div>
                <span className="block text-blue-300">Time per Question</span>
                <span className="text-xl font-bold">30s</span>
              </div>
              <div>
                <span className="block text-blue-300">Difficulty</span>
                <span className="text-xl font-bold capitalize">{state.difficulty}</span>
              </div>
            </div>
          </div>

          {state.isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-3">Loading questions...</span>
            </div>
          ) : (
            <Link
              to="/quiz"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Quiz 🚀
            </Link>
          )}
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>• Answer all questions to see your results</p>
          <p>• Each question has a 30-second timer</p>
          <p>• You can navigate between questions</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
