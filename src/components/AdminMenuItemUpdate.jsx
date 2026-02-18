import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function AdminMenuItemUpdate() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = location.state || {};

  const [restaurantId, setRestaurantId] = useState(fromState.restaurantId || "");
  const [restaurantName, setRestaurantName] = useState(fromState.restaurantName || "Restaurant");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [vegOrNonveg, setVegOrNonveg] = useState("");
  const [img, setImg] = useState("");

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fromState.item) {
      const it = fromState.item;
      console.log("[AdminMenuItemUpdate] Pre-filling from navigation state", it);
      setCategory(it.category || "");
      setName(it.name || "");
      setDescription(it.description || "");
      setPrice(String(it.price ?? ""));
      setVegOrNonveg(it.veg_or_nonveg || it.vegOrNonVeg || "");
      setImg(it.img || "");

      if (!restaurantId && (it.restaurant_id || it.restaurantId)) {
        setRestaurantId(it.restaurant_id || it.restaurantId);
      }
    }
  }, [fromState.item]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/menuitem/${itemId}`);
        const data = res.data?.item || res.data;
        if (!data) {
          if (!fromState.item) toast.error("Failed to load menu item");
          return;
        }
        setRestaurantId((prev) => prev || data.restaurant_id || data.restaurantId || "");
        setCategory((prev) => prev || data.category || "");
        setName((prev) => prev || data.name || "");
        setDescription((prev) => prev || data.description || "");
        setPrice((prev) => prev || String(data.price ?? ""));
        setVegOrNonveg((prev) => prev || data.veg_or_nonveg || data.vegOrNonVeg || "");
        setImg((prev) => prev || data.img || "");
        if (data.restaurant_name) setRestaurantName(data.restaurant_name);
      } catch (err) {
        console.error("Error fetching menu item:", err);
        if (!fromState.item) toast.error("Failed to load menu item");
      }
    };
    if (itemId && !fromState.item) fetchItem();
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [itemId, previewUrl, fromState.item]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreviewUrl(URL.createObjectURL(f));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      let newUrl = img || null;
      if (file) {
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
        newUrl = data.secure_url;
      }

      await axios.put(`http://localhost:3000/admin/menu/update/${itemId}`, {
        restaurant_id: Number(restaurantId) || undefined,
        category: category.trim(),
        name: name.trim(),
        description,
        price,
        veg_or_nonveg: vegOrNonveg,
        img: newUrl,
      });

      toast.success("Menu item updated successfully ✅");
      // If we know the restaurant route, go back to it with proper name; otherwise back
      if (restaurantId) {
        const nameToUse = restaurantName || fromState.restaurantName || "Restaurant";
        navigate(`/admin/menu/${restaurantId}/${encodeURIComponent(nameToUse)}`);
      } else {
        navigate(-1);
      }
    } catch (err) {
      console.error("Error updating menu item:", err);
      toast.error("Failed to update menu item ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-menu-container" style={{ display: "flex", justifyContent: "center", padding: 30 }}>
      <div className="admin-menu-card" style={{ background: "#fff", padding: 25, borderRadius: 10, width: 500, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h1 className="admin-menu-title" style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "#e23744", marginBottom: 16 }}>
          ✏️ Edit Menu Item
        </h1>
        <form className="form-grid" onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input type="text" placeholder="Food Name" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea placeholder="Description" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="text" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="text" placeholder="veg or nonveg" value={vegOrNonveg} onChange={(e) => setVegOrNonveg(e.target.value)} />

          {/* Show existing image */}
          {img && !previewUrl && (
            <div className="preview-wrapper" style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <img src={img} alt="current" style={{ width: 200, height: 160, objectFit: "cover", borderRadius: 10, border: "1px solid #ddd" }} />
            </div>
          )}

          <label className="file-drop" style={{ display: "flex", alignItems: "center", gap: 8, border: "2px dashed #e23744", borderRadius: 6, padding: 10, cursor: "pointer", justifyContent: "center" }}>
            <IoCloudUploadOutline size={30} />
            <span>{file ? file.name : "Choose New Image (optional)"}</span>
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileChange} />
          </label>

          {previewUrl && (
            <div className="preview-wrapper" style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <img src={previewUrl} alt="preview" style={{ width: 200, height: 160, objectFit: "cover", borderRadius: 10, border: "1px solid #ddd" }} />
            </div>
          )}

          <button type="submit" className="upload-btn" disabled={uploading} style={{ background: "#e23744", color: "#fff", padding: 12, border: "none", borderRadius: 6, fontSize: 16, cursor: "pointer" }}>
            {uploading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminMenuItemUpdate;
