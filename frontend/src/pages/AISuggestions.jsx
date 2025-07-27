import React, { useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import { Bot, Sparkles } from 'lucide-react';

const AISuggestions = () => {
  const [preferences, setPreferences] = useState('');
  const [ownedGames, setOwnedGames] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    setSuggestions([]);

    try {
      const ownedGamesArray = ownedGames
        .split(',')
        .map(game => game.trim())
        .filter(game => game.length > 0);

      const response = await axios.post('/api/ai/suggest-games', {
        preferences,
        ownedGames: ownedGamesArray
      });

      if (response.data.suggestions) {
        // Add placeholder images to suggestions that don't have coverImage
        const suggestionsWithImages = response.data.suggestions.map(suggestion => ({
          ...suggestion,
          coverImage: suggestion.coverImage || `/api/placeholder/${encodeURIComponent(suggestion.title)}`
        }));
        setSuggestions(suggestionsWithImages);
      } else {
        setError('AI generated suggestions but in an unexpected format');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to get AI suggestions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '60px 0',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '24px',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--gradient-primary)'
        }}></div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{
            padding: '16px',
            background: 'var(--gradient-primary)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={32} color="white" />
          </div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '900',
            margin: 0,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            AI Game Suggestions
          </h1>
        </div>
        
        <p style={{
          fontSize: '18px',
          color: 'var(--text-light)',
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.7'
        }}>
          Tell our AI about your gaming preferences and get personalized recommendations with instant download links
        </p>
      </div>

      {/* Chat-like Interface */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '20px',
        padding: '0',
        marginBottom: '40px',
        overflow: 'hidden'
      }}>
        
        {/* Chat Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--gradient-subtle)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--gradient-primary)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} color="white" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                GameAI Assistant
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
                Online • Ready to help
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ padding: '32px' }}>
          {/* AI Message */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'var(--gradient-primary)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bot size={18} color="white" />
            </div>
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '20px',
              borderRadius: '16px',
              borderTopLeftRadius: '4px',
              maxWidth: '80%',
              border: '1px solid var(--border-subtle)'
            }}>
              <p style={{ margin: 0, lineHeight: '1.6' }}>
                Hi! I'm your AI gaming assistant. Tell me about your gaming preferences and I'll recommend perfect games for you with instant download links! 🎮
              </p>
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              color: '#fca5a5'
            }}>
              {error}
            </div>
          )}
          
          {/* User Input Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                fontWeight: '600',
                color: 'var(--text-white)',
                fontSize: '16px'
              }}>
                What kind of games do you enjoy? *
              </label>
              <textarea
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                placeholder="e.g., I love open-world RPGs with great storytelling, fantasy settings, and character customization. I enjoy games like Skyrim and The Witcher 3..."
                required
                rows="4"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  color: 'var(--text-white)',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  minHeight: '120px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-blue)';
                  e.target.style.boxShadow = 'var(--shadow-primary)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-subtle)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                fontWeight: '600',
                color: 'var(--text-white)',
                fontSize: '16px'
              }}>
                Games you already own (optional)
              </label>
              <input
                type="text"
                value={ownedGames}
                onChange={(e) => setOwnedGames(e.target.value)}
                placeholder="e.g., Cyberpunk 2077, Red Dead Redemption 2, GTA V, The Witcher 3"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  color: 'var(--text-white)',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-blue)';
                  e.target.style.boxShadow = 'var(--shadow-primary)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-subtle)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <small style={{ 
                color: 'var(--text-muted)', 
                fontSize: '14px',
                display: 'block',
                marginTop: '8px'
              }}>
                This helps AI avoid suggesting games you already have
              </small>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px 32px',
                background: loading ? 'var(--bg-hover)' : 'var(--gradient-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  AI is thinking...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Get AI Recommendations
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div>
          {/* AI Response Header */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--gradient-primary)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={24} color="white" />
              </div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                margin: 0,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Perfect Matches Found!
              </h2>
            </div>
            <p style={{
              fontSize: '16px',
              color: 'var(--text-light)',
              margin: 0,
              lineHeight: '1.6'
            }}>
              Based on your preferences, I found {suggestions.length} amazing games you'll love
            </p>
          </div>

          {/* Games Grid with Enhanced Cards */}
          <div className="game-grid">
            {suggestions.map((suggestion, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <GameCard game={suggestion} />
                
                {/* Enhanced AI Recommendation Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: 'var(--shadow-primary)',
                  zIndex: 10
                }}>
                  <Bot size={12} />
                  AI Pick
                </div>
                
                {/* AI Recommendation Tooltip */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(0, 0, 0, 0.9)',
                  backdropFilter: 'blur(20px)',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  border: '1px solid var(--border-primary)',
                  boxShadow: 'var(--shadow-card)',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  zIndex: 5
                }}
                className="ai-tooltip"
                >
                  <div style={{ 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    color: 'var(--accent-indian-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Sparkles size={14} />
                    Why AI recommends this:
                  </div>
                  <div style={{ fontWeight: '400' }}>
                    {suggestion.reason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;