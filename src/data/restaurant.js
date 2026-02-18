import bawarchi from '../images/bawarchi.png';
import andhraspice from '../images/andhraspice.png';
import hotelnelloregrand from '../images/hotelnelloregrand.png';
import kritunga from '../images/kritunga.png';
import paradise from '../images/paradise.png';
import reshma from '../images/reshma.png';
import riyazbiryani from '../images/riyazbiryani.png';
import sridevitiffins from '../images/sridevitiffins.png';
import srisaifamilyrestaurant from '../images/srisaifamilyrestaurant.png';
import babaihotel from '../images/babaihotel.png';
import venkatagiritiffins from '../images/venkatagiritiffins.png';
import srisatyasai from '../images/srisatyasai.png';
import viharrestaurant from '../images/viharrestaurant.png';
import dominospizza from '../images/dominospizza.png';
import mojopizza from '../images/mojopizza.png';
import ovenstory from '../images/ovenstory.png';
import pizzacorner from '../images/pizzacorner.png';
import pizzahut from '../images/pizzahut.png';
import smokinjoespizza from '../images/smokinjoespizza.png';
import chinatown from '../images/chinatown.png';
import exotikka from '../images/exotikka.png';
import maongskitchen from '../images/maongskitchen.png';
import misaki from '../images/misaki.png';
import redchillichinese from '../images/redchillichinese.png';
import wokexpress from '../images/wokexpress.png';
    const getRandomRating = () => {
    const min = 3;
    const max = 5;
    const random = Math.random() * (max - min) + min;
    return Math.floor(random * 10) / 10;
  };
const resturants = [
  {
    name: 'Andhra spice Hotel',
    rating: getRandomRating(),
    img: andhraspice,
    img1:'https://hblimg.mmtcdn.com/content/hubble/img/kadapatiowimages/mmt/activities/m_Andhra_Spice_1_l_457_640.jpg',
    address: 'Beside Central Bus Stand, T P Area, Near RTC Complex, Tirupati, Andhra Pradesh - 517501',
    phone: '+918328765432',
    category: 'biryani'
  },
  {
    name: 'Bawarchi',
    rating: getRandomRating(),
    img: bawarchi,
    img1:'https://i.ytimg.com/vi/1qO8lwnxn5w/maxresdefault.jpg',
    img2:'https://i.ytimg.com/vi/1qO8lwnxn5w/maxresdefault.jpg',
    address: '19-8-112, Backside KVR Jewellery, Near Annamalai Circle, Tirupati, Andhra Pradesh - 517501',
    phone: '+919390112233',
    category: 'biryani'
  },
  {
    name: 'Hotel Nellore Grand',
    rating: getRandomRating(),
    img: hotelnelloregrand,
    img1:'https://media-cdn.tripadvisor.com/media/photo-s/21/f3/77/34/hotel-nellore-grand.jpg',
    img2:'https://media-cdn.tripadvisor.com/media/photo-s/21/f3/77/34/hotel-nellore-grand.jpg',
    address: 'NH-5, Opp. Sai Baba Temple, Near Bus Stand, Kovur, Nellore, Andhra Pradesh - 524137',
    phone: '+918899223344',
    category: 'biryani'
  },
  {
    name: 'Kritunga',
    rating: getRandomRating(),
    img: kritunga,
    img1:'https://www.addressguru.in/images/1887173402.jpg',
    img2:'https://www.addressguru.in/images/1887173402.jpg',
    address: 'D.No: 19-3-15/A, Near Leela Mahal Center, Tirumala Bypass Road, Tirupati, Andhra Pradesh - 517501',
    phone: '+917702556677',
    category: 'biryani'
  },
  {
    name: 'Paradise Biryani',
    rating: getRandomRating(),
    img: paradise,
    img1:'https://www.paradisebiryaniwestborough.com/files/images/biryani.jpg',
    img2:'https://i.pinimg.com/736x/8e/47/2a/8e472a219d12d77c99ae39db53bbde63.jpg',
    address: 'Plot 5, Tata Nagar, Opposite Reliance Digital, AIR Bypass Road, Tirupati, Andhra Pradesh - 517501',
    phone: '+918639847261',
    category: 'biryani'
  },
  {
    name: 'Reshma Biryani',
    rating: getRandomRating(),
    img: reshma,
    img1:'https://v3img.voot.com/resizeMedium,w_1090,h_613/jcvod/image/c5313b84-5fd9-4bb7-a4f7-4263dc12ffed/f4756f1c73794bf49fbfd6c985f3614a/1715899585.jpg',
    img2:'https://v3img.voot.com/resizeMedium,w_1090,h_613/jcvod/image/c5313b84-5fd9-4bb7-a4f7-4263dc12ffed/f4756f1c73794bf49fbfd6c985f3614a/1715899585.jpg',
    address: 'Door No. 27/1/15, Dargamitta, Near Fire Station, Nellore, Andhra Pradesh - 524003',
    phone: '+919032145768',
    category: 'biryani'
  },
  {
    name: 'Riyaz Biryani',
    rating: getRandomRating(),
    img: riyazbiryani,
    img1:'https://img.restaurantguru.com/r8ce-Riyaz-briyani-Best-biryani-shop-Special-5-Biryani-Variety-meat.jpg',
    img2:'http://upload.wikimedia.org/wikipedia/commons/f/fe/Chicken_Biryani.jpg',
    address: 'LIC Office Road, Near Old MRO Office, KT Road, Tirupati, Andhra Pradesh - 517501',
    phone: '+918950122334',
    category: 'biryani'
  },
  {
    name: 'Sridevi Tiffins',
    rating: getRandomRating(),
    img: sridevitiffins,
    img1:'https://www.sitaculturalcenter.com/wp-content/uploads/2021/11/Tiffins-at-lakshmi-Sitaculturalcenter.jpg',
    img2:'https://www.sitaculturalcenter.com/wp-content/uploads/2021/11/Tiffins-at-lakshmi-Sitaculturalcenter.jpg',
    address: 'Opp. PVR Cinemas, Bairagi Patteda, Nellore, Andhra Pradesh - 517502',
    phone: '+917778889900',
    category: 'tiffin'
  },
  {
    name: 'Sri Sai Family Restaurant',
    rating: getRandomRating(),
    img: srisaifamilyrestaurant,
    img1:'https://content.jdmagicbox.com/v2/comp/bangalore/z5/080pxx80.xx80.200703000830.s2z5/catalogue/sri-sai-foods-basavanagudi-bangalore-n5c62jcips.jpg',
    img2:'https://files.yappe.in/place/small/sri-krishna-delicacy-udupi-veg-family-restaurant-7539722.webp',
    address: 'Near Reliance Mart, Renigunta Road, Tirupati, Andhra Pradesh - 517520',
    phone: '+918655443322',
     category: 'tiffin'
  },
  {
    name: 'venkata Giri Tiffins',
    rating: getRandomRating(),
    img: venkatagiritiffins,
    img1:'https://i.pinimg.com/736x/71/7e/ff/717effc7d39cb9b9f9190dcda2937cf9.jpg',
    img2:'https://i.pinimg.com/736x/95/c5/8a/95c58a20486f96a9ea1ae25f692e9ef5.jpg',
    address: '5/123, Old Maternity Hospital Street, Bhavani Nagar, Tirupati, Andhra Pradesh - 517501',
    phone: '+917799332211',
     category: 'tiffin'
  },
  {
    name: 'Vihar tiffins',
    rating: getRandomRating(),
    img: viharrestaurant,
    img1:'https://i.pinimg.com/736x/1f/3e/84/1f3e84b54fa86b73fbec8ed7f815c1a8.jpg',
    img2:'https://i.pinimg.com/736x/26/af/11/26af11a74ea045de9df8d93bf72af256.jpg',
    address: 'Opp. APSRTC Bus Stand, T P Area, Tirupati, Andhra Pradesh - 517501',
    phone: '+919190554433',
     category: 'tiffin'
  },
  {
    name: 'Babai hotel',
    rating: getRandomRating(),
    img: babaihotel,
    img1:'https://i.pinimg.com/736x/08/b0/1a/08b01a94cc023548605d2d6c0555abde.jpg',
    img2:'https://pandareviewz.com/wp-content/uploads/2023/06/20210109_202624_HDR-01-scaled.jpeg',
    address: 'KT Road, Near Annamaiah Circle, Tirupati, Andhra Pradesh - 517501',
    phone: '+918768990011',
     category: 'tiffin'
  },
  {
    name: 'Sri Satya Sai',
    rating: getRandomRating(),
    img: srisatyasai,
    img1:'https://img.restaurantguru.com/c84a-Sri-Satya-Sai-Hotel-food.jpg',
    img2:'https://img.restaurantguru.com/c84a-Sri-Satya-Sai-Hotel-food.jpg',
    address: 'Chittoor Highway, Near Avilala Circle, Tirupati, Andhra Pradesh - 517503',
    phone: '+917667889900',
     category: 'tiffin'
  },
  {
    name: "Domino's Pizza",
    rating: getRandomRating(),
    img: dominospizza,
    img1:'https://a.mktgcdn.com/p/qSB9pU_z_0WJwy8wendcup6NgA5-RzzhVF-S__f0iV4/3456x4320.jpg',
    img2:'https://www.allinharidwar.com/wp-content/uploads/2015/08/dominos-pizza.jpg',
    address: 'Annamaiah Circle, Near Big Bazaar, Tirupati, Andhra Pradesh - 517501',
    phone: '+918996677554',
     category: 'pizza'
  },
  {
    name: "Mojo Pizza",
    rating: getRandomRating(),
    img: mojopizza,
    img1:'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/q/y/p158614-170739584165c4cb01a4c64.jpg',
    img2:'https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/w/z/p154672-170687138265bcca5603d06.jpg?tr=tr:n-xlarge',
    address: 'STV Nagar, Near RTC Bus Stand, Tirupati, Andhra Pradesh - 517501',
    phone: '+917731004455',
     category: 'pizza'
  },
  {
    name: "Oven Story Pizza",
    rating: getRandomRating(),
    img: ovenstory,
    img1:'https://images.seeklogo.com/logo-png/54/1/oven-story-pizza-logo-png_seeklogo-541328.png',
    img2:'https://images.seeklogo.com/logo-png/54/1/oven-story-pizza-logo-png_seeklogo-541328.png',
    address: 'Opp. Reliance Trends, AIR Bypass Road, Tirupati, Andhra Pradesh - 517501',
    phone: '+918756332211',
     category: 'pizza'
  },
  {
    name: "Pizza Corner",
    rating: getRandomRating(),
    img: pizzacorner,
    img1:'https://thefoodxp.com/wp-content/uploads/2020/07/Pizza-Corner-Franchise.jpg',
    img2:'https://family-images-y24bv7yxalct4.azureedge.net/families/9125/9125_background_1984x900.webp',
    address: '1st Floor, Near Leela Mahal Circle, Tirupati, Andhra Pradesh - 517501',
    phone: '+918956112233',
     category: 'pizza'
  },
  {
    name: "Pizza Hut",
    rating: getRandomRating(),
    img: pizzahut,
    img1:'https://wallpapers.com/images/hd/pizza-hut-restaurant-signage-ug6v04yzrf2bl1ar.jpg',
    img2:'https://wallpapers.com/images/hd/pizza-hut-and-chicken-h30amy799b8um76c.jpg',
    address: 'Ground Floor, Leela Mahal Road, Tirupati, Andhra Pradesh - 517501',
    phone: '+918602334455',
     category: 'pizza'
  },
  {
    name: "Smokin' Joe's Pizza",
    rating: getRandomRating(),
    img: smokinjoespizza,
    img1:'https://deliverit-vhosts.s3-ap-southeast-2.amazonaws.com/smokinjoespizza.com.au/images/logo.png',
    img2:'https://measuremypizza.com.au/wp-content/uploads/2022/03/pexels-victor-miyata-3682837-e1648509043554.jpg',
    address: 'Karakambadi Road, Near Padmavati Mahila University, Tirupati, Andhra Pradesh - 517501',
    phone: '+919398765432',
     category: 'pizza'
  },
  {
    name: "Chinatown Express",
    rating: getRandomRating(),
    img: chinatown,
    img1:'https://visitsoutherndelaware.com/media/markets/so-del/images/listings/206/4cb038cfd11e73a0d7ee2d0c569f54a8.jpg?w=880&h=660&zoomfit=1',
    img2:'https://media-cdn.tripadvisor.com/media/photo-s/03/9a/1c/3d/chinatown-express.jpg',
    address: 'Ramanuja Circle, Opp. M&M Showroom, Tirupati, Andhra Pradesh - 517501',
    phone: '+918889001122',
     category: 'chinese'
  },
  {
    name: "Exotikka Indo-Chinese",
    rating: getRandomRating(),
    img: exotikka,
    img1:'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/restaurant/cover/Exotikka9447LoneTreeCO_1.png',
    img2:'https://img.freepik.com/premium-photo/schezwan-fried-rice-masala-is-popular-indo-chinese-food-served-plate-bowl-with-chopsticks_466689-47462.jpg?w=2000',
    address: 'Opp. Shilparamam, AIR Bypass Road, Tirupati, Andhra Pradesh - 517501',
    phone: '+919100998877',
    category: 'chinese'
  },
  {
    name: "Maong's Kitchen",
    rating: getRandomRating(),
    img: maongskitchen,
    img1:'https://www.menulation.com/images/mings-kitchen-chinese-takeaway-jacksdale-wmwl.png',
    img2:'https://www.menulation.com/images/mings-kitchen-chinese-takeaway-jacksdale-wmwl.png',
    address: 'STV Nagar, Near Sri Chaitanya School, Tirupati, Andhra Pradesh - 517501',
    phone: '+917799112211',
    category: 'chinese'
  },
  {
    name: "Misaki Asian Diner",
    rating: getRandomRating(),
    img: misaki,
    img1:'https://img.restaurantguru.com/r035-Misaki-asian-kitchen-interior.jpg',
    img2:'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/7b/c2/74/east-village-asian-diner.jpg?w=2000&h=-1&s=1',
    address: 'AIR Bypass Road, Near Tirumala Hospital, Tirupati, Andhra Pradesh - 517501',
    phone: '+918761223344',
    category: 'chinese'
  },
  {
    name: "Red Chilli Chinese",
    rating: getRandomRating(),
    img: redchillichinese,
    img1:'https://image.shutterstock.com/z/stock-photo-billboard-red-chilli-chinese-restaurant-at-manchester-england-1610414581.jpg',
    img2:'https://electricpressuk.com/wp-content/uploads/2018/03/SDP3236-0504-2-red-chilli-news-1024x373.jpg',
    address: 'D.No. 7-2-12, RC Road, Near SP Office, Tirupati, Andhra Pradesh - 517501',
    phone: '+919845667788',
    category: 'chinese'
  },
  {
    name: "Wok Express",
    rating: getRandomRating(),
    img: wokexpress,
    img1:'https://metrodiningdelivery.com/sponsors/wokexpress_on.png',
    img2:'https://toasttab.s3.amazonaws.com/restaurants/restaurant-110381000000000000/banner_1653332200.jpg',
    address: 'Shop No. 6, Leela Mahal Road, Near Lakshmi Vilas, Tirupati, Andhra Pradesh - 517501',
    phone: '+919322445566',
    category: 'chinese'
  }
];
export default resturants;