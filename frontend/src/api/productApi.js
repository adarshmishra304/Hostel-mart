import api from "./base";

export const fetchProducts = () => api.get("/products");
export const addProduct = (data) => api.post("/products", data);