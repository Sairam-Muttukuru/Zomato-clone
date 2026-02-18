import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../styles/AdminPage.css";

function AdminPage() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [vegnonveg,setVegnonveg] = useState("");
  // Build & clean preview URL whenever file changes
  useEffect(() => {
    if (!file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  const handleUpload = async (e) => {
     e.preventDefault();
    if (!name.trim() || !file) {
      alert("Please enter a name and select an image!");
      return;
    }

    setUploading(true);
    try {
      // 1) Upload to Cloudinary (use fetch to avoid sending Authorization header)
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "First_project"); // your unsigned preset

      const res = await fetch("https://api.cloudinary.com/v1_1/dghdwtef5/image/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        throw new Error("Cloudinary upload failed");
      }
      const data = await res.json();
      const url = data.secure_url;

      // 2) Save to your backend/DB (fix path: /admin/foods/restaurants)
      await axios.post("http://localhost:3000/admin/foods/restaurants", {
        name: name.trim(),
        url:url,
        vegnonveg: vegnonveg
      });

      // 3) Hard reset all inputs + preview
      setName("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // (optional) toast
      // alert("Uploaded successfully!");
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">🍴 Admin Dashboard</h1>
      <p className="admin-res-subtitle">Add new Food</p>

      <div className="upload-section">
        <input
          type="text"
          placeholder="Enter food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="food-input"
        />
        <input
          type="text"
          placeholder="Enter food is veg or non-veg"
          value={vegnonveg}
          onChange={(e) => setVegnonveg(e.target.value)}
          className="food-input"
        />

        <label className="file-label">
          <IoCloudUploadOutline size={25} />
          <span>{file ? file.name : "Choose Image"}</span>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>

        <button
          onClick={handleUpload} 
          className="upload-btn"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Preview only when a file is selected */}
      {previewUrl && (
        <div className="preview">
          <h3>Preview:</h3>
          <img src={previewUrl} alt="Preview" className="preview-img" />
        </div>
      )}
    </div>
  );
}

export default AdminPage;
