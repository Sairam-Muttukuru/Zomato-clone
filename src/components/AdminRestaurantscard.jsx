import '../styles/AdminRestaurantscard.css'
import { LuStar } from "react-icons/lu";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import React, { useState } from 'react';
function AdminRestaurantscard(props) {
  const [deleting, setDeleting] = useState(false);
  return (
    <div className="rest-containerA">
      <div className="rest-cardA">
        <img className="rest-imageA" src={props.src} alt={props.name} />
        <div className="rest-nameA">{props.name}</div>

        <button className={props.rating > 4 ? 'highrating-badgeA' : 'lowrating-badgeA'}>
          {props.rating}
          <span className='starA'><LuStar /></span>
        </button>

        <div className='detailsA'>
          <div className='offerA'><p>{props.offer}% OFF</p></div>
          <div className='price-starts-fromA'><p>₹{props.price_starts} for one</p></div>
          <div className='minutesA'><p>{props.minutes} mins</p></div>
        </div>

        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            console.log('=== EDIT BUTTON CLICKED ===');
            console.log('Restaurant ID:', props.id);
            console.log('Restaurant name:', props.name);
            console.log('========================');
            if (props.onEdit) {
              props.onEdit();
            } else {
              console.log('onEdit prop not provided');
            }
          }}
        >
          <span>Edit</span>
          <MdOutlineModeEdit size={18} />
        </button>

        <button
  className="delete-btn"
  disabled={deleting}
  onClick={async(e) => {
    e.stopPropagation();
    console.log('Delete button clicked for restaurant:', props.id);
    if(!window.confirm("Are you sure you want to delete this restaurant? This action cannot be undone.")) {
      toast.error(`cancelled the deletion of restaurant${props.name}`);
      return;
    } 
    else{
      toast.info(`deleting the restaurant ${props.name}`);
    }
    try {
      setDeleting(true);
      // Optimistic: update UI first
      if (props.onDelete) props.onDelete(props.id);
      await axios.delete(`http://localhost:3000/delete/restaurant/${props.id}`);
      toast.success("Restaurant deleted successfully! ✅");
    } catch (err) {
      console.error("Error deleting restaurant:", err);
      toast.error("Failed to delete restaurant ❌");
      // alert("Failed to delete restaurant");
    } finally { setDeleting(false); }
  }}
>
  <span>{deleting ? 'Deleting...' : 'Delete'}</span>
  <MdDeleteOutline size={20} />
</button>
      </div>
    </div>
  );
}

export default AdminRestaurantscard;
