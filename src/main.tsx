import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./store";
import "./i18n";
import upTok from "./updateTokenFunc";
import { changeToken } from "./slices/UserSlice";

async function start() {
  const { token } = await upTok();
  if (token) Store.dispatch(changeToken(token));
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={Store}>
        <App />
      </Provider>
    </StrictMode>,
  );
}

start();
