import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from 'react-router-dom';
import placeholderImage from '../images/products/pic9.jpg';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Productadd() {
    const navigate = useNavigate();
    const [image, setImage] = useState(placeholderImage);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        pname: '',
        price: '',
        description: '',
        quantity: '',
        category: ''
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/categories/list`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                setCategories(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('Unable to load categories. Please check server port 5000.');
            }
        };

        loadCategories();
    }, []);

    const imagebase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const nextImage = await imagebase64(file);
        setImage(nextImage);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!form.pname.trim() || !form.price || !form.quantity || !form.category) {
            setError('Please fill product name, price, quantity, and category.');
            return;
        }

        setSaving(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/products/add`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    pname: form.pname.trim(),
                    description: form.description.trim(),
                    image
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                const validationMessage = data.errors ? data.errors.map((item) => item.msg).join(', ') : data.msg;
                setError(validationMessage || 'Unable to add product.');
                return;
            }

            setMessage(data.msg || 'Product added successfully.');
            setTimeout(() => navigate('/product-grid'), 700);
        } catch (err) {
            setError('Unable to add product. Please check server port 5000.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Navbar activator2="active" />
            <div className="layout-wrapper admin-workspace">
                <div className="header admin-topbar">
                    <div className="menu-toggle-btn">
                        <button type="button" className="admin-soft-icon">
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                    <Link to="/dashboard" className="logo admin-brand">Bakery</Link>
                    <div className="page-title">Add Product</div>
                    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <button className="btn btn-outline-light" type="button">
                                <i className="bi bi-search"></i>
                            </button>
                            <input type="text" className="form-control" placeholder="Search..." />
                        </div>
                    </form>
                </div>

                <div className="content admin-content">
                    <div className="admin-hero">
                        <div>
                            <span>Catalog</span>
                            <h2>Add a New Product</h2>
                            <p>Add product details, stock quantity, category, price, and image in one clean flow.</p>
                        </div>
                        <Link to="/product-grid" className="admin-dark-btn">
                            <i className="bi bi-arrow-left"></i> Back to Products
                        </Link>
                    </div>

                    {(message || error) && (
                        <div className={`admin-alert ${error ? 'error' : 'success'}`}>
                            {error || message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="admin-product-editor">
                        <div className="admin-panel admin-form-panel">
                            <div className="admin-section-title">
                                <span>Product Details</span>
                                <strong>Information</strong>
                            </div>
                            <div className="admin-grid-2">
                                <label>
                                    Product Name
                                    <input type="text" name="pname" value={form.pname} onChange={handleChange} placeholder="Example: Coconut Cookies" />
                                </label>
                                <label>
                                    Price
                                    <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="229" min="0" />
                                </label>
                            </div>
                            <label>
                                Description
                                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Write a short product description..." rows="4" />
                            </label>
                            <div className="admin-grid-2">
                                <label>
                                    Quantity
                                    <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="25" min="0" />
                                </label>
                                <label>
                                    Category
                                    <select name="category" value={form.category} onChange={handleChange}>
                                        <option value="">Choose from already added categories</option>
                                        {categories.map((item) => (
                                            <option key={`${item.Cid}-${item.Cname}`} value={item.Cname}>{item.Cname}</option>
                                        ))}
                                    </select>
                                    {categories.length === 0 && (
                                        <small className="admin-field-note">
                                            No categories found. Add a category first, then come back to add products.
                                        </small>
                                    )}
                                </label>
                            </div>
                            <div className="admin-actions">
                                <button type="submit" className="admin-primary-btn" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Product'}
                                </button>
                                <Link to="/addcategory" className="admin-outline-btn">Manage Categories</Link>
                            </div>
                        </div>

                        <div className="admin-panel admin-image-panel">
                            <div className="admin-section-title">
                                <span>Image</span>
                                <strong>Product Preview</strong>
                            </div>
                            <label htmlFor="product-image-upload" className="admin-upload-card">
                                <img src={image} alt="Product preview" />
                                <span><i className="bi bi-upload"></i> Click to upload image</span>
                            </label>
                            <input id="product-image-upload" type="file" accept="image/*" onChange={handleImage} hidden />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Productadd;
