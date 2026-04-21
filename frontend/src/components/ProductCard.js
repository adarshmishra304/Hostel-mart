function ProductCard({ product, onAdd, onBuy, isSeller }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{product.name}</h3>
        <span style={styles.price}>₹{product.price}</span>
      </div>

      <p style={styles.category}>{product.category}</p>
      <p style={styles.desc}>{product.description}</p>
        
        {/* ✅ ADD THIS */}
{product.expiryDate && (
  <p style={styles.expiry}>
    Expiry: {new Date(product.expiryDate).toLocaleDateString()}
  </p>
)}
      {/* 👤 USER VIEW */}
      {!isSeller && (
        <div style={styles.actions}>
          <button
            style={styles.cartBtn}
            onClick={() => onAdd && onAdd(product)}
          >
            Add to Cart
          </button>

          <button
            style={styles.buyBtn}
            onClick={() => onBuy && onBuy(product._id)}
          >
            Buy Now
          </button>
        </div>
      )}

      {/* 🏪 SELLER VIEW */}
      {isSeller && (
        <p style={{ color: "#e67e22", marginTop: "10px" }}>
          Seller View
        </p>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    margin: 0,
  },
  price: {
    fontWeight: "bold",
    color: "#2ecc71",
  },
  category: {
    fontSize: "12px",
    color: "#888",
  },
  desc: {
    fontSize: "14px",
    margin: "10px 0",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  cartBtn: {
    flex: 1,
    background: "#3498db",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  buyBtn: {
    flex: 1,
    background: "#2ecc71",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  expiry: {
  fontSize: "12px",
  color: "#e74c3c",
  marginTop: "5px"
},
};

export default ProductCard;