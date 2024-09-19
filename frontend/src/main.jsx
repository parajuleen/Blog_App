import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store ,persistor} from "../src/store/store.js";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/lib/integration/react";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <App/>
      </PersistGate>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
