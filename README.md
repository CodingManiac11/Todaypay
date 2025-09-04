# Quiz App

A modern, interactive quiz application built with React, featuring multiple difficulty levels, timer functionality, and detailed results tracking.

## Features

### Core Features
- ✅ **Multiple Choice Questions**: 10 carefully crafted questions across different topics
- ✅ **Difficulty Levels**: Easy, Medium, Hard, or All questions
- ✅ **Timer**: 30-second countdown per question with auto-submit
- ✅ **Progress Tracking**: Visual progress bar and question counter
- ✅ **Score Calculation**: Real-time score tracking and final results
- ✅ **Detailed Results**: Review all questions with correct/incorrect answers
- ✅ **Responsive Design**: Works perfectly on desktop and mobile devices

### Bonus Features
- 🎯 **Progress Indicator**: Question progress and time remaining
- 🏆 **High Score Storage**: Persistent high scores using localStorage
- 🎨 **Smooth Animations**: Fade-in effects and button interactions
- ♿ **Accessibility**: Keyboard navigation and ARIA labels
- 🔄 **Quiz Restart**: Easy restart functionality
- 📱 **Mobile Responsive**: Optimized for all screen sizes

## Technology Stack

- **Frontend**: React 18 with Hooks (useState, useEffect, useReducer, useContext)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite
- **State Management**: React Context API with useReducer
- **Data**: Local JSON file (easily replaceable with API)

## Project Structure

```
src/
├── components/
│   ├── Home.jsx           # Landing page with difficulty selection
│   ├── Quiz.jsx           # Main quiz interface
│   ├── Question.jsx       # Individual question component
│   ├── Results.jsx        # Results and score display
│   └── ProgressBar.jsx    # Progress and timer visualization
├── context/
│   └── QuizContext.jsx    # Global state management
├── data/
│   └── questions.json     # Quiz questions data
├── App.jsx                # Main app with routing
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL shown in your terminal

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## How to Use

1. **Home Page**: Select your preferred difficulty level (Easy, Medium, Hard, or All)
2. **Quiz Page**: 
   - Read each question carefully
   - Select one of the four options
   - Watch the 30-second timer
   - Navigate between questions using Previous/Next buttons
3. **Results Page**: 
   - View your final score and percentage
   - Review all questions with detailed answers
   - Restart the quiz or change difficulty

## Features in Detail

### State Management
- Uses React Context API with useReducer for predictable state updates
- Manages quiz flow, user answers, score, and timer state
- Supports undo/redo navigation between questions

### Timer System
- 30-second countdown per question
- Auto-submit when time expires
- Visual feedback with color-coded progress bar
- Prevents rapid clicking and handles edge cases

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Smooth animations and transitions
- Touch-friendly interface on mobile devices
- Readable typography with Inter font

### Data Handling
- Easily configurable question format
- Support for different difficulty levels
- Normalized data structure for consistent UI
- Ready for API integration (replace local JSON)

## Customization

### Adding More Questions
Edit `src/data/questions.json`:
```json
{
  "id": 11,
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "difficulty": "medium"
}
```

### Changing Timer Duration
Modify the timer in `src/context/QuizContext.jsx`:
```javascript
timeRemaining: 45 // Change from 30 to 45 seconds
```

### API Integration
Replace the local JSON loading in `src/components/Home.jsx` with your API call:
```javascript
// Replace setTimeout with actual API call
const response = await fetch('your-api-endpoint');
const data = await response.json();
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight bundle size with Vite optimization
- Lazy loading and code splitting ready
- Efficient re-renders with React best practices
- Minimal dependencies for fast loading

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## Architecture Decisions

1. **React Context over Redux**: Simpler setup for this scope, easier to understand
2. **Local JSON over API**: Faster development, easily replaceable with API
3. **Tailwind CSS**: Rapid development, consistent design system
4. **Vite over CRA**: Faster build times and better development experience
5. **Functional Components**: Modern React patterns with hooks

## Future Enhancements

- [ ] Categories (Science, History, Sports, etc.)
- [ ] Multiplayer mode
- [ ] Question difficulty algorithm
- [ ] Audio feedback
- [ ] Dark/Light theme toggle
- [ ] Export results as PDF
- [ ] Social sharing features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or feedback, please open an issue in the repository.

---

**Enjoy testing your knowledge! 🧠✨**
