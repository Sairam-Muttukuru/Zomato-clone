import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useState,useRef } from 'react';
import '../styles/Menu.css';
import restaurant from '../data/restaurant.js';
import { BiPhoneCall } from "react-icons/bi";
import { LiaDirectionsSolid } from "react-icons/lia";
import { PiShareFatThin } from "react-icons/pi";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { LiaArrowRightSolid } from "react-icons/lia";
import {biryanimenu,tiffinsmenu,pizzamenu,chinesemenu} from '../data/menu.js';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import veg from "../assets/veg.png";
import nonveg from '../assets/nonveg1.png';
import axios from 'axios';
import { LuStar } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
function Menu() {
    const navigate = useNavigate();
    // Fly-to-cart animation
    const animateToCart = (sourceImg) => {
        try {
            if (!sourceImg) return;
            const cartBtn = document.getElementById('cart-icon');
            if (!cartBtn) return;
            const imgRect = sourceImg.getBoundingClientRect();
            const cartRect = cartBtn.getBoundingClientRect();
            const flyImg = sourceImg.cloneNode(true);
            flyImg.style.position = 'fixed';
            flyImg.style.left = imgRect.left + 'px';
            flyImg.style.top = imgRect.top + 'px';
            flyImg.style.width = imgRect.width + 'px';
            flyImg.style.height = imgRect.height + 'px';
            flyImg.style.borderRadius = '10px';
            flyImg.style.zIndex = '5000';
            flyImg.style.transition = 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease';
            document.body.appendChild(flyImg);
            void flyImg.offsetWidth; // reflow
            const dx = (cartRect.left + cartRect.width / 2) - (imgRect.left + imgRect.width / 2);
            const dy = (cartRect.top + cartRect.height / 2) - (imgRect.top + imgRect.height / 2);
            flyImg.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
            flyImg.style.opacity = '0.2';
            flyImg.addEventListener('transitionend', () => flyImg.remove(), { once: true });
        } catch(_) {}
    };

const handleAddToCart = (item, e) => {
    // animate
    let imgEl = e?.currentTarget?.closest('.order-items')?.querySelector('.item-image');
    if (!imgEl && item?.id != null) {
        const el = document.querySelector(`.order-items[data-id="${item.id}"] .item-image`);
        if (el) imgEl = el;
    }
    if (imgEl) animateToCart(imgEl);
    addToCart(item);
    // Show mini-cart panel temporarily on the page
    setShowMiniCart(true);
};
     const [order,setOrder] = useState('');
     const [shuffledarray,setShuffledarray] = useState([]);
     const {name} = useParams();
     const { addToCart, cartItems = [], incrementCount, decrementCount, removeFromCart } = useContext(CartContext);
     const [showMiniCart, setShowMiniCart] = useState(false);
    //  const [previewUrl, setPreviewUrl] = useState(null);
    const [restaurants,setRestaurants] = useState(null);
    const [menuitems,setMenuitems] = useState([]);
    // const fileInputRef = useRef(null);
    // const [uploading, setUploading] = useState(false);
    const{id:restaurant_id} = useParams();
    useEffect(()=>{
        const fetchmenu = async()=>{
            try {
                const [restaurantRes, menuRes] = await Promise.all([
                    axios.get(`http://localhost:3000/restaurants/${restaurant_id}`),
                    axios.get(`http://localhost:3000/admin/menu/${restaurant_id}`)
                ]);

                const restaurantData = restaurantRes.data || null;
                const menuData = menuRes.data;
                const menuArray = Array.isArray(menuData) ? menuData : (Array.isArray(menuData?.menu) ? menuData.menu : []);

                setRestaurants(restaurantData);
                setMenuitems(menuArray);
                console.log('restaurant from api', restaurantData);
                console.log('menu from api', menuArray);
            } catch (error) {
                console.error("Error fetching restaurants or menu:", error);
            }
        }
        fetchmenu();
    },[]);
    // Auto-hide the mini cart after a short delay once opened
    useEffect(() => {
        if (!showMiniCart) return;
        const t = setTimeout(() => setShowMiniCart(false), 3000);
        return () => clearTimeout(t);
    }, [showMiniCart, cartItems]);
    //  let menu = [];
    //  if(restauran.category==='biryani'){
    //     menu = biryanimenu;
    //  }
    //  else if(restauran.category==='tiffin'){
    //     menu = tiffinsmenu;
    //  }
    //  else if(restauran.category==='pizza'){
    //     menu = pizzamenu;
    //  }
    //  else if(restauran.category==='chinese'){
    //     menu = chinesemenu;
    //  }
    //  const handleclick = ()=>{
    //      if(reference.current){
    //          reference.current.focus();
    //      }
    //  }
     const shuffle = (array = [])=>{
        const arr = [...array];
        for(let i=arr.length-1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            [arr[i],arr[j]] = [arr[j],arr[i]]
        }
        return arr;
     }
     useEffect(()=>{
        console.log(menuitems);
        const menu_list = shuffle(menuitems || []);
        setShuffledarray(menu_list);
     },[menuitems]);
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
     <div>
        <style>{`
          .mini-cart-panel{position:fixed;top:110px;right:16px;width:340px;max-height:70vh;background:#fff;border:1px solid #eee;border-radius:12px;box-shadow:0 14px 30px rgba(0,0,0,0.15);display:flex;flex-direction:column;overflow:hidden;z-index:4000}
          .mini-cart-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #f0f0f0}
          .mini-cart-header h3{font-family:poppins,sans-serif;font-size:16px;margin:0}
          .mini-cart-close{border:none;background:transparent;font-size:18px;line-height:1;cursor:pointer;color:#777}
          .mini-cart-body{overflow-y:auto;padding:10px 12px}
          .mini-cart-empty{padding:18px;color:#666;text-align:center}
          .mini-cart-item{display:grid;grid-template-columns:56px 1fr auto;gap:10px;align-items:center;padding:8px 0;border-bottom:1px dashed #eee}
          .mini-cart-thumb{width:56px;height:56px;border-radius:8px;object-fit:cover;border:1px solid #f0f0f0}
          .mini-cart-info{display:flex;flex-direction:column}
          .mini-cart-name{font-weight:600}
          .mini-cart-meta{color:#777;font-size:13px;margin-top:2px}
          .mini-cart-actions{display:inline-flex;align-items:center;gap:8px;margin-top:6px}
          .mini-cart-actions button{border:1px solid #e8e8e8;background:#fff;width:26px;height:26px;border-radius:6px;cursor:pointer}
          .mini-cart-remove{border:none;background:transparent;color:#e23744;margin-left:6px;cursor:pointer}
          .mini-cart-line-total{font-weight:700}
          .mini-cart-footer{padding:10px 12px 12px}
          .mini-cart-subtotal{display:flex;align-items:center;justify-content:space-between;font-weight:600;margin-bottom:10px}
          .mini-cart-view{width:100%;border:none;background:#e23744;color:#fff;border-radius:10px;padding:10px 12px;cursor:pointer}
          @media (max-width:900px){.mini-cart-panel{display:none}}
        `}</style>
        {/* Header removed here. Global Header from App.jsx will render at top */}
        <p className='home-para'><span className='home' >Home  /</span><span className='india'>India </span><span className='nellore'>/ Nellore </span><span>/ Nellore Bellary Bombay Road, Auto Nagar, Proddatur Restaurants</span></p>
        <div className='rest-details'>
            <div className='rest-data'>
                <p className='res-name'>{restaurants?.name}</p>
                <div className='ratings'>
                    <div>
                        <div className='rating-display'>
                     <button className={restaurants?.rating > 3.9 ? 'highrating-badge1' : 'lowrating-badge1'}>
                            {restaurants?.rating}
                            <div className='star1'><FaStar /></div>
                    </button>
                </div>
                <div className='dinning-ratings'>
                    <p className='din'>{Math.floor(Math.random()*(50-20))+1}</p>
                    <p className='dinning'>Dinning Ratings</p>
                    <p className='dot'>-----------------------</p>
                </div>
                    </div>
                <div className='rating-display'>
                     <div className='t'>
                        <button className={restaurants?.rating > 3.9 ? 'highrating-badge1' : 'lowrating-badge1'}>
                            {restaurants?.rating}
                            <div className='star1'><FaStar /></div>
                    </button>
                </div>
                <div className='dinning-ratings1'>
                    <p className='din1'>{(Math.floor(Math.random()*(80-20))+1).toFixed(1)}K</p>
                    <p className='dinning1'>Delivery Ratings</p>
                    <p className='dot1'>-----------------------</p>
                </div>
                     </div>
                </div>
                <p className='res-address'>{restaurants?.address}</p>
                <p className='res-phn'><BiPhoneCall style={{color:'red',position:'relative',top:'5px',right:'5px'}}/>{restaurants?.phone}</p>
                <div className='rest-direction'><LiaDirectionsSolid className='direction-logo' />Direction</div>
                <div className='rest-share'><PiShareFatThin className='share-logo'/>Share</div>
            </div>
        </div>
        <div className='arrow-btn'>
            <button className='left-arrow' onClick={scrollLeft}><LiaArrowLeftSolid /></button>
            <button className='right-arrow' onClick={scrollRight}><LiaArrowRightSolid /></button>
        </div>
        <div className='rest-img' ref={scrollRef}>
            <div><img className='rest-im' src={restaurants?.img}/></div>
             <div> <img className='rest-im' src={restaurants?.img1}/></div>
            <div> <img className='rest-im' src={restaurants?.img2}/></div> 
        </div>
        <div className='order-online'>
            <div className='order-head'>
                <div className='order-search-icon'><IoSearchOutline size={20} style={{position:"relative",paddingRight:'5px',bottom:'1px'}} />
                    <input className='order-search' 
                    type ='text'
                    placeholder='Search for a dish'
                    onChange={(e)=>setOrder(e.target.value)}
                    value={order}
                    />
                    {order && <RxCross1 size={20} style={{position:'relative',marginLeft:'25px',right:'10px',cursor:'pointer'}} onClick={()=>setOrder('')}/>}
                    
                </div>
                <p id='order'>Order online</p>
                <p id='track'><FaRegCompass size={20} style={{position:"relative",top:'3px',paddingRight:'5px'}} />Live track your order | 🕛   {restaurants?.minutes} min</p>
            </div>
            {shuffledarray.map((item,index)=>{
                console.log(item);
                return(
                    <div key={index}>
                         <div key={item.id} className='order-items' data-id={item.id}>
                            <img className='item-image' src={item.img} width={200} height={200}/>
                            <div className='item-name'>
                                <img
                                  className='vegornonveg'
                                  src={(item.veg_or_nonveg || "").toLowerCase().includes("non") ? nonveg : veg}
                                />
                                <div className='item-nam'>{item.name}</div>
                                <div className='item-price'>₹{item.price}</div>
                                <div className='item-descp'>
                                    {item.description}
                                </div>
                            </div>
                            <div id='btn'>
                                <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        {/* Mini Cart Panel - temporary right side */}
        {showMiniCart && (
          <aside className="mini-cart-panel">
            <div className="mini-cart-header">
              <h3>Your Cart</h3>
              <button className="mini-cart-close" onClick={() => setShowMiniCart(false)}>✕</button>
            </div>
            {cartItems.length === 0 ? (
              <div className="mini-cart-empty">No items yet. Add something tasty!</div>
            ) : (
              <div className="mini-cart-body">
                {cartItems.map((ci) => (
                  <div key={ci.id} className="mini-cart-item">
                    <img src={ci.img} alt={ci.name} className="mini-cart-thumb" />
                    <div className="mini-cart-info">
                      <div className="mini-cart-name">{ci.name}</div>
                      <div className="mini-cart-meta">₹{ci.price} × {ci.count}</div>
                      <div className="mini-cart-actions">
                        <button onClick={() => decrementCount(ci.id)}>-</button>
                        <span className="mini-cart-count">{ci.count}</span>
                        <button onClick={() => incrementCount(ci.id)}>+</button>
                        <button className="mini-cart-remove" onClick={() => removeFromCart(ci.id)}>Remove</button>
                      </div>
                    </div>
                    <div className="mini-cart-line-total">₹{(ci.price * ci.count).toFixed(0)}</div>
                  </div>
                ))}
                <div className="mini-cart-footer">
                  <div className="mini-cart-subtotal">
                    Subtotal
                    <span>
                      ₹{cartItems.reduce((sum, it) => sum + (it.price * it.count), 0).toFixed(0)}
                    </span>
                  </div>
                  <button className="mini-cart-view" onClick={() => navigate('/cart')}>View full cart</button>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    )
}
export default Menu;