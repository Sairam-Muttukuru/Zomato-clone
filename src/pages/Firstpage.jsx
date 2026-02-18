// import React from 'react'
// import Header from '../components/Header.jsx';
// import biryani from '../assets/biryani.png';
// import burger from '../assets/burger.png';
// import cake from '../assets/cake.png';
// import chicken from '../assets/chicken.png';
// import dosa from '../assets/dosa.png';
// import friedrice from '../assets/friedrice.png';
// import idly from '../assets/idly.png';
// import Northindian from '../assets/Northindian.png';
// import paneer from '../assets/paneer.png';
// import paratha from '../assets/paratha.png';
// import pizza from '../assets/pizza.png';
// import rolls from '../assets/rolls.png';
// import Foodlist from '../components/Foodlist.jsx';
// import '../styles/Firstpage.css'
// const Firstpage = () => {
//   return (
//     <div>
//       <Header />
//       <p className='insp'>Inspiration for your first order</p>
//       <div className="cards-wrapper">
//         <Foodlist src={chicken} name='Chicken'/>
//         <Foodlist src={dosa} name='Dosa'/>
//         <Foodlist src={friedrice} name='Friedrice'/>
//         <Foodlist src={idly} name='Idly'/>
//         <Foodlist src={Northindian} name='Thali'/>
//         <Foodlist src={paneer} name='Paneer'/>
//         <Foodlist src={paratha} name='Paratha'/>
//         <Foodlist src={pizza} name="Pizza" />
//         <Foodlist src={rolls} name="Rolls" />
//         <Foodlist src={biryani} name="Biryani" />
//         <Foodlist src={burger} name="Burger"/>
//         <Foodlist src={cake} name='Cake'/>
//       </div>
//     </div>
//   );
// };

// export default Firstpage
import React from 'react';
import '../styles/Firstpage.css';
import Restaurantprops from '../components/Restaurantprops.jsx';
import Footer from '../components/Footer.jsx'
const Firstpage = () => {
  return (
    <div>
      <Restaurantprops />
      <Footer />
    </div>
  );
}

export default Firstpage;

