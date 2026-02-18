import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import biryani from '../assets/biryani.png';
import burger from '../assets/burger.png';
import cake from '../assets/cake.png';
import chicken from '../assets/chicken.png';
import dosa from '../assets/dosa.png';
import friedrice from '../assets/friedrice.png';
import idly from '../assets/idly.png';
import Northindian from '../assets/Northindian.png';
import paneer from '../assets/paneer.png';
import paratha from '../assets/paratha.png';
import pizza from '../assets/pizza.png';
import rolls from '../assets/rolls.png';
import Foodlist from '../components/Foodlist.jsx';
// import '../styles/Firstpage.css';
import Login from '../components/Login.jsx'
import Restaurantprops from '../components/Restaurantprops.jsx';
import Footer from '../components/Footer.jsx'
import AdminPage from '../components/AdminPage.jsx';
import "../styles/Admin.css"
import { useNavigate } from 'react-router-dom';
import Resturant from '../components/Resturant.jsx';
import home from '../assets/home.png'
import AdminRest from '../components/AdminRest.jsx';
import food from '../assets/food1.png'
import AdminRestaurantscard from '../components/AdminRestaurantscard.jsx';

// import AdminRestaurantscard from '../components/AdminRestaurantscard.jsx';
const AdminFoodlist = () => {
  const navigate = useNavigate();
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
  const [foodlist,setFoodlist] = useState([]);
  const [restaurants,setRestaurants] = useState([]);
  const [isfoodlist,setIsfoodlist] = useState(false);
  const foodlistupload = () =>{
    setIsfoodlist(!isfoodlist);
  }

  useEffect(() => {
  const fecthrestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:3000/home/restaurants");
      const shuffledRestaurants = (res.data.restaurant || []);
      const shuffledFoods = (res.data.food || []);
      console.log(res.data.restaurant);
      console.log(res.data.food);
      setRestaurants(shuffledRestaurants);
      setFoodlist(shuffledFoods);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fecthrestaurants();
}, []);

  const handleRestaurantDeleted = (id) => {
    setRestaurants((prev) => prev.filter((r) => String(r.id) !== String(id)));
  };

  return (
    <div>
      {/* Buttons Section */}
      <div className="action-buttons">
        <button className="gentle-btns" onClick={foodlistupload}>➕ Add Restaurant <span id='slash'>/</span> Add Foodlist</button>
        {/* <button className="gentle-btn" onClick={foodlistupload}>🍴 Add Foodlist</button> */}
      </div>
    {isfoodlist ? <AdminPage/> : <AdminRest/>}
    <h2 className="explore-title">✨ Explore Flavors Near You ✨</h2>
      <div className="carousel-wrapper">
        <div className="cards-wrapper" ref={scrollRef}>
          {foodlist.map((item)=>(
            <Foodlist key={item.id} src={item.url} name={item.name} /> 
          ))}
        </div>
      </div>
        {/* <p className='res'>Restaurant</p> */}
        <h2 className="restaurant-heading">🍴 Popular Restaurants Near You</h2>
        <div className='restaurant-wrapper'>
          {restaurants.map((item,index)=>{
            return(
              <div onClick={()=>navigate(`/admin/menu/${item.id}/${encodeURIComponent(item.name)}`)} key={item.id}>
                <AdminRestaurantscard 
                  id={item.id}
                  category={item.category} 
                  offer={item.offer} 
                  minutes={item.minutes} 
                  price_starts={item.price_starts} 
                  src={item.img} 
                  name={item.name} 
                  rating={item.rating}
                  onEdit={() => navigate(`/admin/update/${item.id}`)}
                  onDelete={() => handleRestaurantDeleted(item.id)}
                />     
              </div>
            )
          })}
        </div>
        <div className='end'>
             <p className='end-p'>End of search Results</p>
             <div className='img-div'>
              <img className='end-home' src={home} alt='end'/>
             </div>
        </div>
      <Footer/>
    </div>
  );
};
export default AdminFoodlist;