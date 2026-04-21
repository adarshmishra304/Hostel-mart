import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>🏠 Welcome to Hostel Mart</h1>
      <p>Shop snacks, stationery, and essentials easily.</p>

      <button style={styles.btn} onClick={() => navigate("/shop")}>
        Go to Shop 🛒
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "80px" },
  btn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Home;