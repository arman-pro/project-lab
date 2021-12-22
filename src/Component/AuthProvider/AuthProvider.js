import React, { useState } from "react";

export const AuthContext = React.createContext(null);

/**
 * Provide User Login Data to Children Component
 * @param {React Node} children
 * @returns {ReactContext}
 */
function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [userName, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  /**
   * logged In Application
   * @param {Boolean} login
   * @param {String} userName
   * @param {String} token
   * @param {function} callback
   * @return {void}
   */
  const appLogin = (login, userName, token, callback) => {
    setLogin(true);
    setUsername(userName);
    setToken(token);
    callback();
  };

  /**
   * Logout from Application
   * @param {Function} callback
   * @return {void}
   */
  const appLogout = (callback) => {
    setLogin(false);
    callback();
  };

  const value = { userName, login, token, appLogin, appLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
