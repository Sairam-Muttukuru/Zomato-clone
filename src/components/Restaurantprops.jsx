import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import paradise from '../assets/paradise.png';
import annapurna from '../assets/annapurna.png';
import lasafoodcourt from '../assets/lasafoodcourt.png';
import Resturant from './Resturant.jsx';
import '../styles/Restaurantprops.css';
import resturants from '../data/restaurant.js';
import home from '../assets/home.png'
import Login from './Login.jsx';
import axios from 'axios';
import Header from './Header.jsx';
import Foodlist from './Foodlist.jsx';
import Footer from './Footer.jsx';
import AdminPage from './AdminPage.jsx';
import AdminRest from './AdminRest.jsx';
import "../styles/Admin.css"
import food from '../assets/food1.png'
function Restaurantprops() {
  const navigate = useNavigate();
  const location = useLocation();
  // Fisher-Yates shuffle - reliable way to shuffle the array
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];  // swap
    }
    return arr;
  };
  // const [shuffledRestaurants, setShuffledRestaurants] = useState([]);
  const [foodlist, setFoodlist] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const isVegOnly = new URLSearchParams(location.search).get('veg') === '1';
  //   useEffect(() => {
  //   const fecthrestaurants = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:3000/admin/restaurants");

  //       console.log("Full response:", res);
  //       console.log("Response data:", res.data);
  //       setRestaurants(res.data.restaurant || []);
  //       setFoodlist(res.data.food || []);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fecthrestaurants();
  // }, []);
  // const navigate = useNavigate();
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
  // useEffect(()=>{
  //   const fecthfoods = async()=>{
  //     const res = await axios.get("http://localhost:3000/admin/restaurants");
  //     console.log(`this is res: `+res);
  //     console.log(`this is res.data: `+res.data);
  //     setFoodlist(res.data);
  //   }
  //   fecthfoods();
  // },[]);
  useEffect(() => {
    const fecthrestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:3000/home/restaurants");
        const shuffledRestaurants = shuffleArray(res.data.restaurant || []);
        const shuffledFoods = shuffleArray(res.data.food || []);
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
  //    const getRandomRating = () => {
  //   const min = 3;
  //   const max = 5;
  //   const random = Math.random() * (max - min) + min;
  //   return Math.floor(random * 10) / 10;
  // };
  //  getRandomRating();
  const getImageUrl = (url) => {
    if (!url) return "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // Fallback
    // If it's a full URL (cloudinary etc), return strictly
    if (url.startsWith('http')) return url;

    // If it's a path like /assets/food.png, get food.png
    const filename = url.split('/').pop().split('\\').pop();
    if (!filename) return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
    return `http://localhost:3000/images/${filename}`;
  };

  return (
    <div>
      {/* <Header /> */}
      {/* ✅ Buttons Section */}
      {/* <p className='insp'>Inspiration for your first order</p> */}
      <h2 className="explore-title">✨ Explore Flavors Near You ✨</h2>
      <div className="carousel-wrapper">
        <div className="cards-wrapper" ref={scrollRef}>
          {(isVegOnly
            ? foodlist.filter(it =>
              String(it.vegnonveg || it.veg_or_nonveg || "")
                .toLowerCase()
                .includes("veg") &&
              !String(it.vegnonveg || it.veg_or_nonveg || "")
                .toLowerCase()
                .includes("non")
            )
            : foodlist
          ).map((item) => (
            <Foodlist key={item.id} src={getImageUrl(item.url)} name={item.name} />
          ))}
        </div>
      </div>
      {/* <p className='res'>Restaurant</p> */}
      <h2 className="restaurant-heading">🍴 Popular Restaurants Near You</h2>
      <div className='restaurant-wrapper'>
        {restaurants.map((item, index) => {
          console.log(item);
          console.log(`Item at index ${index}:`, item);
          console.log(`Offer: ${item.offer}, Price: ${item.price_starts}, Minutes: ${item.minutes}`);
          return (
            <div key={index}>
              <Resturant onClick={() => navigate(`/restaurant/${item.id}/${encodeURIComponent(item.name)}`)} src={getImageUrl(item.img)} name={item.name} rating={item.rating} offer={item.offer} price_starts={item.price_starts} minutes={item.minutes} />
            </div>
          )
        })}
      </div>
      <div className='end'>
        <p className='end-p'>End of search Results</p>
        <div className='img-div'>
          <img className='end-home' src={home} alt='end' />
        </div>
      </div>
    </div>
  )
}

export default Restaurantprops
