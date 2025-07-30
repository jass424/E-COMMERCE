import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAllProduct(data.products);

   
          const cart = {};
          data.products.forEach(p => (cart[p.id] = 0));
          setCartItems(cart);
        }
      });
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0),
    }));
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = all_product.find((p) => p.id === Number(itemId));
      if (product && cartItems[itemId] > 0) {
        total += product.new_price * cartItems[itemId];
      }
    }
    return total;
  };

  return (
    <ShopContext.Provider
      value={{
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;




// import React, { createContext, useState, useEffect } from 'react';

// export const ShopContext = createContext(null);

// const ShopContextProvider = ({ children }) => {
//   const [all_product, setAllProduct] = useState([]);
//   const [cartItems, setCartItems] = useState({});

//   // 🧠 Create default cart using dynamic product IDs
//   const getDefaultCart = (products) => {
//     const cart = {};
//     products.forEach(product => {
//       cart[product.id] = 0;
//     });
//     return cart;
//   };

//   // 📦 Fetch products from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/products")
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setAllProduct(data.products);
//           setCartItems(getDefaultCart(data.products));
//         }
//       })
//       .catch(err => console.error("❌ Failed to fetch products:", err));
//   }, []);

//   const addToCart = (itemId) => {
//     setCartItems(prev => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1,
//     }));
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems(prev => ({
//       ...prev,
//       [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
//     }));
//   };

//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (const itemId in cartItems) {
//       const product = all_product.find((p) => p.id === Number(itemId));
//       if (product && cartItems[itemId] > 0) {
//         total += product.new_price * cartItems[itemId];
//       }
//     }
//     return total;
//   };

//   return (
//     <ShopContext.Provider
//       value={{
//         all_product,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//       }}
//     >
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;



// import React, { createContext, useState, useEffect } from 'react';
// import all_product from '../../all_product';

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let i = 0; i < all_product.length; i++) {
//     cart[all_product[i].id] = 0; // ✅ use product.id
//   }
//   return cart;
// };

// const ShopContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});

//   useEffect(() => {
//     setCartItems(getDefaultCart());
//   }, []);

//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] + 1,
//     }));
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: Math.max(prev[itemId] - 1, 0),
//     }));
//   };

//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (const itemId in cartItems) {
//       const product = all_product.find((p) => p.id === Number(itemId));
//       if (product && cartItems[itemId] > 0) {
//         total += product.new_price * cartItems[itemId];
//       }
//     }
//     return total;
//   };

//   return (
//     <ShopContext.Provider
//       value={{
//         all_product,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//       }}
//     >
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;
