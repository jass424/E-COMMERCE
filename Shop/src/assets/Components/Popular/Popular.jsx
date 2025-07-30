import React, { useContext } from 'react';
import './Popular.css';
import Item from '../Items/Item';
import { ShopContext } from '../Context/ShopContext';

function Popular() {
  const { all_product } = useContext(ShopContext);

  // Filter only women's products and take first 4
  const popularProducts = all_product
    ?.filter(item => item.category === 'women')
    .slice(0, 4); // ✅ Only 4 products

  return (
    <div className="popular">
      <h1>Popular In Women</h1>
      <hr />
      <div className="popular-items">
        {popularProducts?.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;



// import React, { useContext } from 'react';
// import './Popular.css';
// import Item from '../Items/Item';
// import { ShopContext } from '../Context/ShopContext';

// function Popular() {
//   const { all_product } = useContext(ShopContext);

//   // Filter for women’s products as an example
//   const popularProducts = all_product?.filter(item => item.category === 'women');

//   return (
//     <div className="popular">
//       <h1>Popular In Women</h1>
//       <hr />
//       <div className="popular-items">
//         {popularProducts?.map((item, index) => (
//           <Item
//             key={index}
//             id={item.id}
//             name={item.name}
//             image={item.image}
//             new_price={item.new_price}
//             old_price={item.old_price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Popular;




// import React from 'react';
// import './Popular.css';
// import data from '../../data.js';
// import Item from '../Items/Item';

// function Popular() {
//   return (
//     <div className="popular">
//       <h1>Popular In Women</h1>
//       <hr />
//       <div className="popular-items">
//         {data.map((item, index) => (
//           <Item
//             key={index}
//             id={item.id}
//             name={item.name}
//             image={item.image}
//             new_price={item.new_price}
//             old_price={item.old_price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Popular;

