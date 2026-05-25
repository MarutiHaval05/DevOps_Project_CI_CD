// Dark Mode Toggle
const darkModeBtn = document.getElementById('darkModeBtn');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    darkModeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-menu');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-menu');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Statistics Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = target === 99.9 ? current.toFixed(1) : Math.floor(current);
        }
    }, 30);
}

// Intersection Observer for Counter Animation
const countersSection = document.getElementById('stats');
if (countersSection) {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(number => {
                    if (!number.dataset.animated) {
                        const target = parseFloat(number.dataset.target);
                        animateCounter(number, target);
                        number.dataset.animated = 'true';
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(countersSection);
}

// Team Member Search/Filter
const teamSearch = document.getElementById('teamSearch');
const teamMembers = document.querySelectorAll('.team-member');

if (teamSearch) {
    teamSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        teamMembers.forEach(member => {
            const name = member.querySelector('h3').textContent.toLowerCase();
            const role = member.querySelector('.role').textContent.toLowerCase();
            const contribution = member.querySelector('.contribution').textContent.toLowerCase();

            if (name.includes(searchTerm) || role.includes(searchTerm) || contribution.includes(searchTerm)) {
                member.style.display = '';
                member.style.animation = 'fadeIn 0.3s ease';
            } else {
                member.style.display = 'none';
            }
        });
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields!');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#10b981';

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);

        console.log('Form submitted:', { name, email, message });
    });
}

// Add scroll animations for elements
const scrollElements = document.querySelectorAll('.team-member, .feature-card, .overview-card, .tech-category');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            el.classList.remove('scrolled');
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initialize animations on load
window.addEventListener('load', () => {
    handleScrollAnimation();
});

// Add smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Navigation active link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Prevent form submission for demo
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ All interactive features loaded successfully!');
    console.log('Features enabled:');
    console.log('- Dark mode toggle');
    console.log('- Smooth scrolling');
    console.log('- Team member search');
    console.log('- Statistics animation');
    console.log('- Contact form validation');
    console.log('- Back to top button');
    console.log('- Mobile responsive menu');
});
