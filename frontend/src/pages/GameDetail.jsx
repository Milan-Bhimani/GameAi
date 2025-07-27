import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosConfig } from '../config/api';
import AIGameAnalysis from "../components/AIGameAnalysis";
import { generatePlaceholderImage } from "../utils/placeholderImage";
import {
  Calendar,
  Monitor,
  Star,
  User,
  DollarSign,
  Bot,
  ArrowLeft,
  Building,
  Trophy,
  Download,
  ExternalLink,
} from "lucide-react";

const GameDetail = () => {
  const [game, setGame] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [insightsLoading, setInsightsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  const { title } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        console.log(`🤖 Fetching AI details for: ${title}`);
        const response = await axios.get(
          `/api/ai/game/${encodeURIComponent(title)}`,
          axiosConfig
        );
        setGame(response.data);
        console.log(`✅ AI details loaded for: ${title}`);
      } catch (error) {
        console.error("❌ Failed to load game details:", error);
        setError("AI service temporarily unavailable. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchInsights = async () => {
      try {
        console.log(`🤖 Fetching real-time insights for: ${title}`);
        const response = await axios.get(
          `/api/ai/game-insights/${encodeURIComponent(title)}`,
          axiosConfig
        );
        setInsights(response.data.insights);
        console.log(`✅ Real-time insights loaded for: ${title}`);
      } catch (error) {
        console.error("❌ Failed to load insights:", error);
        // Don't show error for insights, just continue without them
      } finally {
        setInsightsLoading(false);
      }
    };

    if (title) {
      fetchGame();
      fetchInsights();
    }
  }, [title]);

  const handleDownload = async () => {
    try {
      const response = await axios.post("/api/ai/download-links", {
        gameTitle: game.title,
        platforms: game.platform,
      }, axiosConfig);

      if (
        response.data.downloadLinks &&
        response.data.downloadLinks.length > 0
      ) {
        // Open the first available download link
        const firstLink = response.data.downloadLinks[0];
        window.open(firstLink.url, "_blank");
      } else {
        alert("Download links not available for this game");
      }
    } catch (error) {
      console.error("Error getting download links:", error);
      alert("Failed to get download links. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-error">{error}</div>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          <ArrowLeft size={16} />
          Back to Games
        </button>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="card">
        <div className="alert alert-error">Game not found</div>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          <ArrowLeft size={16} />
          Back to Games
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          border: "2px solid var(--border-subtle)",
          color: "var(--text-light)",
          padding: "12px 20px",
          borderRadius: "25px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginBottom: "32px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent-indian-blue)";
          e.currentTarget.style.color = "var(--accent-indian-blue)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-subtle)";
          e.currentTarget.style.color = "var(--text-light)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <ArrowLeft size={16} />
        BACK TO GAMES
      </button>

      {/* Main Content */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Header with gradient */}
        <div
          style={{
            height: "4px",
            background: "var(--gradient-primary)",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "400px 1fr",
            gap: "40px",
            padding: "40px",
          }}
        >
          {/* Game Cover */}
          <div>
            <img
              src={
                game.coverImage ||
                generatePlaceholderImage(400, 500, game.title)
              }
              alt={game.title}
              style={{
                width: "100%",
                borderRadius: "16px",
                boxShadow: "var(--shadow-dark)",
                border: "1px solid var(--border-subtle)",
              }}
              onError={(e) => {
                e.target.src = generatePlaceholderImage(400, 500, game.title);
              }}
            />
          </div>

          {/* Game Info */}
          <div>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "900",
                marginBottom: "16px",
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: "1.1",
              }}
            >
              {game.title}
            </h1>

            <p
              style={{
                fontSize: "18px",
                marginBottom: "32px",
                color: "var(--text-light)",
                lineHeight: "1.7",
              }}
            >
              {game.description}
            </p>

            {/* Game Info Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
                marginBottom: "40px",
              }}
            >
              {/* Platform, Developer, Publisher, Release Date, Rating, Price, ESRB, Metacritic */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Monitor
                  size={20}
                  style={{ color: "var(--accent-indian-blue)" }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    Platforms
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "var(--text-white)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    {game.platform.join(", ")}
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <User size={20} style={{ color: "var(--accent-pink)" }} />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    Developer
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "var(--text-white)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    {game.developer}
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Building
                  size={20}
                  style={{ color: "var(--accent-indian-blue)" }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    Publisher
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "var(--text-white)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    {game.publisher}
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Calendar size={20} style={{ color: "var(--accent-pink)" }} />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    Release Date
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "var(--text-white)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    {formatDate(game.releaseDate)}
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Star
                  size={20}
                  style={{ color: "var(--accent-indian-blue)" }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    Rating
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "var(--text-white)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    {game.rating}/10
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <DollarSign size={20} style={{ color: "var(--accent-pink)" }} />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    Price
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "var(--text-white)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    ${game.price}
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Trophy
                  size={20}
                  style={{ color: "var(--accent-indian-blue)" }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    ESRB Rating
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "var(--text-white)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    {game.esrbRating || "M"}
                  </p>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Trophy size={20} style={{ color: "var(--accent-pink)" }} />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      margin: 0,
                    }}
                  >
                    Metacritic Score
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      color: "var(--text-white)",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    {game.metacriticScore || "85"}/100
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
              <button
                onClick={handleDownload}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 32px",
                  background: "var(--gradient-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "var(--shadow-primary), 0 8px 25px rgba(30, 64, 175, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Download size={18} />
                DOWNLOAD GAME
              </button>

              <button
                onClick={() => setShowAIAnalysis(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 32px",
                  background: "transparent",
                  color: "var(--accent-indian-blue)",
                  border: "2px solid var(--accent-indian-blue)",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "var(--accent-indian-blue)";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--accent-indian-blue)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Bot size={18} />
                AI ANALYSIS
              </button>

              <button
                onClick={async () => {
                  setInsightsLoading(true);
                  try {
                    const response = await axios.get(
                      `/api/ai/game-insights/${encodeURIComponent(title)}`,
                      axiosConfig
                    );
                    setInsights(response.data.insights);
                  } catch (error) {
                    console.error("Failed to refresh insights:", error);
                  } finally {
                    setInsightsLoading(false);
                  }
                }}
                disabled={insightsLoading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 32px",
                  background: "transparent",
                  color: "var(--accent-pink)",
                  border: "2px solid var(--accent-pink)",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: insightsLoading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  opacity: insightsLoading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!insightsLoading) {
                    e.currentTarget.style.background = "var(--accent-pink)";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-accent)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!insightsLoading) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--accent-pink)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <Bot size={18} />
                {insightsLoading ? "REFRESHING..." : "REFRESH DATA"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Insights Section */}
      {insights && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "24px",
            padding: "40px",
            marginTop: "32px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "800",
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "var(--text-white)",
            }}
          >
            <Bot size={28} style={{ color: "var(--accent-pink)" }} />
            Live Game Data
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Current Players */}
            <div
              style={{
                background: "var(--bg-secondary)",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h3
                style={{
                  color: "var(--accent-indian-blue)",
                  marginBottom: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Current Activity
              </h3>
              <p
                style={{
                  color: "var(--text-white)",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                }}
              >
                {insights.currentPlayers}
              </p>
              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                Peak: {insights.peakPlayers}
              </p>
            </div>

            {/* Community Rating */}
            <div
              style={{
                background: "var(--bg-secondary)",
                padding: "24px",
                borderRadius: "16px",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h3
                style={{
                  color: "var(--accent-pink)",
                  marginBottom: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Community Score
              </h3>
              <p
                style={{
                  color: "var(--text-white)",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "0 0 8px 0",
                }}
              >
                {insights.communityRating}/10
              </p>
              <p
                style={{
                  color: "var(--text-light)",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                Status: {insights.trendingStatus}
              </p>
            </div>

            {/* Steam Reviews */}
            {insights.steamReviews && (
              <div
                style={{
                  background: "var(--bg-secondary)",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <h3
                  style={{
                    color: "var(--accent-indian-blue)",
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Steam Reviews
                </h3>
                <p
                  style={{
                    color: "var(--text-white)",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                  }}
                >
                  {insights.steamReviews.recent}
                </p>
                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {insights.steamReviews.totalReviews} reviews
                </p>
              </div>
            )}

            {/* Price Info */}
            {insights.priceHistory && (
              <div
                style={{
                  background: "var(--bg-secondary)",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <h3
                  style={{
                    color: "var(--accent-pink)",
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Price Tracking
                </h3>
                <p
                  style={{
                    color: "var(--text-white)",
                    fontSize: "18px",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                  }}
                >
                  {insights.priceHistory.currentPrice}
                </p>
                <p
                  style={{
                    color: "var(--text-light)",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  Lowest: {insights.priceHistory.lowestPrice} •{" "}
                  {insights.priceHistory.lastSale}
                </p>
              </div>
            )}
          </div>

          {/* Recent Updates */}
          {insights.recentUpdates && insights.recentUpdates.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <h3
                style={{
                  color: "var(--text-white)",
                  marginBottom: "16px",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                Recent Updates
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {insights.recentUpdates.map((update, index) => (
                  <div
                    key={index}
                    style={{
                      background: "var(--bg-secondary)",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-subtle)",
                      borderLeft: "4px solid var(--accent-indian-blue)",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--text-light)",
                        margin: 0,
                        fontSize: "15px",
                      }}
                    >
                      {update}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Highlights */}
          {insights.communityHighlights &&
            insights.communityHighlights.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <h3
                  style={{
                    color: "var(--text-white)",
                    marginBottom: "16px",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  Community Highlights
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {insights.communityHighlights.map((highlight, index) => (
                    <div
                      key={index}
                      style={{
                        background: "var(--bg-secondary)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid var(--border-subtle)",
                        borderLeft: "4px solid var(--accent-pink)",
                      }}
                    >
                      <p
                        style={{
                          color: "var(--text-light)",
                          margin: 0,
                          fontSize: "15px",
                        }}
                      >
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Available On Section */}
      {game.downloadLinks && game.downloadLinks.length > 0 && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "24px",
            padding: "40px",
            marginTop: "32px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "800",
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "var(--text-white)",
            }}
          >
            <Download size={28} style={{ color: "var(--accent-pink)" }} />
            Available On
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {game.downloadLinks.map((link, index) => (
              <div
                key={index}
                style={{
                  background: "var(--bg-secondary)",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-pink)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: "700",
                      marginBottom: "8px",
                      color: "var(--text-white)",
                      fontSize: "18px",
                    }}
                  >
                    {link.storeName}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--text-light)",
                      margin: 0,
                    }}
                  >
                    {link.price} • {link.size}
                  </p>
                </div>
                <button
                  onClick={() => window.open(link.url, "_blank")}
                  style={{
                    background: "var(--gradient-primary)",
                    color: "white",
                    border: "none",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* System Requirements Section */}
      {game.systemRequirements && (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "24px",
            padding: "40px",
            marginTop: "32px",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "800",
              marginBottom: "32px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "var(--text-white)",
            }}
          >
            <Monitor size={28} style={{ color: "var(--accent-indian-blue)" }} />
            System Requirements
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
            }}
          >
            {game.systemRequirements.minimum && (
              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "20px",
                    color: "var(--text-white)",
                  }}
                >
                  Minimum
                </h3>
                <div
                  style={{
                    background: "var(--bg-secondary)",
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      color: "var(--text-light)",
                      lineHeight: "1.8",
                    }}
                  >
                    <p style={{ margin: "0 0 8px 0" }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        OS:
                      </strong>{" "}
                      {game.systemRequirements.minimum.os}
                    </p>
                    <p style={{ margin: "0 0 8px 0" }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        Processor:
                      </strong>{" "}
                      {game.systemRequirements.minimum.processor}
                    </p>
                    <p style={{ margin: "0 0 8px 0" }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        Memory:
                      </strong>{" "}
                      {game.systemRequirements.minimum.memory}
                    </p>
                    <p style={{ margin: "0 0 8px 0" }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        Graphics:
                      </strong>{" "}
                      {game.systemRequirements.minimum.graphics}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        Storage:
                      </strong>{" "}
                      {game.systemRequirements.minimum.storage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {game.systemRequirements.recommended && (
              <div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "20px",
                    color: "var(--text-white)",
                  }}
                >
                  Recommended
                </h3>
                <div
                  style={{
                    background: "var(--bg-secondary)",
                    padding: "24px",
                    borderRadius: "16px",
                    border: "1px solid var(--accent-indian-blue)",
                    boxShadow: "var(--shadow-accent)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      color: "var(--text-light)",
                      lineHeight: "1.8",
                    }}
                  >
                    <p style={{ margin: "0 0 8px 0" }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        OS:
                      </strong>{" "}
                      {game.systemRequirements.recommended.os}
                    </p>
                    <p style={{ margin: "0 0 8px 0" }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        Processor:
                      </strong>{" "}
                      {game.systemRequirements.recommended.processor}
                    </p>
                    <p style={{ margin: "0 0 8px 0" }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        Memory:
                      </strong>{" "}
                      {game.systemRequirements.recommended.memory}
                    </p>
                    <p style={{ margin: "0 0 8px 0" }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        Graphics:
                      </strong>{" "}
                      {game.systemRequirements.recommended.graphics}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong style={{ color: "var(--text-white)" }}>
                        Storage:
                      </strong>{" "}
                      {game.systemRequirements.recommended.storage}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Screenshots Section */}
      {game.screenshots && game.screenshots.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Screenshots</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {game.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={screenshot}
                alt={`${game.title} screenshot ${index + 1}`}
                style={{
                  width: "100%",
                  borderRadius: "0.5rem",
                  boxShadow: "var(--shadow)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* AI Analysis Modal */}
      {showAIAnalysis && (
        <AIGameAnalysis
          gameTitle={game.title}
          gameDescription={game.description}
          onClose={() => setShowAIAnalysis(false)}
        />
      )}
    </div>
  );
};

export default GameDetail;
