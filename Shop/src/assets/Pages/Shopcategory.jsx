import React, { useContext } from 'react';
import { ShopContext } from '../Components/Context/ShopContext';
import './Shopcategory.css';
import drop from '../dropdown_icon.png';
import Item from '../Components/Items/Item';

const Shopcategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="shopcategory">
      {props.banner && (
        <img src={props.banner} alt="Category Banner" className="shopcategory-banner" />
      )}

      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1–12</span> out of {all_product ? all_product.length : 0} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={drop} alt="Sort icon" />
        </div>
      </div>

      {/* ✅ Product grid */}
      <div className="shopcategory-products">
        {all_product &&
          all_product
            .filter(
              (item) =>
                item.category.toLowerCase() === props.category.toLowerCase()
            )
            .map((item, i) => (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))}
      </div>

      {/* ✅ Explore More button now outside the grid */}
      <div className="Shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default Shopcategory;
