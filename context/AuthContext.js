import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "../config";

const { createContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => checkUserLogin(), []);

  const router = useRouter();

  // register
  const register = async (user) => {
    const { username, email, password } = user;
    try {
      const res = await fetch(`${NEXT_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await res.json();

      console.log("data", data);
      if (res.ok) {
        setUser(data.user);
        router.push("/account/dashboard");
      } else {
        setError(data.message);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setError(null);
    }
  };

  // login
  const login = async ({ email: identifier, password }) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });
      const data = await res.json();

      console.log("data", data);
      if (res.ok) {
        setUser(data.user);
        router.push("/account/dashboard");
      } else {
        setError(data.message);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
      setError(null);
    }
  };

  // logout
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  // check if user is logged in
  const checkUserLogin = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        login,
        logout,
        register,
        checkUserLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
