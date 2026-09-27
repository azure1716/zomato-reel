import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/theme.css'
import '../styles/auth.css'

const FoodPartnerLogin = () => {
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
  
  
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // We use formData directly from your state
      const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
        email: formData.email,
        password: formData.password
      }, {
        withCredentials: true // Important for storing the JWT cookie
      });

      console.log("Login Successful:", response.data);
      
      // Navigate to the next page upon success
      navigate("/create-food");

    } catch (err) {
      // This catches the 400 error and tells you why it failed
      const errorMessage = err.response?.data?.message || "Login failed";
      console.error("Auth Error:", errorMessage);
      alert(errorMessage); 
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-container food-partner">
        <div className="auth-header">
          <div className="auth-logo">👨‍🍳</div>
          <div className="auth-type-badge">Food Partner</div>
          <h1 className="auth-title">Partner Dashboard</h1>
          <p className="auth-subtitle">
            Sign in to manage your restaurant and orders
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
                placeholder="business@restaurant.com"
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
            Sign In to Dashboard
          </button>
        </form>

        <div className="auth-toggle-link">
          <div className="auth-footer">
            <span className="toggle-text">New to our platform?</span>
            <a href="/food-partner/register">Register Your Restaurant</a>
          </div>
        </div>

        <div className="auth-toggle-link">
          <div className="auth-footer">
            <span className="toggle-text">Are you a normal user?</span>
            <a href="/user/login">Login Here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
