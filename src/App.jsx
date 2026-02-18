import React, { useState } from 'react'
import zomato from "./assets/zomato.png";
import biryani from "./assets/biryani.png"
import './App.css';
import Firstpage from "./pages/Firstpage.jsx";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu.jsx'
import Login from './components/Login.jsx';
import Cart from './components/Cart.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import Menuloader from './components/Menuloader.jsx';
import AdminFoodlist from './pages/AdminFoodlist.jsx';
import Signup from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import Adminmenu from './components/Adminmenu.jsx';
import Adminmenulist from './components/Adminmenulist.jsx';
import AdminMenuloader from './components/AdminMenuloader.jsx';
import AdminMenuItemUpdate from './components/AdminMenuItemUpdate.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Adminrestaurantsfetch from './components/Adminrestaurantsfetch.jsx';
import Adminupdate from './components/Adminupdate.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
// import AdminRestaurantprops from './components/AdminRestaurantprops.jsx';
function App() {
  const [count, setCount] = useState(0)

  // Role-based wrappers
  const RequireAdmin = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return user.role === 'admin' ? children : <Navigate to="/home/restaurants" replace />;
  };

  const RequireUser = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return null;
    // If admin is logged in, always send them to admin dashboard
    if (user?.role === 'admin') return <Navigate to="/admin/foods/restaurants" replace />;
    return children;
  };

  const RedirectIfAuthed = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return null;
    if (!user) return children;
    return user.role === 'admin' ? <Navigate to="/admin/foods/restaurants" replace /> : <Navigate to="/home/restaurants" replace />;
  };

  // Allow both admin and user to access certain pages (e.g., Cart)
  const RequireLoggedIn = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <div>
      {/* <Firstpage/>  */}
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
              {/* User-facing routes - block admins */}
              <Route path='/home/restaurants' element={<RequireUser><Firstpage /></RequireUser>} />
              <Route path='/restaurant/:id/:name' element={<RequireUser><Menuloader /></RequireUser>} />
              <Route path='/cart' element={<RequireLoggedIn><Cart /></RequireLoggedIn>} />

              {/* Auth routes - redirect if already authed */}
              <Route path='/login' element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />
              <Route path='/signup' element={<RedirectIfAuthed><Signup /></RedirectIfAuthed>} />
              <Route path='/forgot-password' element={<RedirectIfAuthed><ForgotPassword /></RedirectIfAuthed>} />

              {/* Admin routes - require admin */}
              <Route path='/admin/foods/restaurants' element={<RequireAdmin><AdminFoodlist /></RequireAdmin>} />
              <Route path='/admin/restaurants' element={<RequireAdmin><Adminrestaurantsfetch /></RequireAdmin>} />
              <Route path='/admin/menu/:id/:name' element={<RequireAdmin><AdminMenuloader /></RequireAdmin>} />
              <Route path='/admin/update/:id' element={<RequireAdmin><Adminupdate /></RequireAdmin>} />
              <Route path='/admin/menu/edit/:itemId' element={<RequireAdmin><AdminMenuItemUpdate /></RequireAdmin>} />

              {/* Default redirect */}
              <Route path='*' element={<Navigate to='/home/restaurants' replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
      {/* Toast container for showing messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}      // toast disappears after 3 seconds
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      {/* <Menu/> */}
      {/* <Login/> */}
    </div>
  )
}
export default App

