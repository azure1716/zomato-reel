import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreateFood() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert("Please upload a video");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("video", video);

      const res = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        {
          withCredentials: true, // required for JWT cookie
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      navigate("/")
      // Reset form
      setName("");
      setDescription("");
      setVideo(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to upload food item";
      alert("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Add New Food Item</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <textarea
            placeholder="Food Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          />

          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={styles.file}
          />

          {preview && (
            <video
              src={preview}
              controls
              style={styles.videoPreview}
            />
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Uploading..." : "Upload Food"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  },
  heading: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#fff",
    fontSize: "14px",
    height: "100px",
    resize: "none",
    outline: "none",
  },
  file: {
    color: "#cbd5e1",
  },
  videoPreview: {
    width: "100%",
    borderRadius: "10px",
    marginTop: "10px",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6366f1",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
