import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Productgrid() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const formatCurrency = (amount) => {
        const value = Number(amount) || 0;
        return `Rs. ${value.toLocaleString('en-IN')}`;
    };

    const categoryName = (cid) => {
        const match = categories.find((item) => item.Cid === cid);
        return match ? match.Cname : 'Uncategorized';
    };

    const stockInfo = (quantity) => {
        const qty = Number(quantity) || 0;
        if (qty <= 0) return { className: 'out', label: 'Out of stock' };
        if (qty <= 10) return { className: 'low', label: `Low stock: ${qty}` };
        return { className: 'ok', label: `In stock: ${qty}` };
    };

    const loadCategories = async () => {
        const response = await fetch(`${API_BASE_URL}/api/admin/categories/list`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
    };

    const loadProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/products/list`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Unable to load products. Please check server port 5000.');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setKeyword(value);
        setSelectedCategory('all');
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/products/search`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword: value })
            });
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Search failed. Please check server port 5000.');
        } finally {
            setLoading(false);
        }
    };

    const handleCategory = async (cid) => {
        setSelectedCategory(cid);
        setKeyword('');

        if (cid === 'all') {
            loadProducts();
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/products/filter`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cid })
            });
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Unable to filter products.');
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        total: products.length,
        lowStock: products.filter((item) => Number(item.Quantity) <= 10).length,
        value: products.reduce((sum, item) => sum + ((Number(item.Price) || 0) * (Number(item.Quantity) || 0)), 0)
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
                    <div className="page-title">Products</div>
                    <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <button className="btn btn-outline-light" type="button">
                                <i className="bi bi-search"></i>
                            </button>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={keyword}
                                onChange={handleSearch}
                            />
                        </div>
                    </form>
                    <div className="header-bar ms-auto">
                        <Link to="/productadd" className="admin-primary-btn compact">
                            <i className="bi bi-plus-circle"></i> Add Product
                        </Link>
                    </div>
                </div>

                <div className="content admin-content">
                    <div className="admin-hero">
                        <div>
                            <span>Catalog</span>
                            <h2>Product Management</h2>
                            <p>Search, filter, add, edit, and review stock from your live database.</p>
                        </div>
                        <Link to="/addcategory" className="admin-dark-btn">
                            <i className="bi bi-tags"></i> Manage Categories
                        </Link>
                    </div>

                    <div className="admin-stats">
                        <div><span>Total Products</span><strong>{stats.total}</strong></div>
                        <div><span>Low Stock</span><strong>{stats.lowStock}</strong></div>
                        <div><span>Inventory Value</span><strong>{formatCurrency(stats.value)}</strong></div>
                    </div>

                    <div className="admin-product-layout">
                        <aside className="admin-panel admin-filter-panel">
                            <div className="admin-section-title">
                                <span>Filter</span>
                                <strong>Categories</strong>
                            </div>
                            <div className="admin-filter-list">
                                <button
                                    type="button"
                                    className={selectedCategory === 'all' ? 'active' : ''}
                                    onClick={() => handleCategory('all')}
                                >
                                    All Products
                                </button>
                                {categories.map((item) => (
                                    <button
                                        type="button"
                                        key={`${item.Cid}-${item.Cname}`}
                                        className={selectedCategory === item.Cid ? 'active' : ''}
                                        onClick={() => handleCategory(item.Cid)}
                                    >
                                        {item.Cname}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        <main>
                            {error && <div className="admin-alert error">{error}</div>}
                            {!error && loading && <div className="admin-empty">Loading products...</div>}
                            {!error && !loading && products.length === 0 && <div className="admin-empty">No products found.</div>}
                            {!error && !loading && products.length > 0 && (
                                <div className="admin-product-grid">
                                    {products.map((item) => {
                                        const stock = stockInfo(item.Quantity);
                                        return (
                                            <article className="admin-product-card" key={item._id}>
                                                <div className="admin-product-media">
                                                    <img src={item.PImage} alt={item.Pname} />
                                                    <span className={`admin-stock ${stock.className}`}>{stock.label}</span>
                                                </div>
                                                <div className="admin-product-info">
                                                    <span>{categoryName(item.Categoryid)}</span>
                                                    <h3>{item.Pname}</h3>
                                                    <p>{item.Description || 'No description added.'}</p>
                                                    <div>
                                                        <strong>{formatCurrency(item.Price)}</strong>
                                                        <Link to={`/productview/${item._id}`} className="admin-outline-btn compact">Edit</Link>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Productgrid;
