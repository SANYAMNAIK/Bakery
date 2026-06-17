const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const originalFetch = window.fetch.bind(window);

window.fetch = (input, options = {}) => {
  const url = typeof input === 'string' ? input : input.url;
  const shouldAttachToken =
    url.startsWith(`${API_BASE_URL}/api/user`) || url.startsWith('/api/user');

  if (!shouldAttachToken) {
    return originalFetch(input, options);
  }

  const token = localStorage.getItem('token');
  const headers = new Headers(options.headers || {});

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return originalFetch(input, {
    ...options,
    headers,
  });
};
