import axios from 'axios';

// Get the token from localStorage
const token = localStorage.getItem("token");

// Create Product API
export const createProductAPI = async (newProduct) => {
  try {
    const res = await axios.post('http://localhost:8000/api/products', newProduct, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return res.data; // Returns the response data
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error(error.response?.data?.message || "Failed to create product");
  }
};

// Get all products API
export const getProductsAPI = async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/products', {
      withCredentials: true,
    });

    if (res.data && res.data.data) {
      return res.data.data; // Assuming response format { data: { data: products } }
    } else {
      console.error("Unexpected response format:", res);
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};

// Delete Product API
export const deleteProductAPI = async (productID) => {
  try {
    const res = await axios.delete(`http://localhost:8000/api/products/${productID}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data; // Returns the response data after deletion
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error(error.response?.data?.message || "Failed to delete product");
  }
};

// Update Product API
export const updateProductAPI = async (productID, updatedProduct) => {
  try {
    const res = await axios.put(`http://localhost:8000/api/products/${productID}`, updatedProduct, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data; // Returns the response data after updating
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error(error.response?.data?.message || "Failed to update product");
  }
};

// Increment Rating API
export const incrementRatingAPI = async (productID, increment) => {
  try {
    const res = await axios.patch(
      `http://localhost:8000/api/products/${productID}/incrementRating`,
      { increment },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return res.data; // Returns the updated rating info
  } catch (error) {
    console.error("Error incrementing rating:", error);
    throw new Error(error.response?.data?.message || "Failed to increment rating");
  }
};
