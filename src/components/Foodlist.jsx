import React from 'react';
import '../styles/Foodlist.css';
import {useEffect} from 'react';
const Foodlist = (props) => {
    return (
    <div className="food-container">
      <div className="food-card">
        <img className="food-image" src={props.src} alt={props.name} />
        <div className="food-name">{props.name}</div>
      </div>
    </div>
  );
};
export default Foodlist;