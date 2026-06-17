import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from 'react-router-dom';
import placeholderImage from '../images/products/pic9.jpg';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Productview() {
    const navigate = useNavigate();
    const { key } = useParams();
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(placeholderImage);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        _id: key,
        pname: '',
        price: '',
        desc: '',
        quantity: '',
        category: ''
    });

    const imagebase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    };

    const loadCategories = async () => {
        const response = await fetch(`${API_BASE_URL}/api/admin/categories/list`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
        return Array.isArray(data) ? data : [];
    };

    const loadProduct = async (categoryList) => {
        const response = await fetch(`${API_BASE_URL}/api/admin/products/view`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Key: key }),
        });
        const data = await response.json();

        if (!response.ok || !data.data) {
            throw new Error(data.msg || 'Product not found.');
        }

        const selectedCategory = data.cat?.Cname
            || categoryList.find((item) => item.Cid === data.data.Categoryid)?.Cname
            || '';

        setForm({
            _id: key,
            pname: data.data.Pname || '',
            price: data.data.Price || '',
            desc: data.data.Description || '',
            quantity: data.data.Quantity || '',
            category: selectedCategory
        });
        setImage(data.data.PImage || placeholderImage);
    };

    useEffect(() => {
        const loadPage = async () => {
            setLoading(true);
            setError('');
            try {
                const categoryList = await loadCategories();
                await loadProduct(categoryList);
            } catch (err) {
                setError(err.message || 'Unable to load product.');
            } finally {
                setLoading(false);
            }
        };

        loadPage();
    }, [key]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const nextImage = await imagebase64(file);
        setImage(nextImage);
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
            const response = await fetch(`${API_BASE_URL}/api/admin/products/update`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dataObj: form, Image: image }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || 'Unable to update product.');
                return;
            }

            setMessage(data.msg || 'Product updated successfully.');
        } catch (err) {
            setError('Unable to update product. Please check server port 5000.');
        } finally {
            setSaving(false);
        }
    };

    const deleteProduct = async () => {
        const confirmed = window.confirm('Delete this product?');
        if (!confirmed) return;

        setMessage('');
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/products/delete`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Key: key }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || 'Unable to delete product.');
                return;
            }

            navigate('/product-grid');
        } catch (err) {
            setError('Unable to delete product.');
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
                    <div className="page-title">Edit Product</div>
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
                            <h2>Edit Product</h2>
                            <p>Update product details, category, stock, price, and image safely.</p>
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

                    {loading ? (
                        <div className="admin-empty">Loading product...</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="admin-product-editor">
                            <div className="admin-panel admin-form-panel">
                                <div className="admin-section-title">
                                    <span>Product Details</span>
                                    <strong>Information</strong>
                                </div>
                                <div className="admin-grid-2">
                                    <label>
                                        Product Name
                                        <input type="text" name="pname" value={form.pname} onChange={handleChange} />
                                    </label>
                                    <label>
                                        Price
                                        <input type="number" name="price" value={form.price} onChange={handleChange} min="0" />
                                    </label>
                                </div>
                                <label>
                                    Description
                                    <textarea name="desc" value={form.desc} onChange={handleChange} rows="4" />
                                </label>
                                <div className="admin-grid-2">
                                    <label>
                                        Quantity
                                        <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min="0" />
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
                                                No categories found. Add a category first, then update this product.
                                            </small>
                                        )}
                                    </label>
                                </div>
                                <div className="admin-actions">
                                    <button type="submit" className="admin-primary-btn" disabled={saving}>
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button type="button" className="admin-danger-btn" onClick={deleteProduct}>
                                        <i className="bi bi-trash"></i> Delete
                                    </button>
                                </div>
                            </div>

                            <div className="admin-panel admin-image-panel">
                                <div className="admin-section-title">
                                    <span>Image</span>
                                    <strong>Product Preview</strong>
                                </div>
                                <label htmlFor="product-image-upload" className="admin-upload-card">
                                    <img src={image} alt="Product preview" />
                                    <span><i className="bi bi-upload"></i> Click to change image</span>
                                </label>
                                <input id="product-image-upload" type="file" accept="image/*" onChange={handleImage} hidden />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default Productview;
