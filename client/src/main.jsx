import React from "react";

import App from "./App.jsx";

import ReactDOM from "react-dom/client";
import { UserProvider } from "./UserContext/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <UserProvider>
      <App />
    </UserProvider>
  </>
);
