# 🎮 GameAI - AI-Powered Gaming Discovery Platform

An intelligent gaming platform that uses advanced AI to discover, recommend, and showcase games with real-time data and dynamic content generation.

![GameAI Platform](https://img.shields.io/badge/Platform-Gaming-blue)
![AI Powered](https://img.shields.io/badge/AI-Powered-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)

## 🌟 Features

### 🤖 AI-Powered Game Discovery
- **Dynamic Game Generation**: AI creates fresh game recommendations every time
- **Real-time Content**: Games, ratings, and data that change based on time of day
- **Intelligent Matching**: Smart algorithms match games to user preferences
- **Trending Analysis**: AI determines what games are "hot" right now

### 🎯 Smart Recommendations
- **Time-Aware Suggestions**: Different games for morning, afternoon, evening, and night
- **Seasonal Themes**: Content adapts to seasons and current events
- **Personal Preferences**: AI learns and suggests based on user behavior
- **Community Insights**: Real-time player counts and community ratings

### 🖼️ Real Game Images
- **Authentic Cover Art**: Real game covers from official sources
- **Smart Image Matching**: Advanced algorithms find the right images
- **Fallback System**: Multiple layers ensure images always display
- **Dynamic Loading**: Optimized image loading with visual feedback

### 📊 Live Game Data
- **Real-time Insights**: Current player counts, trending status
- **Community Ratings**: Live community scores and reviews
- **Price Tracking**: Current prices, sales, and price history
- **System Requirements**: Dynamic hardware requirements
- **Download Links**: Direct links to Steam, Epic Games, GOG

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on all devices
- **Dark Theme**: Beautiful dark interface optimized for gaming
- **Smooth Animations**: Fluid transitions and hover effects
- **Interactive Elements**: Engaging buttons, cards, and components

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gameai-platform.git
   cd gameai-platform
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create backend environment file
   cd backend
   cp .env.example .env
   ```

   Add your API keys to `backend/.env`:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the application**
   ```bash
   # Start backend server (from backend directory)
   npm start

   # Start frontend development server (from frontend directory)
   cd ../frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the platform in action!

## 🏗️ Project Structure

```
gameai-platform/
├── backend/                 # Node.js/Express API server
│   ├── routes/
│   │   └── ai.js           # AI-powered game generation
│   ├── .env                # Environment variables (not in repo)
│   ├── server.js           # Express server setup
│   └── package.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── GameCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── AIGameAnalysis.jsx
│   │   ├── pages/          # Main page components
│   │   │   ├── Home.jsx
│   │   │   ├── GameDetail.jsx
│   │   │   └── LandingHome.jsx
│   │   ├── utils/          # Utility functions
│   │   │   ├── imageGeneration.js
│   │   │   └── placeholderImage.js
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── public/             # Static assets
│   ├── index.html          # HTML template
│   └── package.json
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Database Configuration
# DATABASE_URL=your_database_url_here

# Optional: Redis Configuration (for caching)
# REDIS_URL=your_redis_url_here
```

### API Keys Setup

1. **Gemini AI API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

## 🎮 How It Works

### AI Game Generation Process

1. **Context Analysis**: AI analyzes current time, date, and user patterns
2. **Content Generation**: Creates diverse games across different genres
3. **Image Matching**: Finds real game cover images from curated database
4. **Data Enhancement**: Adds realistic ratings, prices, and system requirements
5. **Real-time Updates**: Refreshes content based on user interactions

### Smart Image System

1. **Curated Database**: 50+ real game cover images from popular titles
2. **Intelligent Matching**: Fuzzy matching algorithms find the right images
3. **Multiple Fallbacks**: External APIs → Curated images → Enhanced placeholders
4. **Performance Optimization**: Image preloading and caching

### Dynamic Content Features

- **Time-Based Variety**: Different games for different times of day
- **Trending System**: AI determines what's "hot" based on context
- **Real-time Insights**: Live player counts, community ratings
- **Interactive Elements**: Refresh buttons, hover effects, loading states

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
```

**Frontend:**
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run tests
npm run lint       # Run ESLint
```

### Adding New Features

1. **New AI Endpoints**: Add routes in `backend/routes/ai.js`
2. **New Components**: Create in `frontend/src/components/`
3. **New Pages**: Add to `frontend/src/pages/`
4. **Styling**: Update CSS variables in `frontend/src/index.css`

### Code Style

- **Frontend**: React with modern hooks, functional components
- **Backend**: Express.js with async/await patterns
- **AI Integration**: Google Gemini AI with structured prompts
- **Styling**: CSS-in-JS with CSS custom properties

## 🚀 Deployment

### Production Build

1. **Build frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Prepare backend**:
   ```bash
   cd backend
   npm install --production
   ```

3. **Set environment variables** for production

### Deployment Options

- **Vercel**: Perfect for frontend deployment
- **Railway/Render**: Great for full-stack deployment
- **AWS/Google Cloud**: For scalable production deployment
- **Docker**: Containerized deployment option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add comments for complex AI logic
- Test new features thoroughly
- Update documentation for new features
- Ensure responsive design for new components

## 📝 API Documentation

### Main Endpoints

- `GET /api/ai/popular-games` - Get AI-generated popular games
- `GET /api/ai/trending-games` - Get trending games based on time
- `GET /api/ai/game/:title` - Get detailed game information
- `GET /api/ai/game-insights/:title` - Get real-time game insights
- `POST /api/ai/download-links` - Get download links for a game
- `POST /api/ai/suggest-games` - Get personalized game suggestions
- `POST /api/ai/analyze-game` - Get AI analysis of a game

## 🔒 Security

- API keys are stored in environment variables
- Input validation on all AI endpoints
- Rate limiting on API calls
- CORS configuration for frontend access
- No sensitive data in client-side code

## 📊 Performance

- **AI Response Caching**: 10-60 second cache for AI responses
- **Image Optimization**: Lazy loading and preloading
- **Bundle Optimization**: Code splitting and tree shaking
- **API Efficiency**: Minimal API calls with smart caching

## 🐛 Troubleshooting

### Common Issues

1. **"Could not resolve HEAD" Git error**:
   ```bash
   git rm --cached -r .
   ```

2. **AI API not working**:
   - Check your Gemini API key in `.env`
   - Verify API key permissions
   - Check console for error messages

3. **Images not loading**:
   - Check network connectivity
   - Verify image URLs in console
   - Clear browser cache

4. **Frontend not connecting to backend**:
   - Ensure backend is running on port 5000
   - Check CORS configuration
   - Verify API endpoints

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **React Team** for the amazing frontend framework
- **PlayStation API** for game cover images
- **Gaming Community** for inspiration and feedback

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/gameai-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/gameai-platform/discussions)
- **Email**: your.email@example.com

---

**Built with ❤️ by [Your Name]**

*Discover your next gaming adventure with the power of AI!*