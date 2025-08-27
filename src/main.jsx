import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import global styles once
import "./Styles/variables.css";

// ✅ Import Chakra
// import ReactDOM from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "./components/ui/toaster";

// ✅ Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./index.css";
import App from "./App.jsx";

// ✅ Redux
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

createRoot(document.getElementById("root")).render(
  <ChakraProvider value={defaultSystem}>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </ChakraProvider>
);
