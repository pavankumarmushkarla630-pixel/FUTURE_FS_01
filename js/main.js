/**
 * Main JavaScript for Portfolio Website
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initialize EmailJS
    // REPLACE "YOUR_PUBLIC_KEY" with your actual public key from EmailJS Account settings
    const PUBLIC_KEY = "z3yv5XgtxcLqMKmUE"; 
    
    if (typeof emailjs !== 'undefined') {
        emailjs.init(PUBLIC_KEY);
    } else {
        console.error("EmailJS SDK failed to load. Please check your internet connection or the script tag in index.html.");
    }

    // 1. Navigation & Mobile Menu
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 2. Scroll Effects (Navbar Background & Active Links)
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active link in navigation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Intersection Observer for Fade-in Animations
    const faders = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-scale');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                
                // If it's the skills section, animate the progress bars
                if (entry.target.classList.contains('skill-card')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 4. Form Submission Logic
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // EmailJS credentials (REPLACE with your actual IDs)
            const serviceID = 'service_hdgreuf';
            const templateID = 'template_66bapa6';

            // Check if placeholders are still present
            if (PUBLIC_KEY === "YOUR_PUBLIC_KEY" || serviceID === "YOUR_SERVICE_ID" || templateID === "YOUR_TEMPLATE_ID") {
                console.warn("EmailJS Error: You are using placeholder IDs. Please replace 'YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', and 'YOUR_TEMPLATE_ID' with your real keys from EmailJS.");
                btn.innerHTML = '<i class="fas fa-key"></i> Setup Required';
                btn.style.background = '#f59e0b'; // Amber color for setup
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
                return;
            }

            try {
                // Send the form using EmailJS
                const response = await emailjs.sendForm(serviceID, templateID, contactForm);

                if (response.status === 200) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    btn.style.background = 'var(--secondary-color)';
                    contactForm.reset();
                } else {
                    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Service Error';
                    btn.style.background = '#ef4444';
                    console.error('EmailJS Error:', response);
                }
            } catch (error) {
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Connect Error';
                btn.style.background = '#ef4444'; 
                console.error('EmailJS Connection Error:', error);
                alert("EmailJS Error: " + error.text || error.message || "Failed to connect to service.");
            } finally {
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }
        });
    }

    // 5. Particles.js Initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#6366f1", "#ec4899", "#8b5cf6"] // Indigo, Pink, Violet
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#6366f1",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
});
