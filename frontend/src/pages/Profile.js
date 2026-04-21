import { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";

function Profile() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    getOrders(user._id).then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map(o => (
        <p key={o._id}>
          Product: {o.productId} | Qty: {o.quantity}
        </p>
      ))}
    </div>
  );
}

export default Profile;