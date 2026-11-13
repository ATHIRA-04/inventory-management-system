
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Get all products
  const fetchProducts = async () => {
  try {
    setErrorMessage("");

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Could not load products");
    }

    const data = await response.json();
    setProducts(data);

  } catch (error) {
    console.error(error);
    setErrorMessage("Unable to load products. Please check your backend.");
  }
};
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
  alert("Product name cannot be empty!");
  return;
}

    const product = {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
    };

    try {
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Unable to save product");

      resetForm();
      fetchProducts();
    } catch (error) {
      alert(error.message);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description || "");
    setPrice(product.price);
    setQuantity(product.quantity);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Unable to delete product");

      fetchProducts();
    } catch (error) {
      alert(error.message);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setEditId(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalValue = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>📦 StockFlow</h2>
        <p className="menu-title">MENU</p>
        <a
  href="#dashboard"
  onClick={() => setActiveMenu("dashboard")}
  className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
>
  ▦ Dashboard
</a>

<a
  href="#products"
  onClick={() => setActiveMenu("products")}
  className={`menu-item ${activeMenu === "products" ? "active" : ""}`}
>
  ▤ Products
</a>
        <div className="sidebar-bottom">Inventory Management</div>
      </aside>

     <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <h1>Inventory Dashboard</h1>
            <p>Manage your products and stock in one place.</p>
          </div>
          <span className="admin">Admin</span>
        </header>

        <section className="stats">
          <div className="stat-card">
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>
          <div className="stat-card">
            <p>Total Stock</p>
            <h2>{totalStock}</h2>
          </div>
          <div className="stat-card">
            <p>Inventory Value</p>
            <h2>₹{totalValue.toFixed(2)}</h2>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h2>{editId ? "Update Product" : "Add New Product"}</h2>

            <form onSubmit={handleSubmit}>
              <label>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Description</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label>Price (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label>Quantity</label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />

              <button type="submit" className="primary-btn">
                {editId ? "Update Product" : "Add Product"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="panel product-panel" id="products">
            <div className="table-heading">
              <h2>Product List</h2>
              <input
                className="search"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <strong>{product.name}</strong>
                        <small>{product.description}</small>
                      </td>
                      <td>₹{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="5">No products found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
