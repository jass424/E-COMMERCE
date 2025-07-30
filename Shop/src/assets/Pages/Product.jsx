import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Components/Context/ShopContext';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';


const Product = () => {
  const { productID } = useParams();
  const { all_product } = useContext(ShopContext); // ✅ Use consistent casing

  const product = all_product
    ? all_product.find((e) => e.id === Number(productID))
    : null;

  if (!product) {
    return <div style={{ padding: '2rem' }}>Loading product...</div>; // or "Product not found"
  }

  return (
    <>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
      <RelatedProducts
  allProducts={all_product}
  currentProductId={product.id}
  currentCategory={product.category}
/>

    </>
  );
};

export default Product;
