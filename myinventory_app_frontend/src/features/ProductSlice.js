import { createSlice } from '@reduxjs/toolkit';
import { 
    fetchProduct, 
    saveProduct, 
    deleteProduct, 
    editProduct,
    searchProductsByName,
    searchProductById,
    filterProductsByPrice,
    filterProductsByName 
} from './Productactions';

const initialState = {
    products: [],
    status: 'idle',
    error: null,
    loading: false,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Existing cases
        builder
            // Fetch all products
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Adding product
            .addCase(saveProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(saveProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Deleting product
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Edit product
            .addCase(editProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })

            // New cases for search and filter
            // Search by name
            .addCase(searchProductsByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProductsByName.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(searchProductsByName.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Search by ID
            .addCase(searchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(searchProductById.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Filter by price
            .addCase(filterProductsByPrice.fulfilled, (state, action) => {
                state.products = action.payload;
            })

            // Filter by name
            .addCase(filterProductsByName.fulfilled, (state, action) => {
                state.products = action.payload;
            });
    },
});

export default productSlice.reducer;