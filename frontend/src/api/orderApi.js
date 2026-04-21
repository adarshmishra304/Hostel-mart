import api from "./base";

export const createOrder = (data) => api.post("/orders", data);
export const getOrders = (userId) => api.get(`/orders/${userId}`);