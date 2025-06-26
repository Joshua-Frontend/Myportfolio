// Modal functionality
const projectItems = document.querySelectorAll('.project-item');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-btn');

// Open modal
projectItems.forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const modal = btn.closest('.modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Gallery image click for larger view
const galleryImages = document.querySelectorAll('.gallery-image');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            cursor: pointer;
        `;
        
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        overlay.appendChild(fullImg);
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    });
});

// Smooth scroll reveal animation
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, scrollObserverOptions);

// Observe project items for animation
projectItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    scrollObserver.observe(item);
});

function animateSkills(skill) {
    const progressBar = skill.querySelector('.progress');
    const percentageText = skill.querySelector('.skill-percentage');
    const targetPercentage = parseInt(progressBar.dataset.target);
    let currentPercentage = 0;

    const interval = setInterval(() => {
        if (currentPercentage >= targetPercentage) {
            clearInterval(interval);
        } else {
            currentPercentage++;
            progressBar.style.width = currentPercentage + '%';
            percentageText.textContent = currentPercentage + '%';
        }
    }, 20);
}

function handleScrollAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if (entry.target.classList.contains('skills-section')) {
                document.querySelectorAll('.skill').forEach(animateSkills);
            }
        }
    });
}

const skillObserver = new IntersectionObserver(handleScrollAnimation, {
    threshold: 0.3 
});

document.querySelectorAll('.skills-section, .skill').forEach(section => {
    skillObserver.observe(section);
});

/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");
    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
    } else {
        menuBtn.className = "nav-menu";
    }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() {
    headerShadow();
    scrollActive();
};

function headerShadow() {
    const navHeader = document.getElementById("header");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";
    } else {
        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "90px";
    }
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
    strings: ["Frontend", "Student", "Developer"],
    loop: true,
    typeSpeed: 100, 
    backSpeed: 80,
    backDelay: 2000
});

/* ----- SCROLL REVEAL ANIMATION ----- */
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true     
});

/* -- HOME -- */
sr.reveal('.featured-text-card', {});
sr.reveal('.featured-name', {delay: 100});
sr.reveal('.featured-text-info', {delay: 200});
sr.reveal('.featured-text-btn', {delay: 200});
sr.reveal('.social_icons', {delay: 200});
sr.reveal('.featured-image', {delay: 300});

/* -- PROJECT BOX -- */
sr.reveal('.project-box', {interval: 200});

/* -- HEADINGS -- */
sr.reveal('.top-header', {});

/* ----- SCROLL REVEAL LEFT_RIGHT ANIMATION ----- */
/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
    origin: 'left',
    distance: '80px',
    duration: 2000,
    reset: true
});

srLeft.reveal('.about-info', {delay: 100});
srLeft.reveal('.contact-info', {delay: 100});

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
    origin: 'right',
    distance: '80px',
    duration: 2000,
    reset: true
});

srRight.reveal('.skills-box', {delay: 100});
srRight.reveal('.form-control', {delay: 100});

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const h2Element = document.querySelector("h2");
    const timelineItems = document.querySelectorAll(".timeline-item");
    let lastScrollPosition = window.pageYOffset;

    function handleScroll(elements) {
        const triggerBottom = window.innerHeight * 0.85;
        const currentScrollPosition = window.pageYOffset;
        const scrollingDown = currentScrollPosition > lastScrollPosition;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            // Element comes into view
            if (elementTop < triggerBottom && elementBottom > 0) {
                element.classList.remove('hide');
                element.classList.add('show');
            } 
            // Element goes out of view
            else if (element.classList.contains('show')) {
                element.classList.remove('show');
                element.classList.add('hide');
            }
        });

        lastScrollPosition = currentScrollPosition;
    }

    function revealElements() {
        handleScroll([h2Element, ...timelineItems]);
    }

    // Run on scroll and on page load
    window.addEventListener("scroll", revealElements);
    revealElements(); // Trigger on load for items already in view
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all project thumbnails
    const thumbnails = document.querySelectorAll('.project-thumbnail');
    
    // Get all modals
    const projectModals = document.querySelectorAll('.project-modal');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-button');
    
    // Add click event to each thumbnail
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-target');
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Add click event to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.project-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        projectModals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
});