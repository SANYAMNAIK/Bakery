import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Addcategory() {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({ cname: '', cid: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const loadCategories = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/categories/list`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setCategories(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Unable to load categories. Please check server port 5000.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const payload = {
            cname: form.cname.trim(),
            cid: form.cid.trim()
        };

        if (!payload.cname || !payload.cid) {
            setError('Please enter both category name and category id.');
            return;
        }

        setSaving(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/categories/add`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || 'Unable to add category.');
                return;
            }

            setMessage(data.msg || 'Category added successfully.');
            setForm({ cname: '', cid: '' });
            loadCategories();
        } catch (err) {
            setError('Unable to add category. Please check server port 5000.');
        } finally {
            setSaving(false);
        }
    };

    const deleteCategory = async (cid) => {
        const confirmed = window.confirm('Delete this category?\nProducts under this category will also be deleted.');
        if (!confirmed) return;

        setMessage('');
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/categories/delete`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cid }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || 'Unable to delete category.');
                return;
            }

            setMessage(data.msg || 'Category deleted successfully.');
            loadCategories();
        } catch (err) {
            setError('Unable to delete category.');
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
                    <div className="page-title">Categories</div>
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
                            <span>Inventory Setup</span>
                            <h2>Manage Product Categories</h2>
                            <p>Create clean categories that products can use while adding or editing.</p>
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

                    <div className="admin-two-column">
                        <form className="admin-panel admin-form-panel" onSubmit={handleSubmit}>
                            <div className="admin-section-title">
                                <span>New Category</span>
                                <strong>Add category</strong>
                            </div>
                            <div className="admin-grid-2">
                                <label>
                                    Category Name
                                    <input
                                        type="text"
                                        name="cname"
                                        value={form.cname}
                                        onChange={handleChange}
                                        placeholder="Example: Cookies"
                                    />
                                </label>
                                <label>
                                    Category Id
                                    <input
                                        type="text"
                                        name="cid"
                                        value={form.cid}
                                        onChange={handleChange}
                                        placeholder="Example: CAT010"
                                    />
                                </label>
                            </div>
                            <button type="submit" className="admin-primary-btn" disabled={saving}>
                                {saving ? 'Adding...' : 'Add Category'}
                            </button>
                        </form>

                        <div className="admin-panel">
                            <div className="admin-section-title">
                                <span>{categories.length} Active</span>
                                <strong>Categories</strong>
                            </div>
                            {loading && <div className="admin-empty">Loading categories...</div>}
                            {!loading && categories.length === 0 && <div className="admin-empty">No categories found.</div>}
                            {!loading && categories.length > 0 && (
                                <div className="admin-category-stack">
                                    {categories.map((item) => (
                                        <div className="admin-category-item" key={`${item.Cid}-${item.Cname}`}>
                                            <div>
                                                <strong>{item.Cname}</strong>
                                                <span>ID: {item.Cid}</span>
                                            </div>
                                            <button type="button" onClick={() => deleteCategory(item.Cid)}>
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Addcategory;
