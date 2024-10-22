import { create } from "zustand";
import axios from "axios";
	
		export const useProductStore = create((set) => ({
			products: [],
			setProducts: (products) => set({ products }),
			createProduct: async (newProduct) => {
				if (!newProduct.name || !newProduct.image || !newProduct.price) {
					return { success: false, message: "Please fill in all fields." };
				}
				const res = await axios.post('http://localhost:8000/api/products', newProduct,{withCredentials:true});
				set((state) => ({ products: [...state.products, res.data] }));
				return { success: true, message: "Product created successfully" };
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
		  const res = await axios.delete(`http://localhost:8000/api/products/${productID}`, {
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
		  const res = await axios.put(`http://localhost:8000/api/products/${productID}`, updatedProduct, {
			withCredentials: true,
			headers: {
			  "Content-Type": "application/json",
			},
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
	  
}));