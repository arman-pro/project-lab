import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function Home() {
  let login = useContext(AuthContext);
  return (
    <div className="p-3">
      <h2>Wellcome to Homepage {login.userName}</h2>
    </div>
  );
}
