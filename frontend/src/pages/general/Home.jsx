import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/reels.css'

const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🎥 Auto play when video is in view
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('.reel-item'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video')
          if (!video) return

          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            video.play().catch(() => {})
          } else {
            video.pause()
            video.currentTime = 0
          }
        })
      },
      { root: null, threshold: [0.6] }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [videos])

  // 📡 Fetch food items
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)

        const response = await axios.get(
          "http://localhost:3000/api/food",
          { withCredentials: true }
        )

        const foodItems = response.data.foodItems || []
        console.log("Fetched Food Items:", foodItems)

        setVideos(foodItems)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch videos:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div className="reels-container">
      {loading && <p>Loading videos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && videos.length === 0 && <p>No videos available</p>}

      {videos.map((item) => {
        // 🔥 Handle both cases:
        // 1. foodPartner is populated object
        // 2. foodPartner is just ID string

        const partnerId =
          typeof item.foodPartner === "object"
            ? item.foodPartner?._id
            : item.foodPartner

        return (
          <section className="reel-item" key={item._id}>
            <video
              src={item.video}
              playsInline
              muted
              loop
              className="reel-video"
              preload="metadata"
            />

            <div className="reel-overlay">
              <p className="reel-desc">{item.description}</p>

              {partnerId && (
                <Link
                  className="reel-btn"
                  to={`/food-partner/${partnerId}`}
                >
                  Visit Store
                </Link>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default Home
