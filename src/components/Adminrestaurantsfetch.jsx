import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminRestaurantscard from "./AdminRestaurantscard";

function Adminrestaurantsfetch() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/home/restaurants`);
        console.log("Fetched restaurants:", res.data);
        const restaurantData = res.data.restaurant || [];
        setRestaurants(restaurantData);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };
    fetchRestaurants();
  }, []);

  // Navigate to update page for this restaurant
  const handleEdit = (id) => {
    navigate(`/admin/update/${id}`);
  };

  // After AdminRestaurantscard performs the delete request successfully,
  // this handler is invoked to update local state.
  const handleDelete = (id) => {
    setRestaurants((prev) => prev.filter((r) => String(r.id) !== String(id)));
  };

  console.log("Rendering restaurant:", restaurants);

  if (restaurants.length === 0) {
    return (
      <div className="restaurants-list">
        <p>No restaurants found. Make sure backend is running.</p>
      </div>
    );
  }

  return (
    <div className="restaurants-list">
      {restaurants.map((rest) => {
        return (
          <AdminRestaurantscard
            key={rest.id}
            id={rest.id}
            name={rest.name}
            rating={rest.rating}
            src={rest.img}
            category={rest.category}
            offer={rest.offer}
            minutes={rest.minutes}
            price_starts={rest.price_starts}
            onEdit={() => handleEdit(rest.id)}
            onDelete={() => handleDelete(rest.id)}
          />
        );
      })}
    </div>
  );
}
export default Adminrestaurantsfetch;