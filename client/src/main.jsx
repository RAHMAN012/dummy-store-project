import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);