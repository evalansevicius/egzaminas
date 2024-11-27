import { create } from 'zustand';
import {
  createProductAPI,
  getProductsAPI,
  deleteProductAPI,
  updateProductAPI,
  incrementRatingAPI,
} from '../services/productService';

export const useProductStore = create((set) => ({
  products: [], // Initialize products as an empty array
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const data = await createProductAPI(newProduct);
      set((state) => ({ products: [...state.products, data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: error.message || "Error creating product" };
    }
  },

  getProducts: async () => {
    try {
      const products = await getProductsAPI();
      // Ensure products is always an array (even if the API returns null or undefined)
      set({ products: Array.isArray(products) ? products : [] });
    } catch (error) {
      console.error("Error fetching products:", error);
      // Set an empty array in case of error, so it doesn't break the UI
      set({ products: [] });
    }
  },

  deleteProduct: async (productID) => {
    try {
      const data = await deleteProductAPI(productID);
      if (!data.success) {
        return { success: false, message: data.message };
      }
      set((state) => ({
        products: state.products.filter((product) => product.productID !== productID),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting product:", error.message);
      return { success: false, message: "Failed to delete product" };
    }
  },

  updateProduct: async (productID, updatedProduct) => {
    try {
      const data = await updateProductAPI(productID, updatedProduct);
      if (!data.success) {
        return { success: false, message: data.message };
      }
      set((state) => ({
        products: state.products.map((product) =>
          product.productID === productID ? data.data : product
        ),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating product:", error.message);
      return { success: false, message: "Failed to update product" };
    }
  },

  incrementRating: async (productID, increment) => {
    try {
      const data = await incrementRatingAPI(productID, increment);
      if (!data.success) {
        return { success: false, message: data.message };
      }
      set((state) => ({
        products: state.products.map((product) =>
          product.productID === productID ? { ...product, rating: data.rating } : product
        ),
      }));
      return { success: true, message: data.message, rating: data.rating };
    } catch (error) {
      console.error("Error incrementing rating:", error.message);
      return { success: false, message: "Failed to update rating" };
    }
  },
}));
