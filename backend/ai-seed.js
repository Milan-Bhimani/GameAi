const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Game = require('./models/Game');
const User = require('./models/User');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const popularGames = [
  'Cyberpunk 2077',
  'Red Dead Redemption 2', 
  'The Witcher 3: Wild Hunt',
  'Grand Theft Auto V',
  'Elden Ring',
  'God of War',
  'Minecraft',
  'Call of Duty: Modern Warfare II',
  'Hogwarts Legacy',
  'Spider-Man Remastered',
  'Assassin\'s Creed Valhalla',
  'Forza Horizon 5',
  'Halo Infinite',
  'FIFA 23',
  'Apex Legends'
];

async function generateGameData(gameTitle) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
    Generate comprehensive game information for "${gameTitle}" in this exact JSON format:
    {
      "title": "${gameTitle}",
      "description": "Detailed 2-3 sentence description of the game",
      "genre": "Primary genre (Action, RPG, Strategy, Sports, Racing, Simulation, Adventure, Horror, Fighting, Puzzle)",
      "platform": ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X/S", "Xbox One", "Nintendo Switch", "Mobile"],
      "releaseDate": "YYYY-MM-DD",
      "rating": 8.5,
      "coverImage": "/images/games/covers/${gameTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg",
      "developer": "Developer name",
      "publisher": "Publisher name",
      "systemRequirements": {
        "minimum": {
          "os": "Windows 10 64-bit",
          "processor": "Intel Core i5-3570K / AMD FX-8310",
          "memory": "8 GB RAM",
          "graphics": "NVIDIA GTX 780 / AMD Radeon RX 470",
          "storage": "70 GB available space"
        },
        "recommended": {
          "os": "Windows 11 64-bit",
          "processor": "Intel Core i7-4790 / AMD Ryzen 3 3200G",
          "memory": "12 GB RAM", 
          "graphics": "NVIDIA GTX 1060 / AMD Radeon RX 590",
          "storage": "70 GB SSD space"
        }
      },
      "downloadLinks": [
        {
          "platform": "PC",
          "url": "https://store.steampowered.com/app/example",
          "size": "65 GB",
          "type": "steam"
        },
        {
          "platform": "PC", 
          "url": "https://www.epicgames.com/store/example",
          "size": "65 GB",
          "type": "epic"
        }
      ],
      "tags": ["open-world", "rpg", "story-rich", "action"],
      "metacriticScore": 85,
      "esrbRating": "M"
    }
    
    Make sure all information is accurate for ${gameTitle}. Use realistic system requirements, actual platforms the game is available on, correct release date, and appropriate ESRB rating.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const gameData = JSON.parse(jsonMatch[0]);
        return gameData;
      } else {
        throw new Error('No JSON found in AI response');
      }
    } catch (parseError) {
      console.error(`Failed to parse AI response for ${gameTitle}:`, parseError);
      return null;
    }
    
  } catch (error) {
    console.error(`Error generating data for ${gameTitle}:`, error);
    return null;
  }
}

async function seedWithAI() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gamelister');
    console.log('Connected to MongoDB');

    // Create a default user if none exists
    let defaultUser = await User.findOne({ email: 'demo@example.com' });
    if (!defaultUser) {
      defaultUser = new User({
        username: 'demo',
        email: 'demo@example.com',
        password: 'password123'
      });
      await defaultUser.save();
      console.log('Created default user');
    }

    // Clear existing games
    await Game.deleteMany({});
    console.log('Cleared existing games');

    console.log('Generating game data with AI...');
    const gameDataPromises = popularGames.map(async (gameTitle, index) => {
      console.log(`Generating data for ${gameTitle} (${index + 1}/${popularGames.length})`);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return await generateGameData(gameTitle);
    });

    const gameDataResults = await Promise.all(gameDataPromises);
    const validGameData = gameDataResults.filter(data => data !== null);

    console.log(`Generated ${validGameData.length} games with AI`);

    // Insert games into database
    for (const gameData of validGameData) {
      try {
        const game = new Game(gameData);
        await game.save();
        console.log(`✅ Saved: ${gameData.title}`);
      } catch (error) {
        console.error(`❌ Failed to save ${gameData.title}:`, error.message);
      }
    }

    console.log('\n🎮 Database seeded successfully with AI-generated game data!');
    console.log('You can login with:');
    console.log('Email: demo@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedWithAI();