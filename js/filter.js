document.addEventListener("DOMContentLoaded", function () {
    const filterInput = document.getElementById("filter-input");
    const noResults = document.getElementById("no-results");
    filterInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        const articles = document.querySelectorAll("#blog-list article");
        let visibleCount = 0;
        articles.forEach(function(article) {
            const title = article
                .querySelector("h2")
                .textContent
                .toLowerCase();
            const category = article
                .querySelector(".post-info")
                .textContent
                .toLowerCase();
            if (
                title.includes(query) ||
                category.includes(query)
            ) {
                article.style.display = "block";
                visibleCount++;
            } else {
                article.style.display = "none";
            }
        });
        if (visibleCount === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    });
});