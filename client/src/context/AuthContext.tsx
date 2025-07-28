import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  name?: string;
  email: string;
  picture?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({ email: decoded.email, name: decoded.name, token });
      } catch (error) {
        console.error("Invalid token. Logging out.");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, otp: string) => {
    if (otp !== "123456") throw new Error("Invalid OTP");

    const fakePayload = { email, name: "Test User" };
    const fakeToken = btoa(JSON.stringify(fakePayload)); // base64 token
    localStorage.setItem("token", fakeToken);
    setUser({ ...fakePayload, token: fakeToken });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
