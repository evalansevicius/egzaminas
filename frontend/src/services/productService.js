import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Increment rating function
export const incrementRating = async (productID) => {
    const response = await axios.patch(`${backendUrl}/api/products/${productID}/incrementRating`);
    return response.data;
};