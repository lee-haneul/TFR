document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Load saved preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode"); // fixed capitalization
  }

  // Add click listener
  if (toggle) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      // Save preference
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }
});
