import React from "react";
import ReactDOM from "react-dom/client";
import RotasApp from "./routes/RotasApp";

import "./assets/css/base.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RotasApp />
  </React.StrictMode>
);
