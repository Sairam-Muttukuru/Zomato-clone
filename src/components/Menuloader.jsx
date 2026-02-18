import React, { useEffect, useState } from 'react';
import Menu from './Menu.jsx';
import lo from '../images/lo.gif';
import "../styles/MenuLoader.css"; 

function Menuloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (loading) {
    return <div className='gif'>
            <img src={lo} alt='loading mawa...' width='1000px' height='1000px'></img>
    </div>; // You can replace this with a spinner
  }

  return (
    <Menu/>
  );
}

export default Menuloader;
