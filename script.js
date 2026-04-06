document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const htmlElement = document.documentElement;

    // Initialize theme cleanly, defaulting precisely to Light Mode if no preference exists
    let savedTheme;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch(e) {}

    if (!savedTheme) {
        savedTheme = 'light';
        try { localStorage.setItem('theme', 'light'); } catch(e) {}
    }

    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch(e) {}
        updateIcons(newTheme);
    });

    function updateIcons(theme) {
        if (theme === 'dark') {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    }

    // Robust responsive JS Typewriter effect for Introduction
    const typeWriterElement = document.getElementById('typewriter-text');
    if (typeWriterElement) {
        const textToType = '“ I’m a Full Stack Developer crafting fast, scalable, and user-friendly web applications using modern technologies.”';
        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                typeWriterElement.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 35); // Typing speed
            } else {
                // Keep a subtle static or blinking cursor at the end
                typeWriterElement.innerHTML += '<span style="color: var(--primary); font-weight: bold; margin-left: 2px;">|</span>';
            }
        }
        setTimeout(typeWriter, 600); // Start delay
    }

    // Set dynamic year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll reveal (could be improved with IntersectionObserver)
    const fadeElements = document.querySelectorAll('.hover-lift');

    const checkFade = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top <= windowHeight * 0.8) {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styling for reveal
    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
    });

    window.addEventListener('scroll', checkFade);
    checkFade(); // Trigger on load
});
