document.addEventListener("DOMContentLoaded", function () {
    const blogList = document.getElementById("blog-list");
    fetch("data/posts.json")
        .then(response => response.json())
        .then(posts => {

            posts.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
            posts.forEach(function (post, index) {
                const postElement = document.createElement("article");

                const formattedDate = new Date(post.date).toLocaleDateString(
                    "en-CA",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                );

                const latestBadge =
                    index === 0
                        ? "<span class='latest-badge'>Latest Post</span>"
                        : "";

                postElement.innerHTML = `
                    <h2>${post.title} ${latestBadge}</h2>
                    <p class="post-info">
                        ${formattedDate} | ${post.category}
                    </p>
                    <p>${post.summary}</p>
                    <p class="full-content" style="display:none;">
                        ${post.content}
                    </p>
                    <button class="read-more">
                        Read More
                    </button>
                `;
                blogList.appendChild(postElement);
            });

            const buttons = document.querySelectorAll(".read-more");
            buttons.forEach(function (button) {
                button.addEventListener("click", function () {
                    const content =
                        this.previousElementSibling;
                    if (content.style.display === "none") {
                        content.style.display = "block";
                        this.textContent = "Read Less";
                    }
                    else {
                        content.style.display = "none";
                        this.textContent = "Read More";
                    }
                });
            });
        })
        .catch(error =>
            console.error("Error loading posts:", error)
        );
        const filterInput = document.getElementById("filter-input");
        const noResults = document.getElementById("no-results");
        filterInput.addEventListener("input", function () {
            const query = this.value.toLowerCase().trim();
            const articles = document.querySelectorAll(".blog article");
            let visibleCount = 0;
            articles.forEach(function(article){
                const title =
                    article.querySelector("h2")
                    .textContent
                    .toLowerCase();
                const category =
                    article.querySelector(".post-info")
                    .textContent
                    .toLowerCase();
                if (
                    title.includes(query) ||
                    category.includes(query)
                ) {
                    article.style.display = "";
                    visibleCount++;
                }
                else {
                    article.style.display = "none";
                }
            });
            if (visibleCount === 0) {
                noResults.style.display = "block";
            }
            else {
                noResults.style.display = "none";
            }
        });
});