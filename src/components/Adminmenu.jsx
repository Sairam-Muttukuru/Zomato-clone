import React, { useRef, useState ,useEffect} from "react";
import axios from "axios";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../styles/AdminMenu.css";
// removed local header icons
import { useParams } from "react-router-dom";
import Adminmenulist from "./Adminmenulist";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";   // ✅ import toast
import "react-toastify/dist/ReactToastify.css";

function AdminMenu() {
  const navigate = useNavigate();
  const {id:restaurant_id} = useParams(); 
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [vegornonveg,setVegornonveg] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // ✅ Upload new menu item
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name.trim() || !category.trim() || !file) {
      toast.error("⚠️ Please fill in all required fields!");  // ✅ toast error
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "First_project");

      // Use fetch so no Authorization header is sent to Cloudinary (avoids CORS issue)
      const res = await fetch("https://api.cloudinary.com/v1_1/dghdwtef5/image/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        throw new Error("Cloudinary upload failed");
      }
      const data = await res.json();
      const url = data.secure_url;

      const normalizedVeg = (vegornonveg || "")
        .toLowerCase()
        .includes("non")
          ? "nonveg"
          : "veg";

      await axios.post(`http://localhost:3000/admin/menu`, {
        restaurant_id: Number(restaurant_id),
        category,
        name: name.trim(),
        description,
        price,
        img: url,
        veg_or_nonveg: normalizedVeg
      });

      // ✅ Success Toast
      toast.success("🎉 Menu item added successfully!");

      setCategory("");
      setName("");
      setDescription("");
      setPrice("");
      setFile(null);
      setPreviewUrl(null);
      setVegornonveg("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Refresh the current page so Adminmenulist refetches latest menu
      navigate(0);
    } catch (err) {
      console.error("Error uploading:", err);
      toast.error("❌ Failed to add menu item.");   // ✅ Error toast
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const scrollRef = useRef();
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Header removed here. Using global Header from App.jsx */}

      <div className="admin-menu-container">
        <div className="admin-menu-card">
          <h1 className="admin-menu-title">🍽️ Admin Menu Dashboard</h1>
          <p className="admin-menu-subtitle">Add new menu item</p>

          {/* Upload form */}
          <form className="form-grid" onSubmit={handleUpload}>
            <input
              type="text"
              placeholder="Category (e.g. Biryani, Pizza, Tiffin)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Food Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Price (₹)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Enter veg or non-veg"
              value={vegornonveg}
              onChange={(e)=>setVegornonveg(e.target.value)}
            />
            <label className="file-drop">
              <IoCloudUploadOutline size={30} />
              <span>{file ? file.name : "Choose Food Image"}</span>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFile(file);
                  if (file) {
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

            {previewUrl && (
              <div className={file? "pre-img" : "pre-im-no"}>
                <img src={previewUrl} alt="preview" className="preview-img" />
              </div>
            )}

            <button type="submit" className="upload-btn" disabled={uploading}>
              {uploading ? "⏳ Uploading..." : "🚀 Upload"}
            </button>
          </form>
        </div>
      </div>
      <Adminmenulist/>
    </>
  );
}

export default AdminMenu;
