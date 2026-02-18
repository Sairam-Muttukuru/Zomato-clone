import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Adminupdate.css";
import { useParams, useNavigate } from "react-router-dom";

function Adminupdate() {
  const { id } = useParams(); // Get restaurant id from URL
  const navigate = useNavigate();

  // Form fields
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img, setImg] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [offer, setOffer] = useState("");
  const [price_starts, setPrice_starts] = useState("");
  const [minutes, setMinutes] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef();

  // Fetch only this restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log("Fetching restaurant with ID:", id);
        const res = await axios.get(`http://localhost:3000/restaurants/${id}`);
        const data = res.data[0];
        if (data) {
          setName(data.name || "");
          setRating(data.rating || "");
          setImg1(data.img1 || "");
          setImg2(data.img2 || "");
          setAddress(data.address || "");
          setPhone(data.phone || "");
          setCategory(data.category || "");
          setOffer(data.offer || "");
          setPrice_starts(data.price_starts || "");
          setMinutes(data.minutes || "");
          setImg(data.img || "");
          console.log("Restaurant data loaded successfully:", data);
        } else {
          console.log("No restaurant data found");
          alert("Restaurant not found");
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        if (error.response?.status === 404) {
          alert("Restaurant not found");
        } else if (error.response?.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("Failed to load restaurant data");
        }
      }
    };
    
    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  // File change preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  // Update restaurant
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let url = null;
      if (file) {
        setUploading(true);
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
        url = data.secure_url;
      }

      await axios.put(`http://localhost:3000/admin/update/${id}`, {
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
      alert("Restaurant updated successfully!");
      navigate("/admin/foods/restaurants"); 
    } catch (err) {
      console.error("Error updating:", err);
      alert("Failed to update restaurant");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="admin-update-container">
      <h2>Edit Restaurant</h2>
      <form className="admin-update-form" onSubmit={handleUpdate}>
        <input type="text" 
        placeholder="Restaurant Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
         />
        <input type="number" 
        placeholder="Rating" 
        value={rating} 
        onChange={(e) => setRating(e.target.value)} 
        />
        <input type="text" 
        placeholder="Image 1 URL" 
        value={img1}
         onChange={(e) => setImg1(e.target.value)}
        />
        <input type="text" 
        placeholder="Image 2 URL"
         value={img2} 
         onChange={(e) => setImg2(e.target.value)}
        />
        <input type="text" 
        placeholder="Address" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        />
        <input type="text"
         placeholder="Phone" 
         value={phone} 
         onChange={(e) => setPhone(e.target.value)} 
         />
        <input type="text" 
        placeholder="Category"
         value={category} 
         onChange={(e) => setCategory(e.target.value)}
        />
        <input type="number" 
        placeholder="Offer (%)"
         value={offer} 
         onChange={(e) => setOffer(e.target.value)}
        />
        <input type="number"
         placeholder="Price Starts From" 
         value={price_starts} 
         onChange={(e) => setPrice_starts(e.target.value)} 
        />
        <input type="number" 
        placeholder="Minutes" 
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)} 
        />

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" style={{ width: "120px", marginTop: "10px" }} />}

        <button type="submit" disabled={uploading}>{uploading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
}

export default Adminupdate;
