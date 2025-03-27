// Theme Toggle Functionality
const toggleMode = document.getElementById('toggleMode');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

toggleMode.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    const icon = toggleMode.querySelector('i');
    const text = toggleMode.querySelector('span');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark Mode';
    }
}

// Chart.js Implementation
// Engagement Chart
const engagementCtx = document.getElementById('engagementChart').getContext('2d');
const engagementChart = new Chart(engagementCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Engagement Rate',
            data: [2.5, 3.2, 2.8, 3.5, 3.8, 4.2],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        }
    }
});

// Distribution Chart
const distributionCtx = document.getElementById('distributionChart').getContext('2d');
const distributionChart = new Chart(distributionCtx, {
    type: 'doughnut',
    data: {
        labels: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
        datasets: [{
            data: [35, 25, 30, 10],
            backgroundColor: [
                '#1877f2',
                '#1da1f2',
                '#e4405f',
                '#0077b5'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Time Range Buttons
const timeRangeButtons = document.querySelectorAll('.chart-actions .btn');
timeRangeButtons.forEach(button => {
    button.addEventListener('click', () => {
        timeRangeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        updateChartData(button.textContent);
    });
});

function updateChartData(range) {
    // Simulate data update based on time range
    const newData = generateRandomData(range);
    engagementChart.data.datasets[0].data = newData;
    engagementChart.update();
}

function generateRandomData(range) {
    const baseData = [2.5, 3.2, 2.8, 3.5, 3.8, 4.2];
    return baseData.map(value => {
        const randomFactor = 0.8 + Math.random() * 0.4;
        return +(value * randomFactor).toFixed(1);
    });
}

// Recent Activity
const activityList = document.querySelector('.activity-list');
const activities = [
    {
        platform: 'Facebook',
        action: 'New post published',
        time: '2 minutes ago',
        icon: 'fab fa-facebook'
    },
    {
        platform: 'Twitter',
        action: 'Retweeted by 50 users',
        time: '15 minutes ago',
        icon: 'fab fa-twitter'
    },
    {
        platform: 'Instagram',
        action: 'New follower milestone',
        time: '1 hour ago',
        icon: 'fab fa-instagram'
    },
    {
        platform: 'LinkedIn',
        action: 'Profile view increased',
        time: '2 hours ago',
        icon: 'fab fa-linkedin'
    }
];

function renderActivities() {
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.platform.toLowerCase()}">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p><strong>${activity.platform}</strong> ${activity.action}</p>
                <small>${activity.time}</small>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderActivities();
    
    // Add active class to current nav item
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentElement.classList.add('active');
        }
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
    });
});

// Notification Badge
const notificationIcon = document.querySelector('.notifications');
let notificationCount = 3;

notificationIcon.addEventListener('click', () => {
    notificationCount = 0;
    updateNotificationBadge();
});

function updateNotificationBadge() {
    const badge = document.querySelector('.badge');
    if (notificationCount > 0) {
        badge.textContent = notificationCount;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}
