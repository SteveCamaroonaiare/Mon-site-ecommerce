import axios from 'axios';

export const addToCart = (productId, quantity, variationId = null) => {
    return axios.post('/api/cart/add', { 
        product_id: productId, 
        quantity, 
        product_variation_id: variationId 
    });
};

export const fetchCart = () => axios.get('/api/cart');