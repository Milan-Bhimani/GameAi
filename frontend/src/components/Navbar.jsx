import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Search, Bot, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled 
          ? 'rgba(0, 0, 0, 0.95)' 
          : 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${isScrolled ? 'var(--border-hover)' : 'var(--border-subtle)'}`,
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? 'var(--shadow-card)' : 'none'
      }}
    >
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
          padding: '0 20px'
        }}>
          {/* Logo */}
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div style={{ 
              background: 'var(--gradient-primary)', 
              borderRadius: '12px', 
              padding: '10px',
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-primary)'
            }}>
              <Sparkles size={24} color="white" />
            </div>
            <span style={{ 
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '900',
              fontSize: '28px',
              letterSpacing: '-0.02em'
            }}>
              GameAI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px'
          }}>
            <Link 
              to="/" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: isActive('/') ? 'var(--accent-indian-blue)' : 'var(--text-light)',
                fontWeight: '600',
                fontSize: '16px',
                padding: '12px 20px',
                borderRadius: '25px',
                border: `2px solid ${isActive('/') ? 'var(--accent-indian-blue)' : 'transparent'}`,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isActive('/')) {
                  e.currentTarget.style.color = 'var(--text-white)';
                  e.currentTarget.style.borderColor = 'var(--accent-indian-blue)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-accent)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) {
                  e.currentTarget.style.color = 'var(--text-light)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <Search size={18} />
              Discover
              {isActive('/') && (
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '3px',
                  background: 'var(--accent-indian-blue)',
                  borderRadius: '2px'
                }} />
              )}
            </Link>
            
            <Link 
              to="/ai-suggestions" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                color: isActive('/ai-suggestions') ? 'var(--accent-pink)' : 'var(--text-light)',
                fontWeight: '600',
                fontSize: '16px',
                padding: '12px 20px',
                borderRadius: '25px',
                border: `2px solid ${isActive('/ai-suggestions') ? 'var(--accent-pink)' : 'transparent'}`,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isActive('/ai-suggestions')) {
                  e.currentTarget.style.color = 'var(--text-white)';
                  e.currentTarget.style.borderColor = 'var(--accent-pink)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-secondary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/ai-suggestions')) {
                  e.currentTarget.style.color = 'var(--text-light)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <Bot size={18} />
              AI Suggestions
              {isActive('/ai-suggestions') && (
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '3px',
                  background: 'var(--accent-pink)',
                  borderRadius: '2px'
                }} />
              )}
            </Link>

            {/* Get Started Button */}
            <Link
              to="/ai-suggestions"
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '25px',
                fontWeight: '700',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-primary), 0 8px 25px rgba(30, 64, 175, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-primary)';
              }}
            >
              <Sparkles size={16} />
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-white)',
              cursor: 'pointer',
              padding: '8px'
            }}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            borderTop: 'none',
            padding: '20px',
            display: 'none'
          }}
          className="mobile-menu"
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  color: isActive('/') ? 'var(--accent-indian-blue)' : 'var(--text-light)',
                  fontWeight: '600',
                  fontSize: '18px',
                  padding: '16px',
                  borderRadius: '12px',
                  border: `1px solid ${isActive('/') ? 'var(--accent-indian-blue)' : 'var(--border-subtle)'}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <Search size={20} />
                Discover
              </Link>
              
              <Link 
                to="/ai-suggestions" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textDecoration: 'none',
                  color: isActive('/ai-suggestions') ? 'var(--accent-pink)' : 'var(--text-light)',
                  fontWeight: '600',
                  fontSize: '18px',
                  padding: '16px',
                  borderRadius: '12px',
                  border: `1px solid ${isActive('/ai-suggestions') ? 'var(--accent-pink)' : 'var(--border-subtle)'}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <Bot size={20} />
                AI Suggestions
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
          .navbar-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;