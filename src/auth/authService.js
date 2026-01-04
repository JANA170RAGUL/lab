const ROLE_KEY = "aicte_role";

const authService = {
  setRole(role) {
    localStorage.setItem(ROLE_KEY, role);
  },

  getRole() {
    return localStorage.getItem(ROLE_KEY);
  },

  clearRole() {
    localStorage.removeItem(ROLE_KEY);
  },

  isAdmin() {
    return this.getRole() === "admin";
  },

  isStudent() {
    return this.getRole() === "student";
  },
};

export default authService;
