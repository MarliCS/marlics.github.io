document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signupBtn');
    const poster = document.querySelector('.poster');
    
    // Add click event to the signup button
    signupBtn.addEventListener('click', () => {
        // Replace this URL with your actual signup link
        window.location.href = '';
    });

    // Add hover effect to the poster
    poster.addEventListener('mouseenter', () => {
        poster.style.transform = 'scale(1.02)';
    });

    poster.addEventListener('mouseleave', () => {
        poster.style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const languageSwitch = document.getElementById('languageSwitch');
    let currentLang = 'fa';

    function switchLanguage() {
        currentLang = currentLang === 'en' ? 'fa' : 'en';
        document.documentElement.lang = currentLang;
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-en][data-fa]').forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });

        // Update button text
        languageSwitch.querySelector('.en').style.fontWeight = currentLang === 'en' ? 'bold' : 'normal';
        languageSwitch.querySelector('.fa').style.fontWeight = currentLang === 'fa' ? 'bold' : 'normal';

        // Update achievements visibility based on language
        document.querySelectorAll('.en-achievements').forEach(el => {
            el.style.display = currentLang === 'en' ? 'block' : 'none';
        });
        document.querySelectorAll('.fa-achievements').forEach(el => {
            el.style.display = currentLang === 'fa' ? 'block' : 'none';
        });

        // Hide more achievements when switching languages
        document.querySelectorAll('.more-achievements').forEach(el => {
            el.style.display = 'none';
        });

        // Show more buttons when switching languages
        document.querySelectorAll('.more-btn').forEach(btn => {
            btn.style.display = 'inline-flex';
        });
    }

    // Set initial language
    document.querySelectorAll('[data-en][data-fa]').forEach(element => {
        element.textContent = element.getAttribute('data-fa');
    });
    languageSwitch.querySelector('.fa').style.fontWeight = 'bold';

    // Set initial achievements visibility
    document.querySelectorAll('.en-achievements').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.fa-achievements').forEach(el => {
        el.style.display = 'block';
    });

    // Hide all more achievements initially
    document.querySelectorAll('.more-achievements').forEach(el => {
        el.style.display = 'none';
    });

    languageSwitch.addEventListener('click', switchLanguage);

    // More button functionality
    const moreBtns = document.querySelectorAll('.more-btn');
    moreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.closest('.achievements-list');
            const moreAchievementsEn = parent.querySelector('.more-achievements.en-achievements');
            const moreAchievementsFa = parent.querySelector('.more-achievements.fa-achievements');
            
            if (currentLang === 'en') {
                moreAchievementsEn.style.display = 'block';
            } else {
                moreAchievementsFa.style.display = 'block';
            }
            btn.style.display = 'none';
        });
    });

    // Handle scroll for language switcher size
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            languageSwitch.classList.add('scrolled');
        } else {
            languageSwitch.classList.remove('scrolled');
        }
    });

    // Lazy load GIFs
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const src = video.getAttribute('data-src');
                if (src) {
                    video.src = src;
                    video.play();
                    observer.unobserve(video);
                }
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.achievement-gif').forEach(video => {
        observer.observe(video);
    });
}); 
