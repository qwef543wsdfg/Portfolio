// Dark mode toggle functionality
const toggleMode = document.getElementById('toggleMode');
const body = document.body;

// Theme configuration
const themes = {
    light: {
        icon: 'fa-moon',
        text: 'Dark Mode',
        color: '#2563eb',
        bgColor: '#ffffff',
        textColor: '#1f2937',
        accentColor: '#3b82f6'
    },
    dark: {
        icon: 'fa-sun',
        text: 'Light Mode',
        color: '#3b82f6',
        bgColor: '#111827',
        textColor: '#f3f4f6',
        accentColor: '#60a5fa'
    }
};

// Check for saved theme preference or system preference
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    updateToggleButton(theme);
    updateThemeColors(theme);
    localStorage.setItem('theme', theme);
}

// Update toggle button appearance
function updateToggleButton(theme) {
    const currentTheme = themes[theme];
    toggleMode.innerHTML = `
        <i class="fas ${currentTheme.icon}"></i>
        <span>${currentTheme.text}</span>
    `;
}

// Update CSS variables
function updateThemeColors(theme) {
    const currentTheme = themes[theme];
    document.documentElement.style.setProperty('--primary-color', currentTheme.color);
    document.documentElement.style.setProperty('--bg-color', currentTheme.bgColor);
    document.documentElement.style.setProperty('--text-color', currentTheme.textColor);
    document.documentElement.style.setProperty('--accent-color', currentTheme.accentColor);
}

// Initialize theme
const initialTheme = getInitialTheme();
applyTheme(initialTheme);

// Toggle theme on button click
toggleMode.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Project view functions
function openProject1() {
    window.open('project 1/Todo list .html', '_blank');
}

function openProject2() {
    window.open('Project 2/expense.html', '_blank');
}

function openProject3() {
    window.open('project 1/project 3/index.html', '_blank');
}

function openProject4() {
    window.open('project 4/index.html', '_blank');
}

// Add typing animation to header
const headerText = document.querySelector('header h1');
const text = headerText.textContent;
headerText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        headerText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// Add hover effect to project cards
document.querySelectorAll('#projects li').forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-10px)';
    });
    
    project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0)';
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Update the footer year dynamically
document.addEventListener("DOMContentLoaded", function () {
    const footerYear = document.querySelector("footer p");
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Aman. All Rights Reserved.`;
});

// Show alert when clicking on the download resume link
document.querySelector("#resume a").addEventListener("click", function () {
    alert("Your resume is being downloaded!");
});

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#10B981';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Add smooth reveal animation for project cards
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    projectObserver.observe(card);
});

// Add hover effect for contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});
        