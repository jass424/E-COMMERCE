import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './assets/Components/Navbar.jsx';
import Footer from './assets/Components/Footer/Footer.jsx';

import Shop from './assets/Pages/Shop.jsx';
import Shopcategory from './assets/Pages/Shopcategory.jsx';
import Product from './assets/Pages/Product.jsx';
import Cart from './assets/Pages/Cart.jsx';
import LoginPage from './assets/Pages/LoginPage.jsx'; // Signup
import Login from './assets/Pages/Login.jsx';          // Login
import Checkout from './assets/Components/Checkout/Checkout.jsx';
import ProceedToPayment from './assets/Components/ProceedToPayment/ProceedToPayment.jsx';
import OrderPlaced from './assets/Components/OrderPlaced/OrderPlaced.jsx';
import Orderx from './assets/Components/Orderx/Orderx.jsx';

import men_banner from './assets/banner_mens.png';
import women_banner from './assets/banner_women.png';
import kids_banner from './assets/banner_kids.png';

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];

  const shouldHideNav = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<Shopcategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<Shopcategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<Shopcategory banner={kids_banner} category="kid" />} />
        <Route path="/product/:productID" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderx" element={<Orderx />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<ProceedToPayment />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />
      </Routes>
      {!shouldHideNav && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
