// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const toolButtons = document.querySelectorAll('.try-btn');
const toolCards = document.querySelectorAll('.tool-card');
const closeButtons = document.querySelectorAll('.close-tool');
const heroAnimation = document.querySelector('.hero-animation');
const featureCards = document.querySelectorAll('.feature-card');
const statNumbers = document.querySelectorAll('.stat-item .number');

// Theme Toggle with Animation
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Animate theme toggle icon
    const icon = themeToggle.querySelector('i');
    icon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        icon.style.transform = 'rotate(0deg)';
    }, 500);
});

// Check for saved theme preference
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
    document.body.classList.add('dark-mode');
}

// Hero Animation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    heroAnimation.appendChild(particle);
    
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

setInterval(createParticle, 300);

// Tool Cards with Animation
toolButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Hide all tool cards with fade out
        toolCards.forEach(card => {
            card.style.opacity = '0';
            setTimeout(() => {
                card.classList.remove('active');
                card.style.opacity = '1';
            }, 300);
        });
        
        // Show selected tool card with fade in
        setTimeout(() => {
            toolCards[index].classList.add('active');
            toolCards[index].style.opacity = '1';
        }, 300);
    });
});

// Close Tool Cards with Animation
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.tool-card');
        card.style.opacity = '0';
        setTimeout(() => {
            card.classList.remove('active');
            card.style.opacity = '1';
        }, 300);
    });
});

// Enhanced Chat Tool
const chatInput = document.querySelector('.chat-input input');
const chatMessages = document.querySelector('.chat-messages');
const sendButton = document.querySelector('.chat-input button');

if (chatInput && sendButton) {
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typingIndicator);
            
            // Simulate AI response with typing effect
            setTimeout(() => {
                typingIndicator.remove();
                addMessage('ai', generateAIResponse(message));
            }, 2000);
        }
    };
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    sendButton.addEventListener('click', sendMessage);
}

function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.style.opacity = '0';
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    
    // Animate message appearance
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 100);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(message) {
    // Simple response generation (replace with actual AI integration)
    const responses = [
        "I understand your query. Let me help you with that.",
        "That's an interesting question. Here's what I think...",
        "I can assist you with that. Here's my response...",
        "Let me analyze that for you...",
        "Based on my knowledge, here's what I can tell you..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Enhanced Image Generation Tool
const imageInput = document.querySelector('.image-input input');
const generateButton = document.querySelector('.image-input button');
const generatedImage = document.querySelector('.generated-image img');

if (generateButton) {
    generateButton.addEventListener('click', () => {
        const prompt = imageInput.value.trim();
        if (prompt) {
            // Show loading animation
            generatedImage.style.opacity = '0';
            generateButton.disabled = true;
            generateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            
            // Simulate image generation with loading effect
            setTimeout(() => {
                generatedImage.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(prompt)}`;
                generatedImage.style.display = 'block';
                generatedImage.style.opacity = '1';
                generateButton.disabled = false;
                generateButton.innerHTML = 'Generate';
            }, 2000);
        }
    });
}

// Enhanced Translation Tool
const translationInput = document.querySelector('.translation-input textarea');
const translateButton = document.querySelector('.translation-input button');
const translationOutput = document.querySelector('.translation-output');

if (translateButton) {
    translateButton.addEventListener('click', () => {
        const text = translationInput.value.trim();
        if (text) {
            // Show loading animation
            translationOutput.style.opacity = '0';
            translateButton.disabled = true;
            translateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Translating...';
            
            // Simulate translation with typing effect
            setTimeout(() => {
                const translatedText = `Translated: ${text.split('').reverse().join('')}`;
                typeText(translationOutput, translatedText);
                translateButton.disabled = false;
                translateButton.innerHTML = 'Translate';
            }, 1500);
        }
    });
}

function typeText(element, text, speed = 50) {
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
}

// Enhanced Voice Recognition Tool
const startButton = document.querySelector('.voice-controls button');
const transcriptionOutput = document.querySelector('.translation-output');

if (startButton) {
    startButton.addEventListener('click', () => {
        if (startButton.textContent.includes('Start')) {
            startRecording();
        } else {
            stopRecording();
        }
    });
}

function startRecording() {
    startButton.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
    startButton.classList.add('recording');
    
    // Add pulse animation
    startButton.style.animation = 'pulse 1.5s infinite';
    
    // Simulate transcription with typing effect
    setTimeout(() => {
        const text = "This is a simulated transcription. Replace with actual Web Speech API implementation.";
        typeText(transcriptionOutput, text);
    }, 2000);
}

function stopRecording() {
    startButton.innerHTML = '<i class="fas fa-microphone"></i> Start Recording';
    startButton.classList.remove('recording');
    startButton.style.animation = 'none';
}

// Animate Stats Numbers
function animateStats() {
    statNumbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const step = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                number.textContent = target + (number.textContent.includes('+') ? '+' : '');
                clearInterval(counter);
            } else {
                number.textContent = Math.floor(current);
            }
        }, step);
    });
}

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }, 2000);
        }, 1500);
    });
}

// Enhanced Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stats when they come into view
            if (entry.target.classList.contains('about-stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .about-content, .contact-container, .about-stats').forEach(el => {
    observer.observe(el);
});

// Add hover effects to feature cards
featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
