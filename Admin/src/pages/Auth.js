

export const storeSessionToken = (token) => {
  localStorage.setItem('sessionToken', token);
};

// Function to retrieve session token
export const getSessionToken = () => {
  return localStorage.getItem('sessionToken');
};
export const destroySessionToken = () => {
 
  localStorage.removeItem('sessionToken');

};