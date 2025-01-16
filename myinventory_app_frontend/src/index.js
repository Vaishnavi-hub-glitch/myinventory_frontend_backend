import ReactDOM from "react-dom/client";
import React from "react"; // Import React
import { Provider } from "react-redux"; // Corrected import statement
import App from "./App"; // Import the main App component

import reportWebVitals from "./reportWebVitals"; // Import reportWebVitals
import "./index.css"; // Import global styles
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root for React

root.render(

    <React.StrictMode>
      <Provider store={store}>
        
      <App /> 
      </Provider>
    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
