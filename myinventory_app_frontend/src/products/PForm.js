import React, { useState } from 'react';
import classes from './ProductForm.module.css';
import ErrorModal from '../ErrorModal';
import { saveProduct } from '../features/Productactions';
import { useDispatch } from 'react-redux';
// import { saveProduct } from '../ProductSlice';
 
const ProductForm = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        date: ''
    });
 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
 
        if (name === 'name') {
            if (!value || value.charAt(0) !== value.charAt(0).toUpperCase()) {
                setError('Product name must start with a capital letter.');
                setSuccess('');
            } else {
                setError('');
                setSuccess('Product name is valid.');
            }
        }
 
        if (name === 'description') {
            if (value.length > 20) {
                setError('Description must not exceed 20 characters.');
                setSuccess('');
            } else {
                setError('');
                setSuccess('Description is valid.');
            }
        }
 
        if (name === 'date') {
            const today = new Date();
            const selectedDate = new Date(value);
            if (selectedDate < today) {
                setError('Expiry date cannot be in the past.');
                setSuccess('');
            } else {
                setError('');
                setSuccess('Expiry date is valid.');
            }
        }
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
 
        if (!product.name) {
            setError('Product name is required.');
            return;
        }
        if (!product.price) {
            setError('Price is required.');
            return;
        }
        if (!product.description) {
            setError('Description is required.');
            return;
        }
        if (!product.date) {
            setError('Expiry date is required.');
            return;
        }
 
        if (product.name.charAt(0) !== product.name.charAt(0).toUpperCase()) {
            setError('Product name should start with a capital letter.');
            return;
        }
 
        if (product.description.length > 20) {
            setError('Description should be only of 20 characters.');
            return;
        }
 
        const today = new Date();
        const selectedDate = new Date(product.date);
        if (selectedDate < today) {
            setError('Expiry date cannot be a previous date.');
            return;
        }
        else{
          console.log(selectedDate);
        }
 
        const newProduct = {
            ...product,
            expiryDate: product.date
        };
console.log(newProduct);
        await dispatch(saveProduct(newProduct));
        setProduct({
            name: '',
            price: '',
            description: '',
            date: ''
        });
        setSuccess('Product added successfully!');
    };
 
    const closeModal = () => {
        setError(null);
    };
 
    return (
        <div className={classes.Addform}>
            <form onSubmit={handleSubmit}>
            <h2>Product Form</h2>
                <label>
                    Enter Product Name:
                    <input type='text' id='name' name='name' value={product.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Enter Price:
                    <input type='number' id='price' name='price' value={product.price} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Enter Description:
                    <input type='text' name='description' value={product.description} id='description' onChange={handleChange} />
                </label>
                <br />
                <label>
                    Enter Expiry Date:
                    <input type='date' id='date' name='date' value={product.date} onChange={handleChange} />
                </label>
                {error && <ErrorModal message={error} onClose={closeModal} />}
                {success && <p className={classes.success} style={{ color: 'green' }}>{success}</p>}
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};
 
export default ProductForm
