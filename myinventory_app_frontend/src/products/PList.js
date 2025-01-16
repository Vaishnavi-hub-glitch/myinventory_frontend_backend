import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './ProductList.module.css';
import { 
    fetchProduct, 
    deleteProduct, 
    editProduct,
    searchProductsByName,
    searchProductById,
    filterProductsByPrice,
    filterProductsByName 
} from '../features/Productactions';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchById, setSearchById] = useState('');
    const [sortType, setSortType] = useState('none');
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        expiryDate: '',
    });

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    // Existing handlers
    const handleDelete = (pId) => {
        dispatch(deleteProduct(pId));
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            expiryDate: product.expiryDate,
        });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editProduct({ 
            productId: currentProduct.id, 
            productData: formData 
        }));
        setIsEditing(false);
        setCurrentProduct(null);
    };

    // New handlers for search and filter
    const handleSearch = () => {
        if (searchTerm.trim()) {
            dispatch(searchProductsByName(searchTerm));
        } else {
            dispatch(fetchProduct());
        }
    };

    const handleSearchById = () => {
        if (searchById.trim()) {
            dispatch(searchProductById(searchById));
        } else {
            dispatch(fetchProduct());
        }
    };

    const handleSort = (type) => {
        setSortType(type);
        switch (type) {
            case 'price':
                dispatch(filterProductsByPrice());
                break;
            case 'name':
                dispatch(filterProductsByName());
                break;
            default:
                dispatch(fetchProduct());
        }
    };

    // Handle Enter key press for search
    const handleKeyPress = (e, searchType) => {
        if (e.key === 'Enter') {
            if (searchType === 'name') {
                handleSearch();
            } else if (searchType === 'id') {
                handleSearchById();
            }
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchById('');
        setSortType('none');
        dispatch(fetchProduct());
    };

    if (error) {
        return <div className={classes.error}>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className={classes.h1}>Product List</h1>
            
            {/* Search and Filter Section */}
            <div className={classes.searchFilter}>
                <div className={classes.searchSection}>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'name')}
                        className={classes.searchInput}
                    />
                    <button 
                        onClick={handleSearch} 
                        className={classes.searchButton}
                        disabled={loading}
                    >
                        Search 
                    </button>
                </div>
                
                <div className={classes.searchSection}>
                    <input
                        type="number"
                        placeholder="Search by ID..."
                        value={searchById}
                        onChange={(e) => setSearchById(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'id')}
                        className={classes.searchInput}
                    />
                    <button 
                        onClick={handleSearchById} 
                        className={classes.searchButton}
                        disabled={loading}
                    >
                        Search 
                    </button>
                </div>
                
                <div className={classes.filterSection}>
                    <select 
                        value={sortType} 
                        onChange={(e) => handleSort(e.target.value)}
                        className={classes.filterSelect}
                        disabled={loading}
                    >
                        <option value="none">Filter by...</option>
                        <option value="price">Price (High to Low)</option>
                        <option value="name">Product Name </option>
                    </select>
                </div>

                {(searchTerm || searchById || sortType !== 'none') && (
                    <button 
                        onClick={handleClearSearch} 
                        className={classes.searchButton}
                        disabled={loading}
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Loading State */}
            {loading && <div className={classes.loading}>Loading...</div>}

            {/* Product List Table */}
            {!loading && products.length === 0 ? (
                <p className={classes.noProducts}>No products available.</p>
            ) : (
                <div className={classes.productlist}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Expiry Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    {isEditing && currentProduct.id === product.id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <button 
                                                    className={classes.saveButton} 
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                >
                                                    Save
                                                </button>
                                                <button 
                                                    className={classes.cancelButton} 
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.description}</td>
                                            <td>{product.expiryDate}</td>
                                            <td>
                                                <button 
                                                    className={classes.editButton} 
                                                    onClick={() => handleEdit(product)}
                                                    disabled={loading}
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    className={classes.deleteButton} 
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={loading}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductList;