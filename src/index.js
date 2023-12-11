import React, { createContext } from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import UserStore from "./store/UserStore";
import FoodStore from "./store/FoodStore";
import BasketStore from "./store/BasketStore";
import "./styles/reset.css";
import "./styles/common.css";

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      users: new UserStore(),
      food: new FoodStore(),
      basket: new BasketStore(),
    }}
  >
    <App />
  </Context.Provider>
);
