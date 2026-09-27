import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/theme.css'
import '../styles/auth.css'

const FoodPartnerRegister = () => {
    const navigate=useNavigate()
  
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    address: '',
    password: '',
    agreeTerms: false,
  })

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
    const business=e.target.restaurantName.value
    const name=e.target.ownerName.value
    const address=e.target.address.value
    const email=e.target.email.value
    const password=e.target.password.value


    const response=await axios.post("http://localhost:3000/api/auth/food-partner/register",{
      business_name:business,
      name,
      address,
      email,password
    },{
      withCredentials:true
    })

    console.log(response.data)
    navigate("/create-food")
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container food-partner">
        <div className="auth-header">
          <div className="auth-logo">👨‍🍳</div>
          <div className="auth-type-badge">Food Partner</div>
          <h1 className="auth-title">Partner With Us</h1>
          <p className="auth-subtitle">
            Register your restaurant and start reaching more customers today
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Restaurant Name</label>
              <div className="form-input-group">
                <input
                  type="text"
                  name="restaurantName"
                  className="form-input"
                  placeholder="Your Restaurant"
                  value={formData.restaurantName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Owner Name</label>
              <div className="form-input-group">
                <input
                  type="text"
                  name="ownerName"
                  className="form-input"
                  placeholder="Your Name"
                  value={formData.ownerName}
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
                placeholder="business@restaurant.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <div className="form-input-group">
              <input
                type="text"
                name="address"
                className="form-input"
                placeholder="Your Restaurant Address"
                value={formData.address}
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
            Create Business Account
          </button>
        </form>

        <div className="auth-toggle-link">
          <div className="auth-footer">
            <span className="toggle-text">Already partner with us?</span>
            <a href="/food-partner/login">Sign In</a>
          </div>
        </div>

        <div className="auth-toggle-link">
          <div className="auth-footer">
            <span className="toggle-text">Are you a normal user?</span>
            <a href="/user/register">Register Here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
