// src/api.js
// API Client untuk komunikasi dengan PHP backend

const API_BASE_URL = "http://localhost:8000"; // PHP API URL

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

/**
 * Register user baru
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} fullName - User full name
 * @returns {Promise<{success: boolean, message: string, data?: object}>}
 */
export async function registerUser(email, password, fullName) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, fullName }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{success: boolean, message: string, data?: object}>}
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Promise<{success: boolean, message: string, data?: object}>}
 */
export async function verifyToken(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verify-token.php`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

/**
 * Save user session to localStorage
 */
export function saveUserSession(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem(
    "user",
    JSON.stringify({
      userId: data.userId,
      email: data.email,
      fullName: data.fullName,
    })
  );
}

/**
 * Get user session from localStorage
 */
export function getUserSession() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      return {
        token,
        user: JSON.parse(user),
      };
    } catch (e) {
      return null;
    }
  }

  return null;
}

/**
 * Clear user session
 */
export function clearUserSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

/**
 * Check if user is logged in
 */
export function isUserLoggedIn() {
  const session = getUserSession();
  return session !== null;
}

// ============================================
// REQUEST HELPERS WITH AUTH
// ============================================

/**
 * Make authenticated API call
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method
 * @param {object} data - Request body data
 * @returns {Promise<Response>}
 */
export async function makeAuthenticatedRequest(
  url,
  method = "GET",
  data = null
) {
  const session = getUserSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
  };

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    // If unauthorized, clear session and redirect to login
    if (response.status === 401) {
      clearUserSession();
      window.location.href = "/auth";
      throw new Error("Session expired");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Validate email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password (min 6 chars)
 */
export function validatePassword(password) {
  return password && password.length >= 6;
}

/**
 * Validate full name (min 3 chars)
 */
export function validateFullName(fullName) {
  return fullName && fullName.trim().length >= 3;
}

/**
 * Validate form inputs
 */
export function validateAuthForm(
  email,
  password,
  fullName = null,
  isRegister = false
) {
  const errors = {};

  if (!validateEmail(email)) {
    errors.email = "Email tidak valid";
  }

  if (!validatePassword(password)) {
    errors.password = "Password minimal 6 karakter";
  }

  if (isRegister && !validateFullName(fullName)) {
    errors.fullName = "Nama minimal 3 karakter";
  }

  return errors;
}
