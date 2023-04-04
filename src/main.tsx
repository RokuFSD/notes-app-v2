import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/client/apollo";


// TODO: Make this the react way
const updateSW = registerSW({
  onNeedRefresh() {
    console.log("Need refresh");
    const snack = document.createElement("div");
    snack.innerHTML = "A new version of the app is available. <button>Update</button>";
    snack.style.position = "absolute";
    snack.style.bottom = "20px";
    snack.style.left = "20px";
    snack.style.padding = "10px";
    snack.style.backgroundColor = "#fff";
    snack.style.border = "1px solid #ccc";
    snack.style.borderRadius = "4px";
    snack.style.zIndex = "9999";
    snack.addEventListener("click", () => {
      window.location.reload();
    });
    const root = document.getElementById("root") as HTMLElement;
    root.appendChild(snack);
  },
  onOfflineReady() {
    const prompt = document.createElement("div");
    prompt.innerHTML = "Ready to work offline. Click OK to continue.";
    prompt.style.position = "absolute";
    prompt.style.bottom = "20px";
    prompt.style.left = "20px";
    prompt.style.padding = "10px";
    prompt.style.backgroundColor = "#fff";
    prompt.style.border = "1px solid #ccc";
    prompt.style.borderRadius = "4px";
    prompt.style.zIndex = "9999";

    const okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.style.marginLeft = "10px";
    okButton.addEventListener("click", () => {
      hidePrompt();
    });
    prompt.appendChild(okButton);


    const root = document.getElementById("root") as HTMLElement;
    root.appendChild(prompt);

    function hidePrompt() {
      document.body.removeChild(prompt);
    }
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
;
