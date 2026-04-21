import { useState } from "react";
import { addProduct } from "../api/productApi";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    expiryDate: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await addProduct(form);
      alert("Product added successfully ✅");
      navigate("/shop");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Product 🏪</h2>

      <input name="name" placeholder="Product Name" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} />
      <input name="expiryDate" type="date" onChange={handleChange} />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default AddProduct;