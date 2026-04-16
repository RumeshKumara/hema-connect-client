export const APP_NAME = "HemaFlow";
export const AUTH_ROUTES = ["/login", "/register"] as const;
export const DASHBOARD_ROUTES = ["/admin", "/donor", "/organization"] as const;

export const PREDEFINED_ADMIN_EMAIL = "adminblood@gmail.com";
export const PREDEFINED_ADMIN_PASSWORD = "admin1234@";

export const isPredefinedAdminCredentials = (email: string, password: string) =>
	email.trim().toLowerCase() === PREDEFINED_ADMIN_EMAIL &&
	password === PREDEFINED_ADMIN_PASSWORD;

export const isPredefinedAdminEmail = (email: string) =>
	email.trim().toLowerCase() === PREDEFINED_ADMIN_EMAIL;
