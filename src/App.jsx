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
        <div className="min-h-screen relative overflow-hidden">
          {/* Animated background elements - Responsive */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-20 left-1/2 sm:top-40 w-40 h-40 sm:w-80 sm:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
          </div>

          {/* Main content - Responsive container */}
          <div className="relative z-10 w-full min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
              <header className="text-center mb-8 sm:mb-12 animate-bounce-in">
                <div className="inline-block p-2 mb-2 sm:mb-4">
                  <div className="text-4xl sm:text-6xl mb-2">🧠</div>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 sm:mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    QuizMaster
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-medium px-4">
                  Challenge Your Mind • Test Your Knowledge
                </p>
                <div className="mt-2 sm:mt-4 flex justify-center">
                  <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </div>
              </header>
              
              <main className="animate-slide-in-right">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/results" element={<Results />} />
                </Routes>
              </main>

              {/* Footer - Responsive */}
              <footer className="text-center mt-8 sm:mt-16 text-white/60">
                <p className="text-sm">Made with ❤️ for knowledge seekers</p>
              </footer>
            </div>
          </div>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
