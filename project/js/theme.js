document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("theme-toggle");
    function applyTheme(theme) {
        document.body.setAttribute("data-theme", theme);
        toggleBtn.textContent =
            theme === "dark"
            ? "Switch to Light Mode"
            : "Switch to Dark Mode";

        localStorage.setItem("theme", theme);
    }
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            applyTheme(savedTheme);
        }
        else {
            applyTheme("light");
        }
    }
    toggleBtn.addEventListener("click", function () {
        const currentTheme = document.body.getAttribute("data-theme");
        const newTheme =
            currentTheme === "dark"
            ? "light"
            : "dark";
        applyTheme(newTheme);
    });
    loadSavedTheme();
});