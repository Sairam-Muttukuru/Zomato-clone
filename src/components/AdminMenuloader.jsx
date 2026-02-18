import React, { useEffect, useState } from 'react';
import Menu from './Menu.jsx';
import lo from '../images/lo.gif';
import "../styles/MenuLoader.css"; 
import Adminmenu from './Adminmenu.jsx';
function AdminMenuloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 3 seconds delay

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <div className='gif'>
            <img src={lo} alt='loading mawa...' width='1000px' height='1000px'></img>
    </div>;
  }

  return <Adminmenu/>;
}

export default AdminMenuloader;
