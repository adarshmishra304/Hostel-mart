function CartItem({ item, onRemove, onIncrease, onDecrease }) {
  return (
    <div style={styles.row}>
      <div>
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>
      </div>

      <div style={styles.controls}>
        <button onClick={() => onDecrease(item._id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item._id)}
            disabled={item.quantity >= item.stock}>+</button>
      </div>

      <button style={styles.remove} onClick={() => onRemove(item._id)}>
        Remove
      </button>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
  controls: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  remove: {
    color: "red",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
};

export default CartItem;