import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, i) => sum + i.quantity, 0);
    setCartCount(count);
  };

  updateCart(); // initial load

  // 🔥 listen to custom event
  window.addEventListener("cartUpdated", updateCart);

  return () => {
    window.removeEventListener("cartUpdated", updateCart);
  };
}, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>Hostel Mart</Link>
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {user && <Link to="/shop" style={styles.link}>Shop</Link>}
        {user && <Link to="/cart" style={styles.link}>Cart ({cartCount})</Link>}
        {user && <Link to="/profile" style={styles.link}>Profile</Link>}

        {user ? (
          <button onClick={logout} style={styles.btn}>Logout</button>
        ) : (
          <Link to="/login" style={styles.btn}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#2c3e50",
    color: "#fff",
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  btn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Navbar;