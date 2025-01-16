import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constants/Helperconstant';

export const fetchProduct = createAsyncThunk('products/getproducts', async () => {
    const response = await axios.get('http://localhost:8082/products/list');
    return response.data;
});

export const saveProduct = createAsyncThunk('products/save', async (product) => {
    try {
        const response = await axios.post(`${API_URL}/add`, product, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed');
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
    await fetch(`${API_URL}/delete/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return productId;
});

export const editProduct = createAsyncThunk('products/edit', async ({ productId, productData }) => {
    try {
        const response = await axios.put(`${API_URL}/update/${productId}`, productData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to update product');
    }
});

// New actions for search and filter functionality
export const searchProductsByName = createAsyncThunk(
    'products/searchByName',
    async (searchTerm) => {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                params: { name: searchTerm }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : 'Search failed');
        }
    }
);

export const searchProductById = createAsyncThunk(
    'products/searchById',
    async (productId) => {
        try {
            const response = await axios.get(`${API_URL}/search/${productId}`);
            return [response.data]; // Wrap in array to maintain consistency with state
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : 'Search by ID failed');
        }
    }
);

export const filterProductsByPrice = createAsyncThunk(
    'products/filterByPrice',
    async () => {
        try {
            const response = await axios.get(`${API_URL}/filter/price`);
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : 'Price filtering failed');
        }
    }
);

export const filterProductsByName = createAsyncThunk(
    'products/filterByName',
    async () => {
        try {
            const response = await axios.get(`${API_URL}/filter/name`);
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : 'Name filtering failed');
        }
    }
);