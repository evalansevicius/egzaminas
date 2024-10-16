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
		const res = await fetch('http://localhost:8000/api/products');
		const data = await res.json();
		set({ products: data.data });
	},
	deleteProduct: async (productID) => {
		const res = await fetch(`http://localhost:8000/api/products/${productID}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product.productID !== productID) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (productID, updatedProduct) => {
		const res = await fetch(`http://localhost:8000/api/products/${productID}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));