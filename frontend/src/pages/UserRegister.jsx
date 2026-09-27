import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/theme.css'
import '../styles/auth.css'

const UserRegister = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false,
  })

  // const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const firstName=e.target.firstName.value
    const lastName=e.target.lastName.value
    const email=e.target.email.value
    const password=e.target.password.value


    const response=await axios.post("http://localhost:3000/api/auth/user/register",{
      fullName:firstName+ " "+ lastName,
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Join us to discover delicious food from your favorite restaurants
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <div className="form-input-group">
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <div className="form-input-group">
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

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
            <label className="form-label">Password</label>
            <div className="form-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="Create a strong password"
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
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <span>
              I agree to the{' '}
              <a href="#terms" target="_blank" rel="noreferrer">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="#privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
            </span>
          </label>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>

        <div className="auth-toggle-link">
          <div className="auth-footer">
            <span className="toggle-text">Already have an account?</span>
            <a href="/user/login">Sign In</a>
          </div>
        </div>

        <div className="auth-toggle-link">
          <div className="auth-footer">
            <span className="toggle-text">Are you a food partner?</span>
            <a href="/food-partner/register">Register Here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegister
