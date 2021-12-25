import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [Message, setMessage] = useState(null);

  function getMessage() {
    axios
      .get("/doctors")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e.message));
  }

  return (
    <div className="p-3">
      <h2>Wellcome to Homepage</h2>
      <button className="btn btn-sm btn-primary" onClick={getMessage}>
        Show
      </button>
    </div>
  );
}
