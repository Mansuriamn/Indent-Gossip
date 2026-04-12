
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Settings.css"

const Settings = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("privacy")

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="settings-page">
      <div className="container">
        <h1 className="settings-title">Settings</h1>

        <div className="settings-container">
          <div className="settings-sidebar">
            <button
              className={`sidebar-item ${activeSection === "privacy" ? "active" : ""}`}
              onClick={() => setActiveSection("privacy")}
            >
              <i className="fas fa-shield-alt"></i>
              <span>Privacy & Security</span>
            </button>

            <button
              className={`sidebar-item ${activeSection === "signin" ? "active" : ""}`}
              onClick={() => setActiveSection("signin")}
            >
              <i className="fas fa-lock"></i>
              <span>Sign in & Security</span>
            </button>

            <button
              className={`sidebar-item ${activeSection === "visibility" ? "active" : ""}`}
              onClick={() => setActiveSection("visibility")}
            >
              <i className="fas fa-eye"></i>
              <span>Visibility</span>
            </button>

            <button
              className={`sidebar-item ${activeSection === "data" ? "active" : ""}`}
              onClick={() => setActiveSection("data")}
            >
              <i className="fas fa-database"></i>
              <span>Data Privacy</span>
            </button>

            <button
              className={`sidebar-item ${activeSection === "help" ? "active" : ""}`}
              onClick={() => setActiveSection("help")}
            >
              <i className="fas fa-question-circle"></i>
              <span>Help Center</span>
            </button>

            <button
              className={`sidebar-item ${activeSection === "policy" ? "active" : ""}`}
              onClick={() => setActiveSection("policy")}
            >
              <i className="fas fa-file-alt"></i>
              <span>Privacy Policy</span>
            </button>

            <button className="sidebar-item logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>

          <div className="settings-content">
            {activeSection === "privacy" && (
              <div className="settings-section">
                <h2>Privacy & Security</h2>

                <div className="settings-card">
                  <div className="settings-option">
                    <div>
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-option">
                    <div>
                      <h3>Login Notifications</h3>
                      <p>Get notified when someone logs into your account</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-option">
                    <div>
                      <h3>Blocked Users</h3>
                      <p>Manage your list of blocked users</p>
                    </div>
                    <button className="btn btn-secondary">Manage</button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "signin" && (
              <div className="settings-section">
                <h2>Sign in & Security</h2>

                <div className="settings-card">
                  <div className="settings-option">
                    <div>
                      <h3>Change Password</h3>
                      <p>Update your password regularly for better security</p>
                    </div>
                    <button className="btn btn-secondary">Change</button>
                  </div>

                  <div className="settings-option">
                    <div>
                      <h3>Connected Accounts</h3>
                      <p>Manage accounts connected to your profile</p>
                    </div>
                    <button className="btn btn-secondary">Manage</button>
                  </div>

                  <div className="settings-option">
                    <div>
                      <h3>Active Sessions</h3>
                      <p>See where you're currently logged in</p>
                    </div>
                    <button className="btn btn-secondary">View</button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "visibility" && (
              <div className="settings-section">
                <h2>Visibility</h2>

                <div className="settings-card">
                  <div className="settings-option">
                    <div>
                      <h3>Profile Visibility</h3>
                      <p>Control who can see your profile</p>
                    </div>
                    <select className="settings-select">
                      <option>Everyone</option>
                      <option>Friends Only</option>
                      <option>Private</option>
                    </select>
                  </div>

                  <div className="settings-option">
                    <div>
                      <h3>Online Status</h3>
                      <p>Show when you're active on the platform</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-option">
                    <div>
                      <h3>Activity Status</h3>
                      <p>Let others see your recent activity</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "data" && (
              <div className="settings-section">
                <h2>Data Privacy</h2>

                <div className="settings-card">
                  <div className="settings-option">
                    <div>
                      <h3>Download Your Data</h3>
                      <p>Get a copy of your data on Indent Gossip</p>
                    </div>
                    <button className="btn btn-secondary">Download</button>
                  </div>

                  <div className="settings-option">
                    <div>
                      <h3>Data Usage</h3>
                      <p>Control how your data is used for personalization</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="settings-option">
                    <div>
                      <h3>Delete Account</h3>
                      <p>Permanently delete your account and all data</p>
                    </div>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "help" && (
              <div className="settings-section">
                <h2>Help Center</h2>

                <div className="settings-card">
                  <div className="help-section">
                    <h3>Frequently Asked Questions</h3>

                    <div className="faq-item">
                      <h4>How do I change my username?</h4>
                      <p>Go to Profile Settings and click on "Edit Profile". You can change your username there.</p>
                    </div>

                    <div className="faq-item">
                      <h4>What does the flag system mean?</h4>
                      <p>
                        The flag system indicates the community's response to content. Green flags are positively
                        received, red flags have received negative feedback, and blank flags are new posts.
                      </p>
                    </div>

                    <div className="faq-item">
                      <h4>How can I report inappropriate content?</h4>
                      <p>Click the flag icon on any post or comment to report it for review.</p>
                    </div>
                  </div>

                  <div className="contact-support">
                    <h3>Need more help?</h3>
                    <button className="btn btn-primary">Contact Support</button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "policy" && (
              <div className="settings-section">
                <h2>Privacy Policy</h2>

                <div className="settings-card policy-content">
                  <h3>Indent Gossip Privacy Policy</h3>
                  <p className="policy-date">Last updated: May 9, 2025</p>

                  <div className="policy-section">
                    <h4>1. Information We Collect</h4>
                    <p>
                      We collect information you provide directly to us when you create an account, update your profile,
                      post content, or communicate with other users. This may include your name, email address,
                      username, profile picture, and any content you post.
                    </p>
                  </div>

                  <div className="policy-section">
                    <h4>2. How We Use Your Information</h4>
                    <p>
                      We use the information we collect to provide, maintain, and improve our services, to communicate
                      with you, to monitor and analyze trends and usage, and to carry out any other purpose for which
                      the information was collected.
                    </p>
                  </div>

                  <div className="policy-section">
                    <h4>3. Sharing Your Information</h4>
                    <p>
                      We may share information about you as follows: with other users according to your privacy
                      settings, with third-party vendors who need access to your information to provide services to us,
                      and if we believe disclosure is necessary to comply with any applicable law or legal process.
                    </p>
                  </div>

                  <button className="btn btn-secondary">Read Full Policy</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
