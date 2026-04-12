import "../styles/Card.css"

export const Card = ({ children, className = "" }) => {
  return <div className={`card ${className}`}>{children}</div>
}

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`card-header ${className}`}>{children}</div>
}

export const CardTitle = ({ children, className = "" }) => {
  return <h2 className={`card-title ${className}`}>{children}</h2>
}

export const CardDescription = ({ children, className = "" }) => {
  return <p className={`card-description ${className}`}>{children}</p>
}

export const CardContent = ({ children, className = "" }) => {
  return <div className={`card-content ${className}`}>{children}</div>
}

export const CardFooter = ({ children, className = "" }) => {
  return <div className={`card-footer ${className}`}>{children}</div>
}

