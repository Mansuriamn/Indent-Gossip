"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

const API_BASE_URL = "/api" // Proxy will handle this in development, or absolute URL in prod

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage on mount
    const checkLoggedIn = async () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        // Verify with backend
        try {
          const res = await fetch(`${API_BASE_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          })
          if (res.ok) {
            const userData = await res.json()
            setUser({ ...userData, token: parsedUser.token })
          } else {
            localStorage.removeItem("user")
          }
        } catch (err) {
          console.error("Token verification failed", err)
        }
      }
      setLoading(false)
    }
    checkLoggedIn()
  }, [])

  const login = async (email, password) => {
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))
        return true
      } else {
        setError(data.message)
        return false
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      return false
    }
  }

  const signup = async (username, email, password) => {
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data)
        localStorage.setItem("user", JSON.stringify(data))
        return true
      } else {
        setError(data.message)
        return false
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUser = async (updatedData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      })
      const data = await res.json()
      if (res.ok) {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
    } catch (err) {
      console.error("Update failed", err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}
