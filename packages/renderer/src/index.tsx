import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./app/main";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
