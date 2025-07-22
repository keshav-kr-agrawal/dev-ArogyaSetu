// Professional JavaScript for ArogyaSetu Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    setupMobileMenu();
    setupScrollEffects();
    setupSmoothScrolling();
    setupButtonHandlers();
    setupAnimations();
    setupAccessibility();
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isExpanded);

        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Header scroll effects
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // Header background effect
        if (currentScrollY > 100) {
            header.style.background = 'rgba(79, 70, 229, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #4F46E5 0%, #6366f1 100%)';
            header.style.backdropFilter = 'none';
        }

        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = currentScrollY * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Button click handlers
function setupButtonHandlers() {
    // Login button
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showNotification('Login functionality will be implemented here!', 'info');
        });
    }

    // Signup button
    const signupBtn = document.querySelector('.btn-signup');
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            showNotification('Sign up functionality will be implemented here!', 'info');
        });
    }

    // Get Started button
    const getStartedBtn = document.querySelector('.btn-primary');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            showNotification('Get Started functionality will be implemented here!', 'success');
        });
    }
}

// Enhanced hover effects
function setupAnimations() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .service-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }

    // Logo floating animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.animation = 'heartbeat 2s infinite';
        });
    }
}

// Accessibility features
function setupAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });

    // Focus management
    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #4F46E5';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Typing effect function
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#4F46E5'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations can be added here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Initialize intersection observer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupIntersectionObserver();
});

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) scale(1.02); }
        50% { transform: translateY(-10px) scale(1.02); }
    }
    
    .service-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;

document.head.appendChild(additionalStyles); 


function getDiagnosis() {
  const inputField = document.getElementById("symptom-input");
  const input = inputField.value.toLowerCase().trim();
  const symptoms = input.replace(/,/g, '').split(/\s+/);

  const resultSection = document.getElementById("result-section");
  const diseaseName = document.getElementById("disease-name");
  const testList = document.getElementById("test-list");
  const doctorType = document.getElementById("doctor-type");

  // Clear previous results
  diseaseName.textContent = "";
  testList.innerHTML = "";
  doctorType.textContent = "";
  resultSection.classList.add("hidden");

  if (input === "") {
    diseaseName.textContent = "Please enter some symptoms above to get suggestions.";
    return;
  }

  let mockDiagnosis = {
    disease: "General Viral Infection",
    tests: ["CBC (Complete Blood Count)", "Throat Swab", "Rapid Antigen Test"],
    doctor: "General Physician"
  };

  if (symptoms.includes("fever") && symptoms.includes("cough")) {
    mockDiagnosis = {
      disease: "Flu or COVID-19",
      tests: ["RT-PCR", "Chest X-Ray", "Blood Test"],
      doctor: "Pulmonologist"
    };
  } else if (symptoms.includes("headache") && symptoms.includes("nausea")) {
    mockDiagnosis = {
      disease: "Migraine",
      tests: ["Neurological Exam", "MRI"],
      doctor: "Neurologist"
    };
  } else if (
    (symptoms.includes("swollen") && symptoms.includes("feet")) ||
    (symptoms.includes("leg") && symptoms.includes("pain"))
  ) {
    mockDiagnosis = {
      disease: "Water Retention or Poor Circulation",
      tests: ["Kidney Function Test", "Doppler Ultrasound"],
      doctor: "Nephrologist"
    };
  }

  diseaseName.textContent = mockDiagnosis.disease;
  mockDiagnosis.tests.forEach(test => {
    const li = document.createElement("li");
    li.textContent = test;
    testList.appendChild(li);
  });
  doctorType.textContent = mockDiagnosis.doctor;
  resultSection.classList.remove("hidden");
}

function clearFields() {
  document.getElementById("symptom-input").value = "";
  document.getElementById("result-section").classList.add("hidden");
}

document.getElementById("symptom-input").addEventListener("input", () => {
  document.getElementById("result-section").classList.add("hidden");
});