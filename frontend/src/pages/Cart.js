import { useState } from "react";
import { createOrder } from "../api/orderApi";
import CartItem from "../components/CartItem";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increase = (id) => {
    updateCart(cart.map(i => {
      if (i._id === id) {
        if (i.quantity >= i.stock) {
          alert("Stock limit reached ❌");
          return i;
        }
        return { ...i, quantity: i.quantity + 1 };
      }
      return i;
    }));
  };

  const decrease = (id) => {
    updateCart(cart
      .map(i =>
        i._id === id ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter(i => i.quantity > 0)
    );
  };

  const remove = (id) => {
    updateCart(cart.filter(i => i._id !== id));
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const buyAll = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      for (let item of cart) {
        await createOrder({
          userId: user._id,
          productId: item._id,
          quantity: item.quantity
        });
      }

      alert("Order placed successfully ✅");
      updateCart([]);

    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => (
        <CartItem
          key={item._id}
          item={item}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={remove}
        />
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        style={styles.buyBtn}
        onClick={buyAll}
        disabled={cart.length === 0}
      >
        Buy All 🛒
      </button>
    </div>
  );
}

// ✅ OUTSIDE component
const styles = {
  buyBtn: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Cart;