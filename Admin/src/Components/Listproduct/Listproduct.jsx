import React, { useEffect, useState } from "react";
import "./Listproduct.css";

const Listproduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const withDiscount = data.products.map(product => ({
            ...product,
            discount: product.discount !== undefined ? product.discount : 5,
          }));
          setProducts(withDiscount);
          setFilteredProducts(withDiscount);
        }
      });
  };

  const applyFilters = () => {
    let updated = [...products];

    if (search) {
      updated = updated.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      updated = updated.filter(p => p.category === category);
    }

    updated.sort((a, b) => {
      const keyA = a[sortKey];
      const keyB = b[sortKey];
      return sortOrder === "asc" ? keyA - keyB : keyB - keyA;
    });

    setFilteredProducts(updated);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/deleteproduct/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) fetchProducts();
      });
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
  };

  const handleEditSave = () => {
    const updatedProduct = {
      ...editProduct,
      new_price: Math.round(
        editProduct.old_price -
        (editProduct.discount / 100) * editProduct.old_price
      )
    };

    fetch(`http://localhost:5000/updateproduct/${editProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEditProduct(null);
          fetchProducts();
        }
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, category, sortKey, sortOrder, products]);

  return (
    <div className="list-container">
      <h2 className="l1"><span>Product List</span></h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="date">Date</option>
          <option value="new_price">New Price</option>
          <option value="old_price">Old Price</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="product-table-header">
        <div>Product</div>
        <div>Title</div>
        <div>Old Price</div>
        <div>New Price</div>
        <div>Discount</div>
        <div>Category</div>
        <div>Actions</div>
      </div>

      {filteredProducts.map((product) => (
        <div className="product-table-row" key={product._id}>
          <div>
            <img src={product.image} alt={product.name} className="table-img" />
          </div>
          <div>{product.name}</div>
          <div>₹{product.old_price}</div>
          <div>₹{Math.round(product.old_price - (product.discount / 100) * product.old_price)}</div>
          <div>{product.discount}%</div>
          <div>{product.category}</div>
          <div className="action-icons">
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        </div>
      ))}

      {editProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            />
            <input
              type="number"
              value={editProduct.old_price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, old_price: Number(e.target.value) })
              }
            />
            <input
              type="number"
              value={editProduct.discount}
              onChange={(e) =>
                setEditProduct({ ...editProduct, discount: Number(e.target.value) })
              }
              placeholder="Discount %"
            />
            <input
              type="number"
              readOnly
              value={Math.round(
                editProduct.old_price -
                (editProduct.discount / 100) * editProduct.old_price
              )}
              placeholder="New Price"
            />
            <select
              value={editProduct.category}
              onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleEditSave}>Save</button>
              <button onClick={() => setEditProduct(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listproduct;
