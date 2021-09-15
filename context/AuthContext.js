const { createContext, useState } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // register
  const register = async (user) => {
    console.log(user);
  };

  // login
  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password });
  };

  // logout
  const logout = async () => {
    console.log("logout");
  };

  // check if user is logged in
  const checkUserLogin = async (user) => {
    console.log(user);
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
