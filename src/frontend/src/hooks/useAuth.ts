import { useCallback, useEffect, useState } from "react";

interface AuthState {
  username: string;
  token: string;
}

const AUTH_KEY = "karwashra_auth";

export function hashPassword(password: string): string {
  return btoa(password);
}

export function getStoredAuth(): AuthState | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState | null>(() => getStoredAuth());

  useEffect(() => {
    const handleStorage = () => {
      setAuth(getStoredAuth());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const storeAuth = useCallback((state: AuthState) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
    setAuth(state);
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAuth(null);
  }, []);

  return {
    auth,
    isLoggedIn: auth !== null,
    username: auth?.username ?? null,
    token: auth?.token ?? null,
    storeAuth,
    logout: clearAuth,
  };
}
