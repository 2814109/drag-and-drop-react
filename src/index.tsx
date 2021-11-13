import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import DragComponents from "./DragAndDropComponent";
ReactDOM.render(
  <React.StrictMode>
    <DragComponents />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
