import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

// Initial state
const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  score: 0,
  isQuizCompleted: false,
  isLoading: false,
  error: null,
  timeRemaining: 30,
  difficulty: 'all'
};

// Action types
export const QUIZ_ACTIONS = {
  SET_QUESTIONS: 'SET_QUESTIONS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  NEXT_QUESTION: 'NEXT_QUESTION',
  PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
  COMPLETE_QUIZ: 'COMPLETE_QUIZ',
  RESTART_QUIZ: 'RESTART_QUIZ',
  SET_TIME_REMAINING: 'SET_TIME_REMAINING',
  SET_DIFFICULTY: 'SET_DIFFICULTY'
};

// Reducer function
function quizReducer(state, action) {
  switch (action.type) {
    case QUIZ_ACTIONS.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null
      };
    
    case QUIZ_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case QUIZ_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case QUIZ_ACTIONS.ANSWER_QUESTION:
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = action.payload === currentQuestion.correctAnswer;
      
      return {
        ...state,
        userAnswers: [
          ...state.userAnswers,
          {
            questionId: currentQuestion.id,
            selectedAnswer: action.payload,
            correctAnswer: currentQuestion.correctAnswer,
            isCorrect
          }
        ],
        score: isCorrect ? state.score + 1 : state.score
      };
    
    case QUIZ_ACTIONS.NEXT_QUESTION:
      if (state.currentQuestionIndex === state.questions.length - 1) {
        return {
          ...state,
          isQuizCompleted: true,
          timeRemaining: 30
        };
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timeRemaining: 30
      };
    
    case QUIZ_ACTIONS.PREVIOUS_QUESTION:
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
        timeRemaining: 30
      };
    
    case QUIZ_ACTIONS.COMPLETE_QUIZ:
      return {
        ...state,
        isQuizCompleted: true
      };
    
    case QUIZ_ACTIONS.RESTART_QUIZ:
      return {
        ...initialState,
        questions: state.questions,
        difficulty: state.difficulty
      };
    
    case QUIZ_ACTIONS.SET_TIME_REMAINING:
      return {
        ...state,
        timeRemaining: action.payload
      };
    
    case QUIZ_ACTIONS.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload
      };
    
    default:
      return state;
  }
}

// Context Provider component
export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook to use Quiz context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
