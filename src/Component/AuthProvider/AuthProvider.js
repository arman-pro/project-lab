import React, { useState } from "react";

export const AuthContext = React.createContext(null);

/**
 * Provide User Login Data to Children Component
 * @param {React Node} children
 * @returns {ReactContext}
 */
function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [userName, setUsername] = useState("Arman");
  /**
   * logged In Applicationo
   * @param {Boolean} login
   * @param {String} userName
   * @param {function} callback
   * @return {void}
   */
  const appLogin = (login, userName, callback) => {
    setLogin(true);
    setUsername(userName);
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

  const value = { userName, login, appLogin, appLogout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
