import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../../styles/profile.css'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/food-partner/${id}`,
          { credentials: "include" }
        )

        if (response.status === 401) {
          navigate('/user/login');
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfileData(data.foodPartner);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProfileData()
  }, [id, navigate])

  if (loading) return <div className="center">Loading...</div>
  if (error) return <div className="center">{error}</div>
  if (!profileData) return <div className="center">Profile not found</div>

  const videos = profileData.foodItems || []

  return (
    <div className="profile-container">

      {/* 🔹 Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar" />

        <div className="profile-info">
          <h2>{profileData.businessName || profileData.name}</h2>
          <p>{profileData.address || "No address provided"}</p>

          <div className="profile-stats">
            <div>
              <strong>{videos.length}</strong>
              <span>Posts</span>
            </div>
            <div>
              <strong>{profileData.customersServed || 0}</strong>
              <span>Customers</span>
            </div>
            <div>
              <strong>{profileData.totalMeals || 0}</strong>
              <span>Meals</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Grid Feed */}
      <div className="grid-feed">
        {videos.length > 0 ? (
          videos.map((item, index) => (
            <div className="grid-item" key={index}>
              <video
                src={item.video}
                muted
                playsInline
                className="grid-video"
              />
              <div className="reel-icon">🎬</div>
            </div>
          ))
        ) : (
          <div className="no-posts">No videos uploaded yet</div>
        )}
      </div>

    </div>
  )
}

export default Profile
