
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import "./Profile.css"

// Mock data for user profile
const MOCK_PROFILE = {
  bio: "Digital enthusiast and creative thinker. Sharing thoughts and ideas anonymously.",
  location: "San Francisco, CA",
  joinDate: "May 2025",
  stats: {
    posts: 42,
    followers: 128,
    following: 97,
    impressions: 1243,
  },
}

// Mock data for user posts
const MOCK_POSTS = [
  {
    id: 1,
    content: "Just shared my thoughts on the latest tech trends. What do you all think?",
    timestamp: "2 days ago",
    likes: 24,
    comments: 8,
    flagStatus: "green",
  },
  {
    id: 2,
    content: "Beautiful sunset today! Nature is truly amazing. #sunset #nature",
    timestamp: "1 week ago",
    likes: 42,
    comments: 5,
    flagStatus: "green",
  },
  {
    id: 3,
    content: "Working on a new project. Can't wait to share it with everyone!",
    timestamp: "2 weeks ago",
    likes: 18,
    comments: 3,
    flagStatus: "blank",
  },
]

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [profile, setProfile] = useState(MOCK_PROFILE)
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [activeTab, setActiveTab] = useState("posts")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: user?.username || "",
    bio: profile.bio,
    location: profile.location,
  })

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    // Update profile
    setProfile((prev) => ({
      ...prev,
      bio: editForm.bio,
      location: editForm.location,
    }))

    // Update user in context
    updateUser({
      username: editForm.username,
    })

    setIsEditing(false)
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateUser({
          avatar: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-cover">
            <div className="edit-cover">
              <button className="edit-btn">
                <i className="fas fa-camera"></i>
                <span>Change Cover</span>
              </button>
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-avatar">
              <img src={user?.avatar || "/images/avatar-placeholder.png"} alt="Profile" />
              <label className="avatar-upload">
                <i className="fas fa-camera"></i>
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>

            <div className="profile-details">
              {isEditing ? (
                <div className="edit-profile-form">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={editForm.bio}
                      onChange={handleEditChange}
                      className="form-input"
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>

                  <div className="edit-actions">
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSaveProfile}>
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="profile-name-section">
                    <h1 className="profile-name">{user?.username}</h1>
                    <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                      <i className="fas fa-edit"></i>
                      <span>Edit Profile</span>
                    </button>
                  </div>

                  <p className="profile-bio">{profile.bio}</p>

                  <div className="profile-meta">
                    {profile.location && (
                      <div className="meta-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{profile.location}</span>
                      </div>
                    )}

                    <div className="meta-item">
                      <i className="fas fa-calendar-alt"></i>
                      <span>Joined {profile.joinDate}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">{profile.stats.posts}</div>
              <div className="stat-label">Posts</div>
            </div>

            <div className="stat-item">
              <div className="stat-value">{profile.stats.followers}</div>
              <div className="stat-label">Followers</div>
            </div>

            <div className="stat-item">
              <div className="stat-value">{profile.stats.following}</div>
              <div className="stat-label">Following</div>
            </div>

            <div className="stat-item">
              <div className="stat-value">{profile.stats.impressions}</div>
              <div className="stat-label">Impressions</div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === "posts" ? "active" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              <i className="fas fa-th-large"></i>
              <span>Posts</span>
            </button>

            <button
              className={`tab-btn ${activeTab === "saved" ? "active" : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              <i className="fas fa-bookmark"></i>
              <span>Saved</span>
            </button>

            <button
              className={`tab-btn ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              <i className="fas fa-chart-line"></i>
              <span>Activity</span>
            </button>
          </div>

          <div className="profile-tab-content">
            {activeTab === "posts" && (
              <div className="posts-grid">
                {posts.map((post) => (
                  <div className="post-item" key={post.id}>
                    <div className="post-content">
                      <p>{post.content}</p>
                    </div>

                    <div className="post-footer">
                      <div className="post-meta">
                        <span>{post.timestamp}</span>
                      </div>

                      <div className="post-stats">
                        <div className="post-stat">
                          <i className="fas fa-heart"></i>
                          <span>{post.likes}</span>
                        </div>

                        <div className="post-stat">
                          <i className="fas fa-comment"></i>
                          <span>{post.comments}</span>
                        </div>

                        <div className="post-flag">
                          {post.flagStatus === "green" && <div className="flag green-flag"></div>}
                          {post.flagStatus === "red" && <div className="flag red-flag"></div>}
                          {post.flagStatus === "blank" && <div className="flag blank-flag"></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="empty-state">
                <i className="fas fa-bookmark"></i>
                <p>You haven't saved any posts yet</p>
                <button className="btn btn-secondary">Browse Feed</button>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="activity-chart">
                <h3>Profile Views</h3>
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    <div className="chart-bar" style={{ height: "60%" }}></div>
                    <div className="chart-bar" style={{ height: "40%" }}></div>
                    <div className="chart-bar" style={{ height: "80%" }}></div>
                    <div className="chart-bar" style={{ height: "30%" }}></div>
                    <div className="chart-bar" style={{ height: "70%" }}></div>
                    <div className="chart-bar" style={{ height: "50%" }}></div>
                    <div className="chart-bar" style={{ height: "90%" }}></div>
                  </div>
                  <div className="chart-labels">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                <div className="activity-stats">
                  <div className="activity-stat">
                    <div className="stat-value">128</div>
                    <div className="stat-label">Profile Views</div>
                  </div>

                  <div className="activity-stat">
                    <div className="stat-value">1.2k</div>
                    <div className="stat-label">Post Impressions</div>
                  </div>

                  <div className="activity-stat">
                    <div className="stat-value">45</div>
                    <div className="stat-label">New Followers</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
