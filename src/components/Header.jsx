"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import "./Header.css"

const Header = () => {
  const { user, logout } = useAuth()
  const { isDarkTheme, toggleTheme } = useTheme()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">Indent Gossip</span>
          </Link>

          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search users, tags, or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          <div className="header-right">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkTheme ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>

            {user ? (
              <div className="profile-section" ref={profileMenuRef}>
                <div className="avatar" onClick={toggleProfileMenu}>
                  <img src={user.avatar || "/placeholder-avatar.png"} alt="Profile" />
                </div>

                {showProfileMenu && (
                  <div className="profile-menu">
                    <div className="profile-menu-header">
                      <div className="profile-info">
                        <span className="profile-name">{user.username}</span>
                        <span className="profile-email">{user.email}</span>
                      </div>
                    </div>

                    <div className="profile-menu-stats">
                      <div className="stat-item">
                        <span className="stat-value">128</span>
                        <span className="stat-label">Profile Views</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">1.2k</span>
                        <span className="stat-label">Post Impressions</span>
                      </div>
                    </div>

                    <div className="profile-menu-links">
                      <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                        <i className="fas fa-user"></i> View Profile
                      </Link>
                      <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                        <i className="fas fa-bookmark"></i> Saved Posts
                      </Link>
                      <Link to="/settings" onClick={() => setShowProfileMenu(false)}>
                        <i className="fas fa-cog"></i> Settings
                      </Link>
                      <button 
                        className="logout-link" 
                        onClick={() => {
                          logout(); 
                          setShowProfileMenu(false);
                          navigate("/login");
                        }}
                        style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}
                      >
                        <i className="fas fa-sign-out-alt"></i> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="auth-button">
                <i className="fas fa-user"></i>
                <span>Sign Up/In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
