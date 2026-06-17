/**
 * Authenticated fetch wrapper for Admin panel.
 * Automatically attaches the JWT token from localStorage to all requests.
 * If a 401/403 response is received, redirects to the login page.
 */

export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    // If token is expired or invalid, redirect to login
    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('sessionToken');
        window.location.href = '/admin-login';
        throw new Error('Session expired. Please log in again.');
    }

    return response;
};
