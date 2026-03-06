const toggle = document.getElementById("darkModeToggle");
const body = document.body;


if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-Mode");
}

toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save preference
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});