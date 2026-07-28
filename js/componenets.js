function loadComponent(selector, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load " + filePath);
            }
            return response.text();
        })
        .then(html => {
            document.querySelector(selector).innerHTML = html;
            if (selector === "#header-placeholder") {
                const toggleBtn = document.getElementById("theme-toggle");

                if (toggleBtn) {
                    const currentTheme = localStorage.getItem("theme") || "light";

                    document.body.setAttribute("data-theme", currentTheme);

                    toggleBtn.textContent =
                        currentTheme === "dark"
                            ? "Switch to Light Mode"
                            : "Switch to Dark Mode";

                    toggleBtn.addEventListener("click", function () {
                        const theme = document.body.getAttribute("data-theme");
                        const newTheme = theme === "dark" ? "light" : "dark";
                        document.body.setAttribute(
                            "data-theme", newTheme);
                        localStorage.setItem(
                            "theme", newTheme);
                        toggleBtn.textContent =
                            newTheme === "dark"
                                ? "Switch to Light Mode"
                                : "Switch to Dark Mode";
                    });
                }
            }
        })
        .catch(error => console.error(error));
}
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("#header-placeholder", "components/header.html");
    loadComponent("#footer-placeholder","components/footer.html");
});