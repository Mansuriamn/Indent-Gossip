"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Home.css"

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Indent Gossip</span>
          </h1>
          <p className="hero-subtitle">Share anonymously. Connect authentically.</p>

          {!user && (
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Log In
              </Link>
            </div>
          )}
        </div>

        <div className="features-section">
          <h2 className="section-title">How It Works</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-flag"></i>
              </div>
              <h3>Flag System</h3>
              <p>Posts are automatically flagged based on community feedback:</p>
              <ul>
                <li>
                  <span className="green-dot"></span> Green Flag: 10+ likes, &lt;5 reports
                </li>
                <li>
                  <span className="red-dot"></span> Red Flag: 10+ dislikes or 5+ reports
                </li>
                <li>
                  <span className="blank-dot"></span> Blank Flag: New posts
                </li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <h3>User Monitoring</h3>
              <p>We maintain community standards:</p>
              <ul>
                <li>Warning after 20+ red-flagged posts</li>
                <li>Account restrictions after continued violations</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-fire"></i>
              </div>
              <h3>Taps</h3>
              <p>Show interest without messaging:</p>
              <ul>
                <li>Tap users to show appreciation</li>
                <li>See who tapped you</li>
                <li>Build connections organically</li>
              </ul>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>Chat Rooms</h3>
              <p>Connect with others:</p>
              <ul>
                <li>Private one-on-one conversations</li>
                <li>Public chat rooms by topic</li>
                <li>Moderated discussions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
