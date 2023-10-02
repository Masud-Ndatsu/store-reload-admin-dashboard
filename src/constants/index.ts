const { VITE_API_URL } = import.meta.env;

export const USER_URL = `${VITE_API_URL}/api/v1/admin/users`;
export const AUTH_URL = `${VITE_API_URL}/api/v1/admin/auth`;
export const PRODUCT_URL = `${VITE_API_URL}/api/v1/admin/products`;
export const CATEGORY_URL = `${VITE_API_URL}/api/v1/admin/categories`;
