import React, { useState } from 'react';
import axios from 'axios';
import { axiosConfig } from '../config/api';
import { X, Bot, CheckCircle, AlertTriangle, Users, Gamepad2, Star, Clock, BarChart3, RotateCcw } from 'lucide-react';

const AIGameAnalysis = ({ gameTitle, gameDescription, onClose }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeGame = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/ai/analyze-game', {
        gameTitle,
        gameDescription
      }, axiosConfig);

      if (response.data.analysis) {
        setAnalysis(response.data.analysis);
      } else {
        setError('AI analysis generated but in unexpected format');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to analyze game');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (gameTitle && gameDescription) {
      analyzeGame();
    }
  }, [gameTitle, gameDescription]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            <Bot size={20} style={{ marginRight: '0.5rem' }} />
            AI Game Analysis: {gameTitle}
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>AI is analyzing the game...</p>
            </div>
          )}

          {error && <div className="alert alert-error">{error}</div>}

          {analysis && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  marginBottom: '1rem',
                  color: 'var(--success)'
                }}>
                  <CheckCircle size={20} />
                  Strengths
                </h3>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  {analysis.strengths?.map((strength, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  marginBottom: '1rem',
                  color: 'var(--warning)'
                }}>
                  <AlertTriangle size={20} />
                  Potential Weaknesses
                </h3>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  {analysis.weaknesses?.map((weakness, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{weakness}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  marginBottom: '1rem',
                  color: 'var(--primary)'
                }}>
                  <Users size={20} />
                  Target Audience
                </h3>
                <p style={{ 
                  padding: '1rem', 
                  backgroundColor: 'var(--background)', 
                  borderRadius: '0.5rem',
                  lineHeight: '1.6'
                }}>
                  {analysis.targetAudience}
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  marginBottom: '1rem',
                  color: 'var(--primary)'
                }}>
                  <Gamepad2 size={20} />
                  Similar Games
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.similarGames?.map((game, index) => (
                    <span 
                      key={index}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        borderRadius: '1rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'var(--background)', 
                  borderRadius: '0.75rem',
                  textAlign: 'center'
                }}>
                  <Star size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>AI Recommended Rating</h4>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                    {analysis.recommendedRating}/10
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'var(--background)', 
                  borderRadius: '0.75rem',
                  textAlign: 'center'
                }}>
                  <Clock size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>Play Time</h4>
                  <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {analysis.playTime}
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'var(--background)', 
                  borderRadius: '0.75rem',
                  textAlign: 'center'
                }}>
                  <BarChart3 size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>Difficulty</h4>
                  <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {analysis.difficulty}
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'var(--background)', 
                  borderRadius: '0.75rem',
                  textAlign: 'center'
                }}>
                  <RotateCcw size={24} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                  <h4 style={{ marginBottom: '0.5rem' }}>Replay Value</h4>
                  <p style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {analysis.replayValue}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGameAnalysis;