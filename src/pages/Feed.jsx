import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import "./Feed.css"

const Feed = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setError(null)
    try {
      const res = await fetch("/api/posts")
      const data = await res.json()
      if (res.ok) {
        setPosts(data)
      } else {
        setError("Failed to load posts")
      }
    } catch (err) {
      setError("Cannot connect to server. Make sure the backend is running.")
      console.error("Failed to fetch posts", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "green") return post.flagStatus === "green"
    if (activeTab === "red") return post.flagStatus === "red"
    return true
  })

  // Check if user has liked/disliked — compare as strings for safety
  const hasLiked = (post) => {
    if (!user) return false
    const uid = user._id || user.id
    return post.likes.some((id) => id.toString() === uid?.toString())
  }

  const hasDisliked = (post) => {
    if (!user) return false
    const uid = user._id || user.id
    return post.dislikes.some((id) => id.toString() === uid?.toString())
  }

  const hasReported = (post) => {
    if (!user) return false
    const uid = user._id || user.id
    return post.reports.some((id) => id.toString() === uid?.toString())
  }

  const handleAction = async (postId, action) => {
    if (!user) return
    try {
      const res = await fetch(`/api/posts/${postId}/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        fetchPosts()
      }
    } catch (err) {
      console.error(`Failed to ${action} post`, err)
    }
  }

  const getFlagLabel = (status) => {
    if (status === "green") return { label: "Green Flag", cls: "flag-green" }
    if (status === "red") return { label: "Red Flag", cls: "flag-red" }
    return { label: "New", cls: "flag-blank" }
  }

  return (
    <div className="feed-page">
      <div className="container">
        <div className="feed-header">
          <h1>Feed</h1>
          <div className="feed-tabs">
            <button className={`tab-btn ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All</button>
            <button className={`tab-btn ${activeTab === "green" ? "active" : ""}`} onClick={() => setActiveTab("green")}>🟢 Green Flag</button>
            <button className={`tab-btn ${activeTab === "red" ? "active" : ""}`} onClick={() => setActiveTab("red")}>🔴 Red Flag</button>
          </div>
        </div>

        {error && <div className="alert-error">{error}</div>}

        <div className="posts-container">
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const flag = getFlagLabel(post.flagStatus)
              return (
                <div className="post-card" key={post._id}>
                  <div className="post-header">
                    <div className="post-user">
                      <div className="avatar">
                        <img
                          src={post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user?.username || "U"}&background=ffa07a&color=fff`}
                          alt={post.user?.username || "User"}
                        />
                      </div>
                      <div className="user-info">
                        <div className="user-name">@{post.user?.username || "anonymous"}</div>
                        <div className="post-meta">{new Date(post.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                    <span className={`post-flag-badge ${flag.cls}`}>{flag.label}</span>
                  </div>

                  <div className="post-content">
                    <p>{post.content}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="post-tags">
                        {post.tags.map((tag) => (
                          <span key={tag} className="post-tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="post-actions">
                    <div className="action-buttons">
                      <button
                        className={`action-btn ${hasLiked(post) ? "active liked" : ""}`}
                        onClick={() => handleAction(post._id, "like")}
                      >
                        <i className="fas fa-thumbs-up"></i>
                        <span>{post.likes.length}</span>
                      </button>
                      <button
                        className={`action-btn ${hasDisliked(post) ? "active disliked" : ""}`}
                        onClick={() => handleAction(post._id, "dislike")}
                      >
                        <i className="fas fa-thumbs-down"></i>
                        <span>{post.dislikes.length}</span>
                      </button>
                    </div>
                    <div className="action-buttons">
                      <button
                        className={`action-btn ${hasReported(post) ? "reported" : ""}`}
                        onClick={() => handleAction(post._id, "report")}
                        title="Report post"
                      >
                        <i className="fas fa-flag"></i>
                        {post.reports.length > 0 && <span>{post.reports.length}</span>}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-posts">
              <i className="fas fa-inbox"></i>
              <p>No posts found in this category</p>
              <small>Be the first to post something!</small>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Feed
