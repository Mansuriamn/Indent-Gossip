"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Verification.css"

const Verification = () => {
  const navigate = useNavigate()
  const [usePuzzle, setUsePuzzle] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [isRobotChecked, setIsRobotChecked] = useState(false)
  const [arrowPosition, setArrowPosition] = useState({ x: 50, y: 100 })
  const [targetPosition, setTargetPosition] = useState({ x: 250, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (usePuzzle && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw target
      ctx.fillStyle = "#52c41a"
      ctx.beginPath()
      ctx.arc(targetPosition.x, targetPosition.y, 20, 0, Math.PI * 2)
      ctx.fill()

      // Draw arrow
      ctx.fillStyle = "#FFA07A"
      ctx.beginPath()
      ctx.moveTo(arrowPosition.x, arrowPosition.y)
      ctx.lineTo(arrowPosition.x - 15, arrowPosition.y + 10)
      ctx.lineTo(arrowPosition.x - 15, arrowPosition.y - 10)
      ctx.closePath()
      ctx.fill()

      // Check if arrow is close to target
      const distance = Math.sqrt(
        Math.pow(arrowPosition.x - targetPosition.x, 2) + Math.pow(arrowPosition.y - targetPosition.y, 2),
      )

      if (distance < 30) {
        setIsVerified(true)
      }
    }
  }, [arrowPosition, targetPosition, usePuzzle])

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (isDragging && canvasRef.current) {
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      setArrowPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleRobotCheckChange = () => {
    setIsRobotChecked(!isRobotChecked)

    if (!isRobotChecked) {
      // Simulate verification delay
      setTimeout(() => {
        setIsVerified(true)
      }, 1500)
    } else {
      setIsVerified(false)
    }
  }

  const handleContinue = () => {
    navigate("/feed")
  }

  const toggleVerificationMethod = () => {
    setUsePuzzle(!usePuzzle)
    setIsVerified(false)
    setIsRobotChecked(false)
  }

  return (
    <div className="verification-page">
      <div className="verification-container">
        <div className="verification-card">
          <div className="verification-header">
            <h2>Human Verification</h2>
            <p>Complete the verification to continue</p>
          </div>

          <div className="verification-content">
            {usePuzzle ? (
              <div className="puzzle-verification">
                <p className="verification-instruction">Drag the arrow toward the green circle</p>
                <div className="canvas-container">
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={200}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  />
                </div>
              </div>
            ) : (
              <div className="checkbox-verification">
                <label className="robot-checkbox">
                  <input type="checkbox" checked={isRobotChecked} onChange={handleRobotCheckChange} />
                  <span className="checkbox-label">I'm not a robot</span>
                </label>
              </div>
            )}

            {isVerified && (
              <div className="verification-success">
                <i className="fas fa-check-circle"></i>
                <p>Verification successful! You can continue.</p>
              </div>
            )}

            <button className="btn btn-secondary btn-block toggle-method" onClick={toggleVerificationMethod}>
              {usePuzzle ? "Use checkbox verification instead" : "Use puzzle verification instead"}
            </button>
          </div>

          <div className="verification-footer">
            <button className="btn btn-primary btn-block" onClick={handleContinue} disabled={!isVerified}>
              Continue to App
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verification
