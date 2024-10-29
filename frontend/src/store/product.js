import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
	
	products: [],
	setProducts: (products) => set({ products }),
	
	createProduct: async (newProduct) => {
	  if (!newProduct.name || !newProduct.image || !newProduct.price) {
		return { success: false, message: "Please fill in all fields." };
	  }
  
	  try {
		const token = localStorage.getItem('token')
		const res = await axios.post('http://localhost:8000/api/products', newProduct, {
		  headers: {
			Authorization: `Bearer ${token}`,  // Send the JWT token in the Authorization header
		  },
		  withCredentials: true,
		});
  
		set((state) => ({ products: [...state.products, res.data] }));
		return { success: true, message: "Product created successfully" };
	  } catch (error) {
		return { success: false, message: error.response?.data?.message || "Error creating product" };
	  }
	},

	getProducts: async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/', {withCredentials:true});
			set((state) => ({ products: res.data.data }));
		  } catch (error) {
			console.error("Error fetching products:", error);
		  }
	},
	deleteProduct: async (productID) => {
		try {
			const token = localStorage.getItem('token')
		  const res = await axios.delete(`http://localhost:8000/api/products/${productID}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			  },
			  withCredentials: true,
		  });
	  
		  const data = res.data; 
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
		const token = localStorage.getItem('token')
		  const res = await axios.put(`http://localhost:8000/api/products/${productID}`, updatedProduct, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			  },
			  withCredentials: true,
		  });
	  
		  const data = res.data;  
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
	  
	  incrementRating: async (productID) => {
		try {
			const token = localStorage.getItem("token");
			const res = await axios.patch(`http://localhost:8000/api/products/${productID}/incrementRating`, {}, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				withCredentials: true,
			});

			const data = res.data;
			if (!data.success) {
				return { success: false, message: data.message };
			}

			// Update the product's rating in the Zustand store
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