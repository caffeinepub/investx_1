import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("investx_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const accounts = JSON.parse(
      localStorage.getItem("investx_accounts") || "[]",
    ) as { name: string; email: string; password: string }[];
    const account = accounts.find(
      (a) => a.email === email && a.password === password,
    );
    if (account) {
      const u: AuthUser = { name: account.name, email: account.email };
      localStorage.setItem("investx_user", JSON.stringify(u));
      setUser(u);
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(
    (name: string, email: string, password: string): boolean => {
      const accounts = JSON.parse(
        localStorage.getItem("investx_accounts") || "[]",
      ) as { name: string; email: string; password: string }[];
      if (accounts.find((a) => a.email === email)) return false;
      accounts.push({ name, email, password });
      localStorage.setItem("investx_accounts", JSON.stringify(accounts));
      const u: AuthUser = { name, email };
      localStorage.setItem("investx_user", JSON.stringify(u));
      setUser(u);
      return true;
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("investx_user");
    setUser(null);
  }, []);

  return { user, loading, login, signup, logout, isLoggedIn: !!user };
}
