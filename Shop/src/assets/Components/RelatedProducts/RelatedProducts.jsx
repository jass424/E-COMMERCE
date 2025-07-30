import React from 'react';
import './RelatedProducts.css';
import Item from '../Items/Item';

const RelatedProducts = ({ allProducts, currentCategory, currentProductId }) => {
  const related = allProducts
    ?.filter(item => item.category === currentCategory && item.id !== currentProductId)
    ?.slice(0, 4);

  if (!related || related.length === 0) {
    return <p style={{ textAlign: "center" }}>No related products found.</p>;
  }

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item) => (
          <Item
            key={item.id}
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

export default RelatedProducts;
