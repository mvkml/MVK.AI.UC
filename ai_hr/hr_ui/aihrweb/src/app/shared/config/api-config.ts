// Central place for backend API base URLs. Update here when the API's port/host changes —
// every service should import from this file instead of hardcoding a URL.

export const API_ROOT = 'http://localhost:5008';

export const API_ENDPOINTS = {
  users: `${API_ROOT}/api/users`,
};
