import { Link, useLocation } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-nav">
          <Link to="/feed" className={`footer-nav-item ${isActive("/feed") ? "active" : ""}`}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>

          <Link to="/chat" className={`footer-nav-item ${isActive("/chat") ? "active" : ""}`}>
            <i className="fas fa-comment"></i>
            <span>Chat</span>
          </Link>

          <Link to="/create" className={`footer-nav-item create-btn ${isActive("/create") ? "active" : ""}`}>
            <div className="create-icon">
              <i className="fas fa-plus"></i>
            </div>
            <span>Create</span>
          </Link>

          <Link to="/public-chat" className={`footer-nav-item ${isActive("/public-chat") ? "active" : ""}`}>
            <i className="fas fa-users"></i>
            <span>Public</span>
          </Link>

          <Link to="/taps" className={`footer-nav-item ${isActive("/taps") ? "active" : ""}`}>
            <i className="fas fa-fire"></i>
            <span>Taps</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
