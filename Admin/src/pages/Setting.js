import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { getSessionToken, storeSessionToken } from "./Auth";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const emptyProfile = {
    Username: "",
    Name: "",
    Fullname: "",
    Email: "",
    Phoneno: "",
    Address: "",
    Image: "",
    Instalink: "",
    Githublink: ""
};

function Settings() {
    const fileInputRef = useRef(null);
    const [profile, setProfile] = useState(emptyProfile);
    const [imagePreview, setImagePreview] = useState("");
    const [passwords, setPasswords] = useState({ old: "", new: "", newrp: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const currentUsername = getSessionToken();

    const showSuccess = (text) => {
        setError("");
        setMessage(text);
    };

    const showError = (text) => {
        setMessage("");
        setError(text);
    };

    const loadProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/renderer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: getSessionToken() }),
            });
            const data = await response.json();
            const nextProfile = { ...emptyProfile, ...(data || {}) };
            nextProfile.Name = nextProfile.Name || nextProfile.Fullname || "";
            setProfile(nextProfile);
            setImagePreview(nextProfile.Image || "");
        } catch (err) {
            showError("Unable to load admin profile. Please check server port 5000.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    const imagebase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((current) => ({ ...current, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((current) => ({ ...current, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const image = await imagebase64(file);
        setImagePreview(image);
    };

    const updateProfileFromResponse = (data) => {
        if (data?.data) {
            const nextProfile = { ...emptyProfile, ...data.data };
            nextProfile.Name = nextProfile.Name || nextProfile.Fullname || "";
            setProfile(nextProfile);
            setImagePreview(nextProfile.Image || "");
        }
    };

    const saveImage = async (e) => {
        e.preventDefault();
        if (!imagePreview) {
            showError("Please choose an image before saving avatar.");
            return;
        }

        setSaving("image");
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/profile/dp-change`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminid: currentUsername, image: imagePreview }),
            });
            const data = await response.json();
            if (!response.ok) {
                showError(data.msg || "Unable to save avatar.");
                return;
            }
            updateProfileFromResponse(data);
            showSuccess(data.msg || "Avatar saved successfully.");
        } catch (err) {
            showError("Unable to save avatar.");
        } finally {
            setSaving("");
        }
    };

    const saveBasicInfo = async (e) => {
        e.preventDefault();
        if (!profile.Username.trim() || !profile.Name.trim() || !profile.Email.trim()) {
            showError("Username, name and email are required.");
            return;
        }

        setSaving("basic");
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/profile/data-change`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    adminid: currentUsername,
                    username: profile.Username.trim(),
                    name: profile.Name.trim(),
                    email: profile.Email.trim(),
                    phone: profile.Phoneno,
                    address: profile.Address
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                showError(data.msg || "Unable to save profile.");
                return;
            }

            storeSessionToken(profile.Username.trim());
            updateProfileFromResponse(data);
            showSuccess(data.msg || "Profile saved successfully.");
        } catch (err) {
            showError("Unable to save profile.");
        } finally {
            setSaving("");
        }
    };

    const saveSocial = async (e) => {
        e.preventDefault();
        setSaving("social");
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/profile/social-change`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    adminid: currentUsername,
                    insta: profile.Instalink,
                    git: profile.Githublink
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                showError(data.msg || "Unable to save social links.");
                return;
            }
            updateProfileFromResponse(data);
            showSuccess(data.msg || "Social links saved successfully.");
        } catch (err) {
            showError("Unable to save social links.");
        } finally {
            setSaving("");
        }
    };

    const savePassword = async (e) => {
        e.preventDefault();
        if (!passwords.old || !passwords.new || !passwords.newrp) {
            showError("Please fill all password fields.");
            return;
        }

        if (passwords.new !== passwords.newrp) {
            showError("New password and repeat password do not match.");
            return;
        }

        setSaving("password");
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/profile/pass-reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Key: currentUsername,
                    old: passwords.old,
                    newrp: passwords.newrp
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                showError(data.msg || "Unable to change password.");
                return;
            }
            setPasswords({ old: "", new: "", newrp: "" });
            showSuccess(data.msg || "Password changed successfully.");
        } catch (err) {
            showError("Unable to change password.");
        } finally {
            setSaving("");
        }
    };

    return (
        <>
            <Navbar img={profile.Image} />
            <div className="layout-wrapper admin-workspace">
                <div className="header admin-topbar">
                    <div className="menu-toggle-btn">
                        <button type="button" className="admin-soft-icon">
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                    <Link to="/dashboard" className="logo admin-brand">Bakery</Link>
                    <div className="page-title">Admin Profile</div>
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
                            <span>Account Settings</span>
                            <h2>Admin Profile</h2>
                            <p>Update bakery account details, avatar, social links and password from one place.</p>
                        </div>
                        <Link to="/Profilepost" className="admin-dark-btn">
                            <i className="bi bi-eye"></i> View Profile
                        </Link>
                    </div>

                    {(message || error) && (
                        <div className={`admin-alert ${error ? "error" : "success"}`}>
                            {error || message}
                        </div>
                    )}

                    {loading ? (
                        <div className="admin-empty">Loading admin profile...</div>
                    ) : (
                        <div className="admin-profile-layout">
                            <aside className="admin-panel admin-profile-card">
                                <img src={imagePreview || profile.Image} alt="Admin avatar" />
                                <h3>{profile.Name || profile.Username}</h3>
                                <p>{profile.Email}</p>
                                <form onSubmit={saveImage}>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept=".jpg,.png,.jpeg"
                                        onChange={handleFileChange}
                                        hidden
                                    />
                                    <button type="button" className="admin-outline-btn" onClick={() => fileInputRef.current.click()}>
                                        Change Avatar
                                    </button>
                                    <button type="submit" className="admin-primary-btn" disabled={saving === "image"}>
                                        {saving === "image" ? "Saving..." : "Save Avatar"}
                                    </button>
                                </form>
                            </aside>

                            <main className="admin-profile-main">
                                <form className="admin-panel admin-form-panel" onSubmit={saveBasicInfo}>
                                    <div className="admin-section-title">
                                        <span>Basic</span>
                                        <strong>Profile Information</strong>
                                    </div>
                                    <div className="admin-grid-2">
                                        <label>
                                            Name
                                            <input type="text" name="Name" value={profile.Name} onChange={handleProfileChange} />
                                        </label>
                                        <label>
                                            Username
                                            <input type="text" name="Username" value={profile.Username} onChange={handleProfileChange} />
                                        </label>
                                        <label>
                                            Email
                                            <input type="email" name="Email" value={profile.Email} onChange={handleProfileChange} />
                                        </label>
                                        <label>
                                            Phone
                                            <input type="number" name="Phoneno" value={profile.Phoneno} onChange={handleProfileChange} />
                                        </label>
                                    </div>
                                    <label>
                                        Shop Address
                                        <textarea name="Address" rows="3" value={profile.Address} onChange={handleProfileChange} />
                                    </label>
                                    <button type="submit" className="admin-primary-btn" disabled={saving === "basic"}>
                                        {saving === "basic" ? "Saving..." : "Save Changes"}
                                    </button>
                                </form>

                                <form className="admin-panel admin-form-panel" onSubmit={saveSocial}>
                                    <div className="admin-section-title">
                                        <span>Social</span>
                                        <strong>Social Links</strong>
                                    </div>
                                    <div className="admin-grid-2">
                                        <label>
                                            Instagram
                                            <input type="text" name="Instalink" value={profile.Instalink} onChange={handleProfileChange} />
                                        </label>
                                        <label>
                                            GitHub
                                            <input type="text" name="Githublink" value={profile.Githublink} onChange={handleProfileChange} />
                                        </label>
                                    </div>
                                    <button type="submit" className="admin-primary-btn" disabled={saving === "social"}>
                                        {saving === "social" ? "Saving..." : "Save Social Links"}
                                    </button>
                                </form>

                                <form className="admin-panel admin-form-panel" onSubmit={savePassword}>
                                    <div className="admin-section-title">
                                        <span>Security</span>
                                        <strong>Change Password</strong>
                                    </div>
                                    <div className="admin-grid-2">
                                        <label>
                                            Old Password
                                            <input type="password" name="old" value={passwords.old} onChange={handlePasswordChange} />
                                        </label>
                                        <label>
                                            New Password
                                            <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} />
                                        </label>
                                    </div>
                                    <label>
                                        Repeat New Password
                                        <input type="password" name="newrp" value={passwords.newrp} onChange={handlePasswordChange} />
                                    </label>
                                    <button type="submit" className="admin-primary-btn" disabled={saving === "password"}>
                                        {saving === "password" ? "Saving..." : "Change Password"}
                                    </button>
                                </form>
                            </main>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Settings;
