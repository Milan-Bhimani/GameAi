import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Zap,
  Shield,
  Download,
  Star,
  Users,
  Trophy,
  Gamepad2,
} from "lucide-react";
import { generateGradientPlaceholder } from "../utils/placeholderImage";

const LandingHome = ({ onExploreGames }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Game names for generating placeholders
  const gameNames = [
    "Cyberpunk 2077",
    "Red Dead Redemption 2",
    "The Witcher 3",
    "GTA V",
    "Elden Ring",
    "God of War",
    "Minecraft",
    "Call of Duty",
    "Hogwarts Legacy",
    "Spider-Man",
    "Assassins Creed",
    "Forza Horizon 5",
    "Halo Infinite",
    "EA FC 26",
    "Apex Legends",
  ];

  // Generate placeholder images
  const gameImages = gameNames.map((name) =>
    generateGradientPlaceholder(300, 400, name)
  );

  // Shuffle images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % gameImages.length);
    }, 3000);

    // Simulate AI loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(loadingTimer);
    };
  }, [gameImages.length]);

  const gameFeatures = [
    {
      icon: <Sparkles size={24} />,
      title: "AI-Powered Discovery",
      description:
        "Our advanced AI analyzes your preferences to recommend games you'll love",
    },
    {
      icon: <Download size={24} />,
      title: "Instant Downloads",
      description:
        "Get direct download links from Steam, Epic Games, and other major platforms",
    },
    {
      icon: <Shield size={24} />,
      title: "Safe & Secure",
      description:
        "All download links are verified and lead to official game stores",
    },
    {
      icon: <Star size={24} />,
      title: "Expert Reviews",
      description:
        "AI-generated reviews and ratings based on community feedback",
    },
  ];

  const gamingTips = [
    "🎮 Always check system requirements before downloading",
    "💾 Ensure you have enough storage space for large games",
    "🔒 Only download from official stores for security",
    "⚡ Use SSD storage for faster game loading times",
    "🎯 Read reviews and ratings before purchasing",
    "🌐 Check for regional availability and pricing",
  ];

  const stats = [
    { icon: <Users size={20} />, number: "10M+", label: "Gamers Served" },
    { icon: <Gamepad2 size={20} />, number: "50K+", label: "Games Available" },
    { icon: <Trophy size={20} />, number: "99%", label: "Satisfaction Rate" },
    { icon: <Zap size={20} />, number: "24/7", label: "AI Support" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <div
        style={{
          background: "var(--gradient-primary)",
          color: "white",
          padding: "6rem 0",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
              minHeight: "500px",
            }}
          >
            {/* Left Content */}
            <div>
              <h1
                style={{
                  fontSize: "4rem",
                  fontWeight: "900",
                  marginBottom: "2rem",
                  lineHeight: "1.1",
                }}
              >
                Discover Your Next
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(45deg, #ffffff, #ec4899, #0ea5e9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Gaming Adventure
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.4rem",
                  marginBottom: "3rem",
                  opacity: 0.95,
                  lineHeight: "1.7",
                  color: "#f0f0f0",
                }}
              >
                Powered by advanced AI, GameAI helps you discover amazing games,
                get instant download links, and find your perfect gaming
                experience.
              </p>

              <div
                style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}
              >
                <button
                  onClick={onExploreGames}
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "#1e40af",
                    border: "none",
                    padding: "1.2rem 2.5rem",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    borderRadius: "50px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  }}
                  disabled={isLoading}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.target.style.transform = "translateY(-3px)";
                      e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          border: "2px solid #1e40af",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                      AI Loading Games...
                    </>
                  ) : (
                    <>
                      <Sparkles size={22} />
                      Explore Games
                    </>
                  )}
                </button>

                <Link
                  to="/ai-suggestions"
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "2px solid rgba(255,255,255,0.3)",
                    padding: "1.2rem 2.5rem",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    borderRadius: "50px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                    e.target.style.borderColor = "rgba(255,255,255,0.6)";
                    e.target.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.borderColor = "rgba(255,255,255,0.3)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <Zap size={22} />
                  AI Suggestions
                </Link>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1.5rem",
                  marginTop: "2rem",
                }}
              >
                {stats.map((stat, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "0.5rem",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        opacity: 0.8,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Shuffling Images */}
            <div
              style={{
                position: "relative",
                height: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "300px",
                  height: "400px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transform: "rotate(-5deg)",
                }}
              >
                <img
                  src={gameImages[currentImageIndex]}
                  alt="Game Cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "all 0.5s ease",
                  }}
                />

                {/* Floating elements */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "float 3s ease-in-out infinite",
                  }}
                >
                  <Star size={24} color="var(--primary)" />
                </div>
              </div>

              {/* Background decorative elements */}
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  width: "100px",
                  height: "100px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  animation: "float 4s ease-in-out infinite reverse",
                }}
              ></div>

              <div
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: "10%",
                  width: "60px",
                  height: "60px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  animation: "float 5s ease-in-out infinite",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontWeight: "800",
                marginBottom: "1.5rem",
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Why Choose GameAI?
            </h2>
            <p
              style={{
                fontSize: "1.3rem",
                color: "var(--text-light)",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Experience the future of game discovery with our AI-powered
              platform
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2.5rem",
            }}
          >
            {gameFeatures.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: "2.5rem",
                  background: "var(--bg-card)",
                  borderRadius: "20px",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  gap: "1.5rem",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor =
                    "var(--accent-indian-blue)";
                  e.currentTarget.style.boxShadow = "var(--shadow-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    background: "var(--gradient-primary)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    width: "64px",
                    height: "64px",
                  }}
                >
                  <div style={{ color: "white" }}>{feature.icon}</div>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      marginBottom: "0.8rem",
                      color: "var(--text-white)",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-light)",
                      lineHeight: "1.7",
                      fontSize: "1rem",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gaming Tips Section */}
      <div style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontWeight: "800",
                marginBottom: "1.5rem",
                color: "var(--text-white)",
              }}
            >
              Gaming Best Practices
            </h2>
            <p
              style={{
                fontSize: "1.3rem",
                color: "var(--text-light)",
                lineHeight: "1.6",
              }}
            >
              Essential tips for a safe and enjoyable gaming experience
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {gamingTips.map((tip, index) => (
              <div
                key={index}
                style={{
                  padding: "1.5rem",
                  background: "var(--bg-card)",
                  borderRadius: "12px",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "1rem",
                  color: "var(--text-light)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--accent-pink)";
                  e.currentTarget.style.boxShadow = "var(--shadow-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          background: "var(--gradient-primary)",
          color: "white",
          padding: "5rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              marginBottom: "1.5rem",
            }}
          >
            Ready to Discover Amazing Games?
          </h2>
          <p
            style={{
              fontSize: "1.3rem",
              marginBottom: "3rem",
              opacity: 0.95,
              maxWidth: "600px",
              margin: "0 auto 3rem auto",
              lineHeight: "1.6",
            }}
          >
            Join millions of gamers who trust GameAI for their gaming
            discoveries
          </p>
          <button
            onClick={onExploreGames}
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#1e40af",
              border: "none",
              padding: "1.5rem 3rem",
              fontSize: "1.3rem",
              fontWeight: "700",
              borderRadius: "50px",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            }}
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = "translateY(-4px)";
                e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
              }
            }}
          >
            {isLoading ? "AI Loading..." : "Start Exploring"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingHome;
