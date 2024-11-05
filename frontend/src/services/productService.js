import axios from 'axios';

const token = localStorage.getItem("token");

export const createProductAPI = async (newProduct) => {
  const res = await axios.post('http://localhost:8000/api/products', newProduct, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data;
};

export const getProductsAPI = async () => {
  const res = await axios.get('http://localhost:8000/api/', { withCredentials: true });
  return res.data.data;
};

export const deleteProductAPI = async (productID) => {
  const res = await axios.delete(`http://localhost:8000/api/products/${productID}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data;
};

export const updateProductAPI = async (productID, updatedProduct) => {
  const res = await axios.put(`http://localhost:8000/api/products/${productID}`, updatedProduct, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    withCredentials: true,
  });
  return res.data;
};

export const incrementRatingAPI = async (productID, increment) => {
  const res = await axios.patch(
    `http://localhost:8000/api/products/${productID}/incrementRating`,
    { increment },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
  return res.data;
};
