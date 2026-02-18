import React from 'react';
import "../styles/Adminmenulist.css";
import axios from 'axios';
import { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaRegCompass } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { LiaDirectionsSolid, LiaArrowLeftSolid, LiaArrowRightSolid } from "react-icons/lia";
import { PiShareFatThin } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg1.png";
import { CartContext } from '../context/CartContext.jsx';

function Adminmenulist() {
    const [restaurants, setRestaurants] = useState({});
    const [menuitems, setMenuitems] = useState([]);
    const [order, setOrder] = useState('');

    const [starters,setStarters] = useState([]);
    const [shuffledstarters,setShuffledstarters] = useState([]);
    const [soups,setsoups] = useState([]);
    const [shuffledsoups,setShuffledsoups] = useState([]);
    const [rice,setRice] = useState([]);
    const [shuffledrice,setShuffledrice] = useState([]);
    const [indianbreads,setIndianbreads] = useState([]);
    const [shuffledindianbreads,setShuffledindianbreads] = useState([]);
    const [tandoori,setTandoori] = useState([]);
    const [shuffledtandoori,setShuffledtandoori] = useState([]);
    const [beverages,setBeverages] = useState([]);
    const [shuffledbeverages,setShuffledbeverages] = useState([]);
    const [desserts,setDesserts] = useState([]);
    const [shuffleddesserts,setShuffleddesserts] = useState([]);
    const [maincourse,setMaincourse] = useState([]);
    const [shuffledmaincourse,setShuffledmaincourse] = useState([]);

    const { id: restaurant_id } = useParams();
    const navigate = useNavigate();
    const reference = useRef();
    const scrollRef = useRef();

    const shuffle = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Fetch menu and set category states (flexible grouping by keywords)
    useEffect(() => {
        const fetchmenu = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/admin/menu/${restaurant_id}`);
                const all = res.data.menu || [];
                setRestaurants(res.data.restaurant);
                setMenuitems(all);

                const startersArr = [];
                const soupsArr = [];
                const riceArr = [];
                const breadsArr = [];
                const tandooriArr = [];
                const beveragesArr = [];
                const dessertsArr = [];
                const mainArr = [];

                all.forEach((item) => {
                    const cat = (item.category || "").toLowerCase().trim();

                    if (!cat) {
                        mainArr.push(item);
                        return;
                    }

                    if (cat.includes("starter")) {
                        startersArr.push(item);
                    } else if (cat.includes("soup")) {
                        soupsArr.push(item);
                    } else if (cat.includes("biryani") || cat.includes("rice")) {
                        riceArr.push(item);
                    } else if (cat.includes("bread") || cat.includes("roti") || cat.includes("naan")) {
                        breadsArr.push(item);
                    } else if (cat.includes("tandoori")) {
                        tandooriArr.push(item);
                    } else if (
                        cat.includes("drink") ||
                        cat.includes("juice") ||
                        cat.includes("shake") ||
                        cat.includes("cola") ||
                        cat.includes("soda") ||
                        cat.includes("tea") ||
                        cat.includes("coffee")
                    ) {
                        beveragesArr.push(item);
                    } else if (
                        cat.includes("dessert") ||
                        cat.includes("sweet") ||
                        cat.includes("ice cream") ||
                        cat.includes("kulfi") ||
                        cat.includes("brownie")
                    ) {
                        dessertsArr.push(item);
                    } else {
                        // Anything else (pizza, tiffins, burgers, etc.)
                        mainArr.push(item);
                    }
                });

                setStarters(startersArr);
                setsoups(soupsArr);
                setRice(riceArr);
                setIndianbreads(breadsArr);
                setTandoori(tandooriArr);
                setBeverages(beveragesArr);
                setDesserts(dessertsArr);
                setMaincourse(mainArr);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };
        fetchmenu();
    }, [restaurant_id]);

    // Shuffle category arrays after they are set
    useEffect(() => {
        setShuffledstarters(shuffle(starters));
        setShuffledsoups(shuffle(soups));
        setShuffledrice(shuffle(rice));
        setShuffledindianbreads(shuffle(indianbreads));
        setShuffledtandoori(shuffle(tandoori));
        setShuffledbeverages(shuffle(beverages));
        setShuffleddesserts(shuffle(desserts));
        setShuffledmaincourse(shuffle(maincourse));
    }, [starters, soups, rice, indianbreads, tandoori, beverages, desserts, maincourse]);

    const handleclick = () => {
        if (reference.current) {
            reference.current.focus();
        }
    }

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

    // Cart: add item with fly-to-cart animation
    const { addToCart } = useContext(CartContext);
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
            // Force reflow
            void flyImg.offsetWidth;
            const dx = (cartRect.left + cartRect.width / 2) - (imgRect.left + imgRect.width / 2);
            const dy = (cartRect.top + cartRect.height / 2) - (imgRect.top + imgRect.height / 2);
            flyImg.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
            flyImg.style.opacity = '0.2';
            flyImg.addEventListener('transitionend', () => flyImg.remove(), { once: true });
            // Pulse the cart icon briefly
            cartBtn.classList.add('cart-pulse');
            setTimeout(() => cartBtn.classList.remove('cart-pulse'), 600);
        } catch (e) {
            // fail silently if animation can't run
        }
    };
    const handleAddToCart = (item, e) => {
        // find the image within this card and animate
        let imgEl = e?.currentTarget?.closest('.order-items')?.querySelector('.item-image');
        if (!imgEl && item?.id != null) {
            const container = document.querySelector(`.order-items[data-id="${item.id}"] .item-image`);
            if (container) imgEl = container;
        }
        if (imgEl) animateToCart(imgEl);
        addToCart(item);
    };

    // Handle edit menu item
    const handleEditMenuItem = (item) => {
        // Navigate to pre-filled edit form for this menu item and pass restaurant info
        navigate(`/admin/menu/edit/${item.id}` , {
            state: {
                restaurantId: restaurant_id,
                restaurantName: restaurants?.name || "Restaurant",
                item
            }
        });
    };

    // Handle delete menu item
    const handleDeleteMenuItem = async (item) => {
        console.log('Delete button clicked for menu item:', item.id);
        if(!window.confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
            toast.error(`Cancelled the deletion of ${item.name}`);
            return;
        } 
        else{
            toast.info(`Deleting the menu item ${item.name}`);
        }
        try {
            await axios.delete(`http://localhost:3000/admin/menu/delete/${item.id}`);
            toast.success("Menu item deleted successfully! ✅");
            
            // Refresh the menu items by fetching again
            const res = await axios.get(`http://localhost:3000/admin/menu/${restaurant_id}`);
            setMenuitems(res.data.menu);
            
            // Update category states
            setStarters(res.data.menu.filter(menuItem => menuItem.category === "starters"));
            setsoups(res.data.menu.filter(menuItem => menuItem.category === "Soup"));
            setRice(res.data.menu.filter(menuItem => menuItem.category === "rice"));
            setIndianbreads(res.data.menu.filter(menuItem => menuItem.category === "indian breads"));
            setTandoori(res.data.menu.filter(menuItem => menuItem.category === "tandoori"));
            setBeverages(res.data.menu.filter(menuItem => menuItem.category === "beverages"));
            setDesserts(res.data.menu.filter(menuItem => menuItem.category === "desserts"));
            setMaincourse(res.data.menu.filter(menuItem => menuItem.category === "main course"));
            
        } catch (err) {
            console.error("Error deleting menu item:", err);
            toast.error("Failed to delete menu item ❌");
        }
    };

    // Search filter (computed on render)
    const query = order.trim().toLowerCase();
    const matchesQuery = (item) => {
        if (!query) return true;
        return (
            item?.name?.toLowerCase().includes(query) ||
            item?.description?.toLowerCase().includes(query) ||
            item?.category?.toLowerCase().includes(query)
        );
    };

    const startersToShow = query ? starters.filter(matchesQuery) : shuffledstarters;
    const soupsToShow = query ? soups.filter(matchesQuery) : shuffledsoups;
    const maincourseToShow = query ? maincourse.filter(matchesQuery) : shuffledmaincourse;
    const riceToShow = query ? rice.filter(matchesQuery) : shuffledrice;
    const indianbreadsToShow = query ? indianbreads.filter(matchesQuery) : shuffledindianbreads;
    const tandooriToShow = query ? tandoori.filter(matchesQuery) : shuffledtandoori;
    const beveragesToShow = query ? beverages.filter(matchesQuery) : shuffledbeverages;
    const dessertsToShow = query ? desserts.filter(matchesQuery) : shuffleddesserts;

    const totalResults = (
        startersToShow.length + soupsToShow.length + maincourseToShow.length +
        riceToShow.length + indianbreadsToShow.length + tandooriToShow.length +
        beveragesToShow.length + dessertsToShow.length
    );

    return (
        <div>
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
                <div><img className='rest-dudim' src={restaurants?.img}/></div>
                <div><img className='rest-im' src={restaurants?.img1}/></div>
                <div><img className='rest-im' src={restaurants?.img2}/></div> 
            </div>
            <div className='order-online'>
                <div className='order-head'>
                    <div className='order-search-icon'>
                        <IoSearchOutline size={20} style={{position:"relative",paddingRight:'5px',bottom:'1px'}} />
                        <input className='order-search' 
                               type ='text'
                               placeholder='Search for a dish'
                               onChange={(e)=>setOrder(e.target.value)}
                               value={order}
                        />
                        {order && <RxCross1 size={20} style={{position:'relative',marginLeft:'25px',right:'10px',cursor:'pointer'}} onClick={()=>setOrder('')}/>}
                    </div>
                    <p id='order'>Order online</p>
                    <p id='track'><FaRegCompass size={20} style={{position:"relative",top:'3px',paddingRight:'5px'}} />Live track your order | 🕛 {restaurants?.minutes} min</p>
                </div>

                {/* Starters */}
                {startersToShow.length > 0 && (
                    <div className='starters-coontainer'>
                        <h2 className='category-heading'>Starters</h2>
                        {startersToShow.map((item, index) => (
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
                                        <div className='item-descp'>{item.description}</div>
                                    </div>
                                    <div id='btn'>
                                        <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                                    </div>
                                    <div className='admin-buttons'>
                                        <button
                                            className="edit-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditMenuItem(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                            <MdOutlineModeEdit size={18} />
                                        </button>
                                        <button
                                            className="delete-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMenuItem(item);
                                            }}
                                        >
                                            <span>Delete</span>
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Soups */}
                {soupsToShow.length > 0 && (
                    <div className='soups-coontainer'>
                        <h2 className='soup-heading'>Soups</h2>
                        {soupsToShow.map((item, index) => (
                            <div key={index}>
                                <div key={item.id} className='order-items' data-id={item.id}>
                                    <img className='item-image' src={item.img} width={200} height={200}/>
                                    <div className='item-name'>
                                        <img
                                          className='vegornonveg'
                                          src={(item.veg_or_nonveg || "").toLowerCase().includes("non-veg") || (item.veg_or_nonveg || "").toLowerCase().includes("nonveg") ? nonveg : veg}
                                        />
                                        <div className='item-nam'>{item.name}</div>
                                        <div className='item-price'>₹{item.price}</div>
                                        <div className='item-descp'>{item.description}</div>
                                    </div>
                                    <div id='btn'>
                                        <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                                    </div>
                                    <div className='admin-buttons'>
                                        <button
                                            className="edit-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditMenuItem(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                            <MdOutlineModeEdit size={18} />
                                        </button>
                                        <button
                                            className="delete-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMenuItem(item);
                                            }}
                                        >
                                            <span>Delete</span>
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {maincourseToShow.length > 0 && (
                    <div className='maincourse-coontainer'>
                        <h2 className='maincourse-heading'>Main Course</h2>
                        {maincourseToShow.map((item, index) => (
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
                                        <div className='item-descp'>{item.description}</div>
                                    </div>
                                    <div id='btn'>
                                        <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                                    </div>
                                    <div className='admin-buttons'>
                                        <button
                                            className="edit-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditMenuItem(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                            <MdOutlineModeEdit size={18} />
                                        </button>
                                        <button
                                            className="delete-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMenuItem(item);
                                            }}
                                        >
                                            <span>Delete</span>
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {riceToShow.length > 0 && (
                    <div className='rice-coontainer'>
                        <h2 className='rice-heading'>Biryanis & Rice</h2>
                        {riceToShow.map((item, index) => (
                            <div key={index}>
                                <div key={item.id} className='order-items' data-id={item.id}>
                                    <img className='item-image' src={item.img} width={200} height={200}/>
                                    <div className='item-name'>
                                        <img
                                          className='vegornonveg'
                                          src={(item.veg_or_nonveg || "").toLowerCase().includes("non-veg") || (item.veg_or_nonveg || "").toLowerCase().includes("nonveg") ? nonveg : veg}
                                        />
                                        <div className='item-nam'>{item.name}</div>
                                        <div className='item-price'>₹{item.price}</div>
                                        <div className='item-descp'>{item.description}</div>
                                    </div>
                                    <div id='btn'>
                                        <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                                    </div>
                                    <div className='admin-buttons'>
                                        <button
                                            className="edit-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditMenuItem(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                            <MdOutlineModeEdit size={18} />
                                        </button>
                                        <button
                                            className="delete-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMenuItem(item);
                                            }}
                                        >
                                            <span>Delete</span>
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )} 
                {indianbreadsToShow.length > 0 && (
                    <div className='indianbreads-coontainer'>
                        <h2 className='indianbreads-heading'>Indian Breads</h2>
                        {indianbreadsToShow.map((item, index) => (
                            <div key={index}>
                                <div key={item.id} className='order-items' data-id={item.id}>
                                    <img className='item-image' src={item.img} width={200} height={200}/>
                                    <div className='item-name'>
                                        <img className='vegornonveg' src={item.veg_or_nonveg==="nonveg" ? nonveg:veg}/>
                                        <div className='item-nam'>{item.name}</div>
                                        <div className='item-price'>₹{item.price}</div>
                                        <div className='item-descp'>{item.description}</div>
                                    </div>
                                    <div id='btn'>
                                        <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                                    </div>
                                    <div className='admin-buttons'>
                                        <button
                                            className="edit-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditMenuItem(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                            <MdOutlineModeEdit size={18} />
                                        </button>
                                        <button
                                            className="delete-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMenuItem(item);
                                            }}
                                        >
                                            <span>Delete</span>
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )} 
                {tandooriToShow.length > 0 && (
                    <div className='tandoori-coontainer'>
                        <h2 className='tandoori-heading'>Tandoori</h2>
                        {tandooriToShow.map((item, index) => (
                            <div key={index}>
                                <div key={item.id} className='order-items' data-id={item.id}>
                                    <img className='item-image' src={item.img} width={200} height={200}/>
                                    <div className='item-name'>
                                        <img className='vegornonveg' src={item.veg_or_nonveg==="nonveg" ? nonveg:veg}/>
                                        <div className='item-nam'>{item.name}</div>
                                        <div className='item-price'>₹{item.price}</div>
                                        <div className='item-descp'>{item.description}</div>
                                    </div>
                                    <div id='btn'>
                                        <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                                    </div>
                                    <div className='admin-buttons'>
                                        <button
                                            className="edit-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditMenuItem(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                            <MdOutlineModeEdit size={18} />
                                        </button>
                                        <button
                                            className="delete-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMenuItem(item);
                                            }}
                                        >
                                            <span>Delete</span>
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {beveragesToShow.length > 0 && (
                    <div className='beverages-coontainer'>
                        <h2 className='beverages-heading'>Beverages</h2>
                        {beveragesToShow.map((item, index) => (
                            <div key={index}>
                                <div key={item.id} className='order-items' data-id={item.id}>
                                    <img className='item-image' src={item.img} width={200} height={200}/>
                                    <div className='item-name'>
                                        <img className='vegornonveg' src={item.veg_or_nonveg==="nonveg" ? nonveg:veg}/>
                                        <div className='item-nam'>{item.name}</div>
                                        <div className='item-price'>₹{item.price}</div>
                                        <div className='item-descp'>{item.description}</div>
                                    </div>
                                    <div id='btn'>
                                        <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                                    </div>
                                    <div className='admin-buttons'>
                                        <button
                                            className="edit-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditMenuItem(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                            <MdOutlineModeEdit size={18} />
                                        </button>
                                        <button
                                            className="delete-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMenuItem(item);
                                            }}
                                        >
                                            <span>Delete</span>
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )} 
                {dessertsToShow.length > 0 && (
                    <div className='desserts-coontainer'>
                        <h2 className='desserts-heading'>Desserts</h2>
                        {dessertsToShow.map((item, index) => (
                            <div key={index}>
                                <div key={item.id} className='order-items' data-id={item.id}>
                                    <img className='item-image' src={item.img} width={200} height={200}/>
                                    <div className='item-name'>
                                        <img className='vegornonveg' src={item.veg_or_nonveg==="nonveg" ? nonveg:veg}/>
                                        <div className='item-nam'>{item.name}</div>
                                        <div className='item-price'>₹{item.price}</div>
                                        <div className='item-descp'>{item.description}</div>
                                    </div>
                                    <div id='btn'>
                                        <button id='add-btn' onClick={(e) => handleAddToCart(item, e)}>+Add</button>
                                    </div>
                                    <div className='admin-buttons'>
                                        <button
                                            className="edit-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditMenuItem(item);
                                            }}
                                        >
                                            <span>Edit</span>
                                            <MdOutlineModeEdit size={18} />
                                        </button>
                                        <button
                                            className="delete-btn-menu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteMenuItem(item);
                                            }}
                                        >
                                            <span>Delete</span>
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}  
            </div>
        </div>
    )
}

export default Adminmenulist;

