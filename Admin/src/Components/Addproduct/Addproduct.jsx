import React, { useState } from 'react';
import './Addproduct.css';
import Upload from "../../assets/upload2.webp";

const Add_Product = async () => {
  try {
    const fileInput = document.getElementById("file-input");
    const imageFile = fileInput?.files[0];

    if (!imageFile) {
      alert("Please select a product image.");
      return;
    }

    // Step 1: Upload Image
    const formData = new FormData();
    formData.append("product", imageFile);

    const uploadRes = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadData.success) {
      alert("Image upload failed.");
      return;
    }

    // Step 2: Add Product
    const finalProduct = {
      ...productDetails,
      id: Date.now(), // unique ID
      image: uploadData.image.url,
    };

    const productRes = await fetch("http://localhost:5000/addproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalProduct),
    });

    const result = await productRes.json();
    if (result.success) {
      alert("✅ Product added successfully!");
      setProductDetails({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
      });
      setPreviewImage(null);
    } else {
      alert("❌ Product not added.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Server error occurred.");
  }
};


const Addproduct = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    try {
      const fileInput = document.getElementById("file-input");
      const imageFile = fileInput?.files[0];

      if (!imageFile) {
        alert("Please select a product image.");
        return;
      }

      const formData = new FormData();
      formData.append("product", imageFile);

      const uploadRes = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert("Image upload failed.");
        return;
      }

      const finalProduct = {
        ...productDetails,
        id: Date.now(), // Auto-generate ID
        image: uploadData.image.url,
      };

      const productRes = await fetch("http://localhost:5000/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalProduct),
      });

      const result = await productRes.json();

      if (result.success) {
        alert("✅ Product added successfully!");
        setProductDetails({
          name: "",
          image: "",
          category: "women",
          new_price: "",
          old_price: "",
        });
        setPreviewImage(null);
      } else {
        alert("❌ Product not added.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Server error occurred.");
    }
  };

  return (
    <div className="add-product">
      <div className="form-group title-center">
        <label htmlFor="title"> <span> Product Name</span> </label>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          id="title"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="old_price"> <span> Price</span> </label>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            id="old_price"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="form-group">
          <label htmlFor="new_price"> <span> Offer Price</span> </label>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            id="new_price"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category"> <span> Product Category</span> </label>
          <select
            value={productDetails.category}
            onChange={changeHandler}
            name="category"
            id="category"
            className="add-product-selector"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="file-input"> <span> Product Image</span> </label>
          <label htmlFor="file-input">
            <img
              src={previewImage || Upload}
              alt="Preview"
              className="image-preview"
            />
          </label>
          <input
            type="file"
            name="image"
            id="file-input"
            hidden
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="form-group center-btn">
        <button onClick={Add_Product} className="addproduct-btn">Add</button>
      </div>
    </div>
  );
};

export default Addproduct;
