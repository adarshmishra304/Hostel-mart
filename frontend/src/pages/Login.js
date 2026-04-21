import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("user");

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  try {
    if (isSignup) {
      await registerUser({ ...form, role });
      alert("Registered successfully");
    } else {
      const res = await loginUser({ ...form, role });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      alert("Logged in");
    }
  } catch (err) {
    console.log("Error:", err.response); // 🔍 DEBUG
    alert(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="seller">Seller</option>
      </select>

      {isSignup && (
        <>
          <input name="name" placeholder="Name" onChange={handleChange} />
          {role === "user" && (
            <input name="username" placeholder="Username" onChange={handleChange} />
          )}
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="age" placeholder="Age" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />

          {role === "seller" && (
            <>
              <input name="panId" placeholder="PAN ID" onChange={handleChange} />
              <input name="upiId" placeholder="UPI ID" onChange={handleChange} />
              <input name="aadhar" placeholder="Aadhar" onChange={handleChange} />
            </>
          )}
        </>
      )}

      {!isSignup && role === "user" && (
        <input name="username" placeholder="Username" onChange={handleChange} />
      )}

      {!isSignup && role === "seller" && (
        <input name="email" placeholder="Email" onChange={handleChange} />
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {isSignup ? "Sign Up" : "Sign In"}
      </button>

      <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: "pointer" }}>
        {isSignup ? "Already have an account? Login" : "Create account"}
      </p>
    </div>
  );
}

export default Login;