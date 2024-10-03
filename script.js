// Function to apply the saved theme
function applyTheme(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (theme === 'light') {
        document.body.classList.add('light-mode');
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#000";
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.body.classList.remove('light-mode');
        document.body.style.backgroundColor = "#111";
        document.body.style.color = "#fff";
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// On page load, check localStorage for theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark mode if not set
    applyTheme(savedTheme);
});

// Theme toggler logic
const themeIcon = document.getElementById('theme-icon');
themeIcon.addEventListener('click', () => {
    let currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    
    // Toggle theme
    if (currentTheme === 'light') {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark'); // Save the preference
    } else {
        applyTheme('light');
        localStorage.setItem('theme', 'light'); // Save the preference
    }
});



// Fetch blogs from Dev.to API
async function fetchBlogs() {
    try {
        const response = await fetch('https://dev.to/api/articles?username=theonlyaswin&per_page=30');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const blogs = await response.json();

        const blogList = document.getElementById('blog-list');

        // Filter blogs to only include those with 'devlog' in the title
        const devlogBlogs = blogs.filter(blog => blog.title.toLowerCase().includes('devlog'));

        // Sort filtered blogs by published date, most recent first
        devlogBlogs.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

        // Clear existing blog list
        blogList.innerHTML = '';

        // Display up to 3 most recent devlog blogs
        if (devlogBlogs.length === 0) {
            blogList.innerHTML = '<p>No devlogs found 🍃</p>'; // Add a fallback message if no blogs
        } else {
            devlogBlogs.slice(0, 3).forEach(blog => {
                const blogPost = `
                    <p><span style="color:gray;">${new Date(blog.published_at).toDateString()}</span> 
                    <a href="${blog.url}" target="_blank" class="blog-title">${blog.title}</a></p>
                `;
                blogList.innerHTML += blogPost;
            });
        }

        console.log('Fetched devlog blogs:', devlogBlogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        document.getElementById('blog-list').innerHTML = '<p>Error fetching blogs. Please try again later.</p>';
    }
}

fetchBlogs();