const startButton = document.querySelector("[data-start-button]");

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    startButton?.click();
  }
});
