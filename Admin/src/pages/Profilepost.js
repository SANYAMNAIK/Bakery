import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import { getSessionToken } from "./Auth";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Profilepost() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            setError("");
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/renderer`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: getSessionToken() }),
                });
                const data = await response.json();
                setProfile(data || null);
            } catch (err) {
                setError("Unable to load admin profile. Please check server port 5000.");
            }
        };

        load();
    }, []);

    return (
        <>
            <Navbar img={profile?.Image || ""} />
            <div className="layout-wrapper admin-workspace">
                <div className="header admin-topbar">
                    <div className="menu-toggle-btn">
                        <button type="button" className="admin-soft-icon">
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                    <Link to="/dashboard" className="logo admin-brand">Bakery</Link>
                    <div className="page-title">Profile</div>
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
                            <span>Admin Account</span>
                            <h2>{profile?.Name || profile?.Username || "Admin Profile"}</h2>
                            <p>View the bakery admin identity, contact information and profile details.</p>
                        </div>
                        <Link to="/settings" className="admin-dark-btn">
                            <i className="bi bi-pencil"></i> Edit Profile
                        </Link>
                    </div>

                    {error && <div className="admin-alert error">{error}</div>}

                    {!profile ? (
                        <div className="admin-empty">Loading profile...</div>
                    ) : (
                        <div className="admin-profile-view">
                            <div className="admin-panel admin-profile-card">
                                <img src={profile.Image || ""} alt="Admin avatar" />
                                <h3>{profile.Name || profile.Username}</h3>
                                <p>{profile.Email}</p>
                                <span>Admin</span>
                            </div>

                            <div className="admin-panel admin-profile-details">
                                <div className="admin-section-title">
                                    <span>Details</span>
                                    <strong>Admin Information</strong>
                                </div>
                                <div className="admin-detail-grid">
                                    <div>
                                        <span>Username</span>
                                        <strong>{profile.Username}</strong>
                                    </div>
                                    <div>
                                        <span>Email</span>
                                        <strong>{profile.Email}</strong>
                                    </div>
                                    <div>
                                        <span>Phone</span>
                                        <strong>{profile.Phoneno || "Not added"}</strong>
                                    </div>
                                    <div>
                                        <span>Shop Address</span>
                                        <strong>{profile.Address || "Not added"}</strong>
                                    </div>
                                    <div>
                                        <span>Instagram</span>
                                        <strong>{profile.Instalink || "Not added"}</strong>
                                    </div>
                                    <div>
                                        <span>GitHub</span>
                                        <strong>{profile.Githublink || "Not added"}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profilepost;
