"use client"

import "../styles/Checkbox.css"

const Checkbox = ({ id, label, checked, onChange, className = "" }) => {
  return (
    <div className={`checkbox-container ${className}`}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} className="checkbox" />
      {label && (
        <label htmlFor={id} className="checkbox-label">
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox
