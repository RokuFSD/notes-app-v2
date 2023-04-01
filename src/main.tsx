import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";


// TODO: Make this the react way
const updateSW = registerSW({
  onNeedRefresh() {
    const snack = document.createElement('div')
    snack.innerHTML = 'A new version of the app is available. <button>Update</button>'
    snack.addEventListener('click', () => {
      window.location.reload()
    })
    document.body.appendChild(snack)
  },
  onOfflineReady() {
    const prompt = document.createElement("div");
    prompt.innerHTML = "Ready to work offline. Click OK to continue.";
    prompt.style.position = "fixed";
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

    document.body.appendChild(prompt);

    function hidePrompt() {
      document.body.removeChild(prompt);
    }
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
