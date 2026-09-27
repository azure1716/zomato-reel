import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/theme.css'
import '../styles/auth.css'

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }
   const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    const email=e.target.email.value
    const password=e.target.password.value

    const response=await axios.post("http://localhost:3000/api/auth/user/login",{
      
      email,password
    },{
      withCredentials:true
    })

    
    console.log(response.data)
    navigate("/")
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">🍕</div>
          <div className="auth-type-badge">User</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            Sign in to your account and explore amazing food options
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="form-input-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              <label className="form-label" style={{ margin: 0 }}>
                Password
              </label>
              <a
                href="#forgot"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                }}
              >
                Forgot?
              </a>
            </div>
            <div className="form-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <label className="form-checkbox">
            <input
              type="checkbox"
              name="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <span>Show Password</span>
          </label>

          <label className="form-checkbox">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span>Remember me on this device</span>
          </label>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>

        <div className="auth-toggle-link">
          <div className="auth-footer">
            <span className="toggle-text">Don't have an account?</span>
            <a href="/user/register">Create One</a>
          </div>
        </div>

        <div className="auth-toggle-link">
          <div className="auth-footer">
            <span className="toggle-text">Are you a food partner?</span>
            <a href="/food-partner/login">Login Here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
