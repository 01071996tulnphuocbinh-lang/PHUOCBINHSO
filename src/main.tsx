import React from "react";
import { createRoot } from "react-dom/client";

import appConfig from "../app-config.json";
import "./css/app.scss";
import "./css/tailwind.css";
import App from "./components/app";
import "zmp-ui/zaui.css";

if (!window.APP_CONFIG) {
    window.APP_CONFIG = appConfig;
}

window.isBack = false;

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(React.createElement(App));
