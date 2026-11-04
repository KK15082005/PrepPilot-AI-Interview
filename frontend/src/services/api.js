import axios from "axios";

/**
 * Resolves and normalizes the backend API base URL:
 * - Uses Vite convention `import.meta.env.VITE_API_URL`
 * - Also supports `import.meta.env.VITE_API_BASE_URL` for backwards compatibility
 * - Normalizes trailing slashes (e.g., "https://backend.vercel.app/" -> "https://backend.vercel.app")
 * - Ensures the `/api` route prefix is present without duplication
 * - In production, NEVER falls back to localhost:3000
 * - In local development, falls back to "http://localhost:3000/api"
 */
function resolveApiBaseUrl() {
    const rawEnvUrl = (
        import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        ""
    ).trim().replace(/^["']|["']$/g, "");

    if (rawEnvUrl) {
        // Strip trailing slashes
        const sanitized = rawEnvUrl.replace(/\/+$/, "");
        // Avoid duplicate /api
        return sanitized.endsWith("/api") ? sanitized : `${sanitized}/api`;
    }

    // In production, strictly avoid any localhost fallback
    if (import.meta.env.PROD) {
        console.warn(
            "[PrepPilot API] Neither VITE_API_URL nor VITE_API_BASE_URL is set in environment. Falling back to same-origin '/api'."
        );
        return "/api";
    }

    // Default for local development
    return "http://localhost:3000/api";
}

export const API_BASE_URL = resolveApiBaseUrl();

const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to automatically attach JWT token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle unauthenticated responses
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const currentPath = window.location.pathname;
            // Only redirect if accessing an authenticated route
            if (
                currentPath !== "/login" &&
                currentPath !== "/signup" &&
                currentPath !== "/"
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default API;
