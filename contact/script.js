
        // Theme toggler logic
        const themeIcon = document.getElementById('theme-icon');
        themeIcon.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                document.body.style.backgroundColor = "#fff";
                document.body.style.color = "#000";
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.body.style.backgroundColor = "#111";
                document.body.style.color = "#fff";
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });

        // Fetch blogs from Dev.to API
        async function fetchBlogs() {
            const response = await fetch('https://dev.to/api/articles?username=theonlyaswin');
            const blogs = await response.json();
            const blogList = document.getElementById('blog-list');

            blogs.slice(0, 3).forEach(blog => {
                const blogPost = `
                    <p><span style="color:gray;" >${new Date(blog.published_at).toDateString()}</span> <a href="${blog.url}" target="_blank" class="blog-title">${blog.title}</a></p>
                `;
                blogList.innerHTML += blogPost;
            });
        }

        fetchBlogs();



