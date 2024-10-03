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
