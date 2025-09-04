import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Quiz App
              </h1>
              <p className="text-xl mt-2 text-gray-300">Test Your Knowledge</p>
            </header>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
