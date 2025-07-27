import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import LandingHome from './LandingHome';
import { Sparkles, Zap, RefreshCw, Bot, Gamepad2, TrendingUp } from 'lucide-react';

const Home = () => {
  const [games, setGames] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);
  const [showAIGames, setShowAIGames] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);

  useEffect(() => {
    fetchPopularGames();
    fetchTrendingGames();
  }, []);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const fetchPopularGames = async () => {
    try {
      console.log('🤖 Fetching AI-generated games...');
      setAiLoading(true);
      
      const response = await axios.get('/api/ai/popular-games');
      if (response.data.games && response.data.games.length > 0) {
        setGames(response.data.games);
        setFilteredGames(response.data.games);
        setShowAIGames(true);
        setLastRefresh(new Date());
        console.log(`✅ Loaded ${response.data.games.length} AI-generated games`);
      } else {
        console.log('❌ No games received from AI');
        setGames([]);
        setFilteredGames([]);
      }
    } catch (error) {
      console.error('❌ Error fetching AI games:', error);
      setGames([]);
      setFilteredGames([]);
    } finally {
      setLoading(false);
      setAiLoading(false);
    }
  };

  const fetchTrendingGames = async () => {
    try {
      console.log('🤖 Fetching trending games...');
      setTrendingLoading(true);
      
      const response = await axios.get('/api/ai/trending-games');
      if (response.data.trending && response.data.trending.length > 0) {
        setTrendingGames(response.data.trending);
        console.log(`✅ Loaded ${response.data.trending.length} trending games`);
      }
    } catch (error) {
      console.error('❌ Error fetching trending games:', error);
      setTrendingGames([]);
    } finally {
      setTrendingLoading(false);
    }
  };

  const handleExploreGames = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingHome onExploreGames={handleExploreGames} />;
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        gap: '24px'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid rgba(30, 64, 175, 0.2)',
            borderTop: '3px solid var(--accent-blue)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <Sparkles 
            size={24} 
            style={{ 
              position: 'absolute',
              color: 'var(--accent-indian-blue)',
              animation: 'pulse 2s infinite'
            }} 
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ 
            margin: '0 0 8px 0',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            AI is discovering amazing games...
          </h3>
          <p style={{ 
            color: 'var(--text-secondary)',
            margin: 0,
            fontSize: '14px'
          }}>
            Curating the perfect selection just for you
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
      {/* Hero Header */}
      <div style={{
        textAlign: 'center',
        padding: '60px 0 80px 0',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '30px',
        marginBottom: '50px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)'
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
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            padding: '16px',
            background: 'var(--gradient-primary)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-primary)'
          }}>
            <Gamepad2 size={28} color="white" />
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '900',
            margin: 0,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            AI Game Discovery
          </h1>
        </div>
        
        <p style={{
          fontSize: '18px',
          color: 'var(--text-light)',
          margin: '0 0 40px 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.7'
        }}>
          Discover fresh games every time with AI-powered recommendations
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => {
              fetchPopularGames();
              fetchTrendingGames();
            }}
            disabled={aiLoading || trendingLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: (aiLoading || trendingLoading) ? 'var(--bg-hover)' : 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: (aiLoading || trendingLoading) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: (aiLoading || trendingLoading) ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
          >
            {(aiLoading || trendingLoading) ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Discovering...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                Discover Fresh Games
              </>
            )}
          </button>

          <a 
            href="/ai-suggestions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'rgba(236, 72, 153, 0.1)',
              color: 'var(--accent-pink)',
              border: '1px solid rgba(236, 72, 153, 0.2)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Bot size={16} />
            Get Personal Suggestions
          </a>
        </div>
      </div>

      {/* Trending Games Section */}
      {trendingGames.length > 0 && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                padding: '12px',
                background: 'var(--gradient-primary)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUp size={20} color="white" />
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '800',
                margin: 0,
                color: 'var(--text-white)'
              }}>
                Trending Now
              </h2>
            </div>
            <button
              onClick={fetchTrendingGames}
              disabled={trendingLoading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'transparent',
                color: 'var(--accent-pink)',
                border: '1px solid var(--accent-pink)',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: trendingLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {trendingLoading ? (
                <>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    border: '1px solid var(--accent-pink)',
                    borderTop: '1px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCw size={12} />
                  Refresh
                </>
              )}
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {trendingGames.map((game, index) => (
              <div key={`trending-${index}`} style={{
                background: 'var(--bg-secondary)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent-indian-blue)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    style={{
                      width: '60px',
                      height: '80px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      border: '1px solid var(--border-subtle)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      margin: '0 0 8px 0',
                      color: 'var(--text-white)'
                    }}>
                      {game.title}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-light)',
                      margin: '0 0 12px 0',
                      lineHeight: '1.4'
                    }}>
                      {game.trendingReason}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '12px'
                    }}>
                      <span style={{
                        color: 'var(--accent-indian-blue)',
                        fontWeight: '600'
                      }}>
                        {game.rating}/10
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {game.playerCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Games Section */}
      {filteredGames.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--surface)',
          borderRadius: '20px',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto'
          }}>
            <Sparkles size={32} style={{ color: 'var(--accent-indian-blue)' }} />
          </div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 12px 0',
            color: '#ffffff'
          }}>
            Ready to discover amazing games?
          </h3>
          <p style={{
            color: '#e2e8f0',
            margin: '0 0 24px 0',
            fontSize: '15px'
          }}>
            Click "Discover New Games" to let AI find the perfect games for you
          </p>
          <button 
            onClick={fetchPopularGames}
            disabled={aiLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
          >
            <Sparkles size={16} />
            Start Discovering
          </button>
        </div>
      ) : (
        <>
          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            background: 'var(--surface)',
            borderRadius: '16px',
            marginBottom: '24px',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <TrendingUp size={18} style={{ color: 'var(--accent-indian-blue)' }} />
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                {filteredGames.length} Fresh Games Discovered
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#94a3b8'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: 'var(--accent-indian-blue)',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              AI-Curated • {lastRefresh ? `Updated ${lastRefresh.toLocaleTimeString()}` : 'Updated Now'}
            </div>
          </div>

          {/* Games Grid */}
          <div className="game-grid">
            {filteredGames.map((game, index) => (
              <GameCard key={`${game.title}-${index}`} game={game} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;