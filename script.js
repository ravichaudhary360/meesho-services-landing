/* ============================================
   MEESHO SERVICES LANDING PAGE - JAVASCRIPT
   Configuration & Functionality
   ============================================ */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    WHATSAPP_NUMBER: '919667073823', // +91 96670 73823
    CALL_NUMBER: '+919667073823',
    EMAIL: 'Sales@ecomgrowsupport.com',
    BUSINESS_NAME: 'eCom Grow Support'
};

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const service = document.getElementById('service').value.trim();
    const products = document.getElementById('products').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate required fields
    if (!name || !mobile || !service || !message) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }
    
    // Validate mobile number (basic validation)
    if (!/^\d{10,}$/.test(mobile.replace(/\D/g, ''))) {
        alert('Please enter a valid mobile number');
        return;
    }
    
    // Build WhatsApp message
    const whatsappMessage = buildWhatsAppMessage(name, mobile, service, products, message);
    
    // Open WhatsApp
    openWhatsAppWithMessage(whatsappMessage);
    
    // Reset form
    document.getElementById('enquiry-form').reset();
}

// ============================================
// BUILD WHATSAPP MESSAGE
// ============================================
function buildWhatsAppMessage(name, mobile, service, products, message) {
    let text = `Hello ${CONFIG.BUSINESS_NAME},\n\n`;
    text += `I'm interested in your Meesho services.\n\n`;
    text += `*My Details:*\n`;
    text += `Name: ${name}\n`;
    text += `Mobile: ${mobile}\n`;
    text += `\n*Service Required:*\n${service}\n`;
    
    if (products) {
        text += `\n*Number of Products/Catalogs:*\n${products}\n`;
    }
    
    text += `\n*My Requirement:*\n${message}\n`;
    text += `\nPlease contact me with more information and pricing details.\n`;
    text += `Thank you!`;
    
    return text;
}

// ============================================
// OPEN WHATSAPP WITH MESSAGE
// ============================================
function openWhatsAppWithMessage(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ============================================
// OPEN WHATSAPP CONSULTATION
// ============================================
function openWhatsApp(type = 'consultation') {
    let message = '';
    
    if (type === 'consultation') {
        message = `Hello ${CONFIG.BUSINESS_NAME}, I would like to know more about your Meesho services.`;
    } else if (type === 'support') {
        message = `Hello ${CONFIG.BUSINESS_NAME}, I need help with my Meesho seller account.`;
    }
    
    openWhatsAppWithMessage(message);
}

// ============================================
// CALL NOW FUNCTION
// ============================================
function callNow() {
    window.location.href = `tel:${CONFIG.CALL_NUMBER}`;
}

// ============================================
// FAQ TOGGLE FUNCTION
// ============================================
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (isActive) {
        faqItem.classList.remove('active');
    } else {
        faqItem.classList.add('active');
    }
}

// ============================================
// CLOSE FAQ WHEN CLICKING OUTSIDE
// ============================================
document.addEventListener('click', function(event) {
    if (!event.target.closest('.faq-item')) {
        // Optional: You can close all FAQs on outside click
        // document.querySelectorAll('.faq-item.active').forEach(item => {
        //     item.classList.remove('active');
        // });
    }
});

// ============================================
// KEYBOARD NAVIGATION FOR FAQ
// ============================================
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// ============================================
// SMOOTH SCROLL FOR BUTTONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Prevent floating WhatsApp button from covering bottom content on scroll
    manageFAQPadding();
    
    // Initialize tracking (optional)
    trackPageView();
});

// ============================================
// MANAGE FLOATING BUTTON PADDING
// ============================================
function manageFAQPadding() {
    const faqSection = document.getElementById('faq');
    const floatingButton = document.querySelector('.floating-whatsapp');
    
    if (!faqSection || !floatingButton) return;
    
    window.addEventListener('scroll', function() {
        const faqRect = faqSection.getBoundingClientRect();
        const isFAQVisible = faqRect.top < window.innerHeight && faqRect.bottom > 0;
        
        if (isFAQVisible) {
            // Add padding to floating button area if needed
            floatingButton.style.visibility = 'visible';
        }
    });
}

// ============================================
// FORM VALIDATION REAL-TIME
// ============================================
function setupFormValidation() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.type === 'tel') {
        const isValid = /^\d{10,}$/.test(value.replace(/\D/g, ''));
        updateFieldStatus(field, isValid || !value);
    } else if (field.required && !value) {
        updateFieldStatus(field, false);
    } else {
        updateFieldStatus(field, true);
    }
}

function updateFieldStatus(field, isValid) {
    if (isValid) {
        field.classList.remove('error');
    } else {
        field.classList.add('error');
    }
}

// ============================================
// PAGE VIEW TRACKING (Optional - Google Analytics)
// ============================================
function trackPageView() {
    // This is where you would add your analytics tracking
    // Example:
    // ga('send', 'pageview');
    // Or with Google Analytics 4:
    // gtag('event', 'page_view');
    
    console.log('Page loaded: Meesho Services Landing Page');
}

// ============================================
// TRACK BUTTON CLICKS (Optional)
// ============================================
function setupClickTracking() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log('Button clicked:', buttonText);
            
            // You can add analytics here
            // trackEvent('button_click', {button_text: buttonText});
        });
    });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    setupClickTracking();
});

// ============================================
// HANDLE MOBILE VIEWPORT
// ============================================
function setupMobileOptimizations() {
    // Prevent zoom on input focus (better UX on mobile)
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.fontSize = '16px'; // Prevent iOS zoom
        });
    });
}

document.addEventListener('DOMContentLoaded', setupMobileOptimizations);

// ============================================
// SERVICE CARD TRACKING
// ============================================
function trackServiceClick() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            console.log('Service viewed:', serviceName);
            // You can add analytics tracking here
        });
    });
}

document.addEventListener('DOMContentLoaded', trackServiceClick);

// ============================================
// FORM FIELD AUTO-FORMATTING
// ============================================
function setupFieldFormatting() {
    const mobileField = document.getElementById('mobile');
    
    if (mobileField) {
        mobileField.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 10-15 digits
            if (this.value.length > 15) {
                this.value = this.value.slice(0, 15);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', setupFieldFormatting);

// ============================================
// EXPORT CONFIG FOR TESTING
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, handleFormSubmit, openWhatsApp, callNow };
}