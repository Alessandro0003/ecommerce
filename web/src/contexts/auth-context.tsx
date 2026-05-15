import { createContext, useContext, useState, type ReactNode } from "react";
import { mockCurrentUser, mockAdminUser } from "@/mocks/users";
import type { User } from "@/modules/user";

type AuthContextValue = {
  user: User | null;
  login: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => setUser(mockCurrentUser),
        loginAsAdmin: () => setUser(mockAdminUser),
        logout: () => setUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve estar dentro de AuthProvider");
  return ctx;
}
