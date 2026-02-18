import React, { useRef, useState } from "react";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../styles/AdminRest.css";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminRest() {
  // const navigate = useNavigate();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [offer, setOffer] = useState("");
  const [price_starts, setPrice_starts] = useState("");
  const [minutes, setMinutes] = useState("");
  // const [foodtype,setfoodtype] = useState("");

  const [file, setFile] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // const [restaurants, setRestaurants] = useState([]);
  // const [editId, setEditId] = useState(null);
  // const [editData, setEditData] = useState({}); 
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name.trim() || !file) {
      alert("Please fill in all required fields!");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "First_project");

      const res = await fetch("https://api.cloudinary.com/v1_1/dghdwtef5/image/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        throw new Error("Cloudinary upload failed");
      }
      const data = await res.json();
      const url = data.secure_url;

      await axios.post("http://localhost:3000/admin/foods/restaurants", {
        name: name.trim(),
        rating,
        img1,
        img2,
        address,
        phone,
        category,
        offer,
        price_starts,
        minutes,
        img: url,
      });

      // reset
      setName("");
      setRating("");
      setImg1("");
      setImg2("");
      setAddress("");
      setPhone("");
      setCategory("");
      setFile(null);
      // setPreviewUrl(null);
      setOffer("");
      setPrice_starts("");
      setMinutes("");
      // setfoodtype("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      // fetchRestaurants();
    } catch (err) {
      console.error("Error uploading:", err);
    } finally {
      setUploading(false);
    }
    toast.success(`${name} is uploaded successfully!`);
  };
  // const handleEdit = (restaurant) => {
  //   setEditId(restaurant._id);
  //   setEditData({ ...restaurant });
  // };
  // const handleEditChange = (field, value) => {
  //   setEditData((prev) => ({ ...prev, [field]: value }));
  // };
  // const handleCancel = () => {
  //   setEditId(null);
  //   setEditData({});
  // };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1 className="admin-res-title">🍴 Admin Dashboard</h1>
        <p className="admin-res-subtitle">Add new restaurant</p>

        {/* Upload form */}
        <form className="form-grid" onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Food / Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Rating (e.g. 4.5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type="text"
            placeholder="First Image URL for gallery"
            value={img1}
            onChange={(e) => setImg1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Second Image URL for gallery"
            value={img2}
            onChange={(e) => setImg2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category (e.g. Fast Food, Cafe)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter offer (eg. 20% off)"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price Starts From (e.g. 200)"
            value={price_starts}
            onChange={(e) => setPrice_starts(e.target.value)}
          />
          <input
            type="text"
            placeholder="Minutes (e.g. 30 mins)"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />

          <label className="file-drop">
            <IoCloudUploadOutline size={30} />
            <span>{file ? file.name : "Click or Drop Image Here"}</span>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <button type="submit" className="upload-btn" disabled={uploading}>
            {uploading ? "⏳ Uploading..." : "🚀 Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRest;
