import React, { useContext } from 'react';
import Item from '../Items/Item';
import './NewCollections.css';
import { ShopContext } from '../Context/ShopContext';

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);

  // Filter or sort as needed for "new" products
  const newProducts = all_product?.slice(-4); // last 8 added products (example)

  return (
    <div className='new-collections'>
      <h1>New Collections</h1>
      <hr />
      <div className='collections'>
        {newProducts?.map((item, index) => (
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
};

export default NewCollections;




// import React from 'react';
// import Item from '../Items/Item'; 
// import './NewCollections.css';
// import data from '../../data1.js'; 

// const NewCollections = () => {
//   return (
//     <div className='new-collections'>
//       <h1>New Collections</h1>
//       <hr />
//       <div className='collections'>
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
// };

// export default NewCollections;
