document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = field.nextElementSibling;
        error.textContent = message;
        error.style.display = "block";
    }
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const error = field.nextElementSibling;
        error.textContent = "";
        error.style.display = "none";
    }
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        if (name === "") {
            showError(
                "name",
                "Please enter your name."
            );
            isValid = false;
        }
        if (email === "") {
            showError(
                "email",
                "Please enter your email."
            );
            isValid = false;
        }
        else if (!validateEmail(email)) {
            showError(
                "email",
                "Please enter a valid email address."
            );
            isValid = false;
        }
        if (message.length < 20) {
            showError(
                "message",
                "Message must be at least 20 characters."
            );
            isValid = false;
        }
        if (isValid) {
            form.style.display = "Success";
            document.getElementById("success-message")
                .textContent =
                "Thank you! Your message has been sent successfully.";
        }
    });
    ["name", "email", "message"].forEach(function(id){
        document
        .getElementById(id)
        .addEventListener("input", function(){
            clearError(id);
        });
    });
});