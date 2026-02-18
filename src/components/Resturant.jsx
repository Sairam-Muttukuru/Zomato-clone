// import React from 'react'
import '../styles/Resturant.css'
import { LuStar } from "react-icons/lu";

function Resturant(props) {
  
  return (
    <div className="rest-container"  onClick={props.onClick}>
      <div className="rest-card">
        <img className="rest-image" src={props.src} alt={props.name} />
        <div className="rest-name">{props.name}</div>
        <button className={props.rating > 4 ? 'highrating-badge' : 'lowrating-badge'}>
          {props.rating}
          <span className='star'><LuStar /></span>
        </button>
        {/* Display the offer */}
        {/* Display the price and delivery time */}
        <div className='details'>
          <div className='offer'><p>{props.offer}% OFF</p></div>
          <div className='price-starts-from'><p>₹{props.price_starts} for one</p></div>
          <div className='minutes'><p>{props.minutes} mins</p></div>
        </div>
      </div>
    </div>
  )
}

export default Resturant