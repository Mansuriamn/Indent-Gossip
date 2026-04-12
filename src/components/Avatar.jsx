import "../styles/Avatar.css"

const Avatar = ({ src, alt = "Avatar", size = "md", fallback, className = "" }) => {
  return (
    <div className={`avatar avatar-${size} ${className}`}>
      {src ? (
        <img src={src || "/placeholder.svg"} alt={alt} className="avatar-image" />
      ) : (
        <div className="avatar-fallback">{fallback || alt.charAt(0).toUpperCase()}</div>
      )}
    </div>
  )
}

export default Avatar
