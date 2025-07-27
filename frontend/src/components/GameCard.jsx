import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, User, Download, ExternalLink, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { axiosConfig } from '../config/api';
import { generatePlaceholderImage } from '../utils/placeholderImage';
import { loadGameImage, generateFallbackImage } from '../utils/imageGeneration';

const GameCard = ({ game }) => {
  const [currentImage, setCurrentImage] = useState(game.coverImage);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 9) return '#34a853';
    if (rating >= 7) return '#fbbc04';
    if (rating >= 5) return '#ff9800';
    return '#ea4335';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'PC': '🖥️',
      'PlayStation 5': '🎮',
      'PlayStation 4': '🎮',
      'Xbox Series X/S': '🎮',
      'Xbox One': '🎮',
      'Nintendo Switch': '🎮',
      'Mobile': '📱'
    };
    return icons[platform] || '🎮';
  };

  // Load AI-enhanced image on component mount
  useEffect(() => {
    const loadEnhancedImage = async () => {
      if (!currentImage || imageError) {
        setImageLoading(true);
        try {
          const enhancedImage = await loadGameImage(game);
          setCurrentImage(enhancedImage);
          setImageError(false);
        } catch (error) {
          console.error('Failed to load enhanced image:', error);
          setCurrentImage(generateFallbackImage(game.title, game.genre));
          setImageError(true);
        } finally {
          setImageLoading(false);
        }
      }
    };

    loadEnhancedImage();
  }, [game, currentImage, imageError]);

  // Refresh image with new AI generation
  const refreshImage = async (e) => {
    e.stopPropagation();
    setImageLoading(true);
    try {
      const response = await axios.post('/api/ai/generate-game-image', {
        gameTitle: game.title,
        genre: game.genre,
        description: game.description,
        style: 'realistic'
      }, axiosConfig);
      
      if (response.data.unsplash) {
        setCurrentImage(response.data.unsplash);
        setImageError(false);
      }
    } catch (error) {
      console.error('Failed to refresh image:', error);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '20px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.borderColor = 'var(--accent-indian-blue)';
      e.currentTarget.style.boxShadow = 'var(--shadow-accent), var(--shadow-dark)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.borderColor = 'var(--border-subtle)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src={currentImage || generateFallbackImage(game.title, game.genre)} 
          alt={game.title}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover',
            transition: 'all 0.3s ease',
            filter: imageLoading ? 'blur(2px) brightness(0.7)' : 'none'
          }}
          onError={(e) => {
            e.target.src = generatePlaceholderImage(300, 220, game.title);
          }}
        />
        
        {/* Rating Badge */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: `linear-gradient(135deg, ${getRatingColor(game.rating)}, ${getRatingColor(game.rating)}dd)`,
          color: 'white',
          padding: '8px 12px',
          borderRadius: '25px',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <Star size={14} fill="currentColor" />
          {game.rating}
        </div>

        {/* Genre Badge */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'var(--gradient-primary)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          backdropFilter: 'blur(10px)',
          boxShadow: 'var(--shadow-primary)'
        }}>
          {game.genre}
        </div>

        {/* Image Refresh Button */}
        <button
          onClick={refreshImage}
          disabled={imageLoading}
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: imageLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: 0.8
          }}
          onMouseEnter={(e) => {
            if (!imageLoading) {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!imageLoading) {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          <RefreshCw size={14} style={{
            animation: imageLoading ? 'spin 1s linear infinite' : 'none'
          }} />
        </button>

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
          pointerEvents: 'none'
        }} />
      </div>
      
      <div style={{ padding: '24px' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '800',
          color: 'var(--text-white)',
          marginBottom: '16px',
          lineHeight: '1.3',
          background: 'linear-gradient(135deg, #ffffff, #e2e8f0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {game.title}
        </h3>

        {/* Game Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-light)',
            fontSize: '14px'
          }}>
            <User size={14} style={{ color: 'var(--accent-indian-blue)' }} />
            <span>{game.developer}</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-light)',
            fontSize: '14px'
          }}>
            <Calendar size={14} style={{ color: 'var(--accent-pink)' }} />
            <span>{formatDate(game.releaseDate)}</span>
          </div>
        </div>

        {/* Description */}
        {game.description && (
          <p style={{
            color: 'var(--text-gray)',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {game.description}
          </p>
        )}

        {/* Platform Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '20px'
        }}>
          {game.platform.slice(0, 3).map((platform, index) => (
            <span
              key={index}
              style={{
                background: 'var(--gradient-secondary)',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {getPlatformIcon(platform)}
              {platform}
            </span>
          ))}
          {game.platform.length > 3 && (
            <span style={{
              background: 'var(--bg-hover)',
              color: 'var(--text-light)',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              +{game.platform.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <Link 
            to={`/game/${encodeURIComponent(game.title)}`}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: 'transparent',
              color: 'var(--accent-indian-blue)',
              border: '2px solid var(--accent-indian-blue)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-indian-blue)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--accent-indian-blue)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ExternalLink size={16} />
            Details
          </Link>
          
          <button 
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: 'var(--gradient-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-primary), 0 8px 25px rgba(30, 64, 175, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={async (e) => {
              e.preventDefault();
              try {
                const response = await axios.post('/api/ai/download-links', {
                  gameTitle: game.title,
                  platforms: game.platform
                }, axiosConfig);
                
                if (response.data.downloadLinks && response.data.downloadLinks.length > 0) {
                  const firstLink = response.data.downloadLinks[0];
                  window.open(firstLink.url, '_blank');
                } else {
                  alert('Download links not available for this game');
                }
              } catch (error) {
                console.error('Error getting download links:', error);
                alert('Failed to get download links. Please try again.');
              }
            }}
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;