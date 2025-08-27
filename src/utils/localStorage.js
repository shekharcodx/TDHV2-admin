export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setRole = (role) => {
  localStorage.setItem("role", role);
};

export const getRole = () => {
  localStorage.getItem("role");
};

export const removeRole = () => {
  localStorage.removeItem("role");
};

export const clearToken = () => localStorage.removeItem("token");
export const clearRole = () => localStorage.removeItem("role");
