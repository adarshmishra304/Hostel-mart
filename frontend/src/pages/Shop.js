import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import { createOrder } from "../api/orderApi";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";


function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
    
  );

const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate(); // ✅ ADD THIS
  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data));
  }, []);

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));

  // 🔥 FIRE EVENT AFTER CART IS UPDATED
  window.dispatchEvent(new Event("cartUpdated"));
}, [cart]);

  // 🛒 USER: Add to cart
  const addToCart = (product) => {
  if (!user || user.role !== "user") return;

  const existing = cart.find(i => i._id === product._id);

  if (existing) {
    // 🚫 STOP if exceeds stock
    if (existing.quantity >= product.quantity) {
      alert("Stock limit reached ❌");
      return;
    }

    setCart(cart.map(i =>
      i._id === product._id
        ? { ...i, quantity: i.quantity + 1 }
        : i
    ));
  } else {
    // also check if stock is 0
    if (product.quantity <= 0) {
      alert("Out of stock ❌");
      return;
    }

   setCart([...cart, { 
  ...product, 
  quantity: 1,
  stock: product.quantity // ✅ IMPORTANT
}]);
  }
};

  // 💳 USER: Buy now
  const buyNow = async (id) => {
    if (!user || user.role !== "user") return;

    await createOrder({
      userId: user._id,
      productId: id,
      quantity: 1
    });

    alert("Order placed");
  };

  // 🏪 SELLER: Add product (placeholder)
  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <div>
      {/* 🏪 Seller Button */}
      {user?.role === "seller" && (
        <div style={{ padding: "20px" }}>
          <button style={styles.addBtn} onClick={handleAddProduct}>
            + Add Product
          </button>
        </div>
      )}

      {/* 🛍️ Product Grid */}
      <div style={styles.grid}>
        {products.map(p => (
          <ProductCard
            key={p._id}
            product={p}
            onAdd={user?.role === "user" ? addToCart : null}
            onBuy={user?.role === "user" ? buyNow : null}
            isSeller={user?.role === "seller"}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  addBtn: {
    padding: "10px 20px",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Shop;