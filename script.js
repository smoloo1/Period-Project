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

// Pain Profile Form Handler
const painProfileForm = document.getElementById('pain-profile-form');
const profileResults = document.getElementById('profile-results');
const profileSummary = document.getElementById('profile-summary');

if (painProfileForm) {
    painProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get selected pain types
        const selectedPainTypes = Array.from(
            document.querySelectorAll('input[name="pain-type"]:checked')
        ).map(input => {
            const label = input.closest('.pain-option');
            return label.querySelector('h4').textContent;
        });
        
        // Get severity
        const severity = document.querySelector('input[name="severity"]:checked');
        
        if (!severity) {
            alert('Please select a pain severity level');
            return;
        }
        
        const severityValue = severity.value;
        const severityLabel = severity.closest('.severity-option').querySelector('strong').textContent;
        
        // Generate profile summary
        let summaryHTML = '<div>';
        
        if (selectedPainTypes.length > 0) {
            summaryHTML += '<div style="margin-bottom: 1.5rem;">';
            summaryHTML += '<h4>Your Pain Types:</h4>';
            summaryHTML += '<div>';
            selectedPainTypes.forEach(type => {
                summaryHTML += `<span class="pain-badge">${type}</span>`;
            });
            summaryHTML += '</div></div>';
        }
        
        summaryHTML += `<div style="margin-bottom: 1.5rem;">`;
        summaryHTML += `<h4>Severity Level:</h4>`;
        summaryHTML += `<span class="severity-badge severity-${severityValue}">${severityLabel}</span>`;
        summaryHTML += `</div>`;
        
        // Provide personalized recommendations
        summaryHTML += '<div class="recommendations">';
        summaryHTML += '<h4>Recommended Starting Points:</h4>';
        summaryHTML += '<ul style="list-style-position: inside; margin-top: 0.5rem;">';
        
        if (severityValue === 'mild') {
            summaryHTML += '<li>Try heat therapy and gentle movement first</li>';
            summaryHTML += '<li>Consider dietary approaches like anti-inflammatory foods</li>';
            summaryHTML += '<li>Explore relaxation techniques</li>';
        } else if (severityValue === 'moderate') {
            summaryHTML += '<li>NSAIDs (like ibuprofen) can be very effective for moderate pain</li>';
            summaryHTML += '<li>Combine heat therapy with medication for better relief</li>';
            summaryHTML += '<li>Regular gentle exercise may help prevent severe episodes</li>';
            summaryHTML += '<li>Consider talking to a healthcare provider about your options</li>';
        } else if (severityValue === 'severe') {
            summaryHTML += '<li><strong>Consider scheduling an appointment with a healthcare provider</strong></li>';
            summaryHTML += '<li>Severe pain that disrupts daily life deserves professional evaluation</li>';
            summaryHTML += '<li>In the meantime, NSAIDs and heat can provide some relief</li>';
            summaryHTML += '<li>Track your symptoms to share with your provider</li>';
        }
        
        // Pain-type specific recommendations
        if (selectedPainTypes.some(type => type.toLowerCase().includes('cramping'))) {
            summaryHTML += '<li>Heat therapy is especially effective for cramping</li>';
        }
        if (selectedPainTypes.some(type => type.toLowerCase().includes('bloating'))) {
            summaryHTML += '<li>Reduce sodium and stay hydrated to help with bloating</li>';
        }
        if (selectedPainTypes.some(type => type.toLowerCase().includes('digestive'))) {
            summaryHTML += '<li>Ginger tea may help with nausea and digestive discomfort</li>';
        }
        if (selectedPainTypes.some(type => type.toLowerCase().includes('radiating'))) {
            summaryHTML += '<li>Stretching and pelvic floor relaxation can help with radiating pain</li>';
        }
        
        summaryHTML += '</ul></div></div>';
        
        profileSummary.innerHTML = summaryHTML;
        profileResults.style.display = 'block';
        
        // Scroll to results
        profileResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Solutions Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const solutionCards = document.querySelectorAll('.solution-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter solution cards
        solutionCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                // Smooth fade-in effect
                card.style.animation = 'fadeIn 0.5s';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavigation() {
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-nav');
                }
            });
        }
    });
}

// Add active navigation style
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-links a.active-nav {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
    }
`;
document.head.appendChild(navStyle);

window.addEventListener('scroll', highlightNavigation);
window.addEventListener('load', highlightNavigation);

// Mobile menu toggle (for future enhancement)
// This is a placeholder for mobile menu functionality
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            const menuStyle = document.createElement('style');
            menuStyle.textContent = `
                .mobile-menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-dark);
                }
                
                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: block;
                    }
                    
                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: white;
                        box-shadow: var(--shadow);
                        padding: 1rem;
                    }
                    
                    .nav-links.show {
                        display: flex;
                    }
                    
                    .nav-links a {
                        padding: 0.5rem 0;
                    }
                }
            `;
            document.head.appendChild(menuStyle);
            
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('show');
            });
            
            nav.querySelector('.nav-container').appendChild(menuToggle);
        }
    }
};

window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Form validation helper
const validateForm = (form) => {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value || (field.type === 'radio' && !form.querySelector(`input[name="${field.name}"]:checked`))) {
            isValid = false;
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    });
    
    return isValid;
};

// Add validation styles
const validationStyle = document.createElement('style');
validationStyle.textContent = `
    .invalid {
        border-color: var(--danger-color) !important;
    }
`;
document.head.appendChild(validationStyle);

// Accessibility: Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
document.body.insertBefore(skipLink, document.body.firstChild);

const skipLinkStyle = document.createElement('style');
skipLinkStyle.textContent = `
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    }
    
    .skip-link:focus {
        top: 0;
    }
`;
document.head.appendChild(skipLinkStyle);

// Print friendly: Expand all content when printing
window.addEventListener('beforeprint', () => {
    solutionCards.forEach(card => {
        card.classList.remove('hidden');
    });
});

// Analytics placeholder (for future implementation)
const trackEvent = (category, action, label) => {
    // Placeholder for analytics tracking
    console.log('Event:', category, action, label);
};

// Track button clicks for analytics
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// Track solution filter usage
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('Solutions Filter', 'Click', this.dataset.filter);
    });
});

console.log('Period Pain Hub loaded successfully');
