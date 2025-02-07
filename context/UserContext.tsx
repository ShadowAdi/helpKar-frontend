import { GetItemFromLocalStorage } from "@/utils/StorageToken";
import { createContext, ReactNode, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router, useRouter } from "expo-router";

interface AuthContextType {
  user: any | null;
  role: string | null;
  token: string | null;
  login: (userData: any, role: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();



  // Load user data from SecureStore
  useEffect(() => {
    const loadUserData = async () => {
      const token = await GetItemFromLocalStorage("token");
      const role = await GetItemFromLocalStorage("role");

      if (token && role) {
        setToken(token);
        setRole(role);
        const response = await fetch(
          `http://192.168.29.209:3000/api/${
            role === "user" ? "users/loggedInUser" : "ngos/loggedInNgo"
          }`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        const data = result;
        if (role==="user" && data.success) {
          setUser(data.user);
        } else if (role==="ngo"&& data.success) {
          setUser(data.ngo);
        }
      }
    };
    loadUserData();
  }, []);

  // Login function
  const login = async (userData: any, role: string, token: string) => {
    setUser(userData);
    setRole(role);
    setToken(token);
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("role", role);
    router.push("./");
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    setToken(null);
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("role");
  };


  return (
    <AuthContext.Provider value={{ user, role, token, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
