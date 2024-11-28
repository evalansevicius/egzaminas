import axios from "axios";

const BASE_URL = "http://localhost:8000/api/products";

// Utility to get the token dynamically
const getToken = () => localStorage.getItem("token");

// Axios instance with default headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Allow sending cookies for authentication
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create Product API
export const createProductAPI = async (newProduct) => {
  try {
    const res = await apiClient.post("/", newProduct);
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error(error.response?.data?.message || "Failed to create product");
  }
};

// Get all products API
export const getProductsAPI = async () => {
  try {
    const res = await apiClient.get("/");
    return res.data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};

// Delete Product API
export const deleteProductAPI = async (productID) => {
  try {
    const res = await apiClient.delete(`/${productID}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(error.response?.data?.message || "Failed to delete product");
  }
};

// Update Product API
export const updateProductAPI = async (productID, updatedProduct) => {
  try {
    const res = await apiClient.put(`/${productID}`, updatedProduct);
    return res.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error(error.response?.data?.message || "Failed to update product");
  }
};

// Increment Rating API
export const incrementRatingAPI = async (productID, increment) => {
  try {
    const res = await apiClient.patch(`/${productID}/incrementRating`, { increment });
    return res.data;
  } catch (error) {
    console.error("Error incrementing rating:", error);
    throw new Error(error.response?.data?.message || "Failed to increment rating");
  }
};
