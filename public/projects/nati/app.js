// Legacy compatibility file for the static Nati interface prototype.
// No request is sent and no assistant or support service is connected.
(function hardenStaticPrototype() {
  const status = document.getElementById("status");
  const composer = document.getElementById("composer");
  const prompt = document.getElementById("prompt");
  const sendButton = document.getElementById("sendBtn");

  if (status) status.textContent = "Static simulation";

  if (prompt) {
    prompt.value = "";
    prompt.disabled = true;
    prompt.placeholder = "Messaging disabled in this static prototype";
  }

  if (sendButton) {
    sendButton.disabled = true;
    sendButton.setAttribute("aria-disabled", "true");
  }

  composer?.addEventListener("submit", (event) => event.preventDefault());
})();
