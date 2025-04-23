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
        document.querySelectorAll('.more-achievements.en-achievements').forEach(el => {
            el.style.display = currentLang === 'en' ? 'block' : 'none';
        });
        document.querySelectorAll('.more-achievements.fa-achievements').forEach(el => {
            el.style.display = currentLang === 'fa' ? 'block' : 'none';
        });
    }

    // Set initial language
    document.querySelectorAll('[data-en][data-fa]').forEach(element => {
        element.textContent = element.getAttribute('data-fa');
    });
    languageSwitch.querySelector('.fa').style.fontWeight = 'bold';

    languageSwitch.addEventListener('click', switchLanguage);

    // More button functionality
    const moreBtn = document.querySelector('.more-btn');
    const moreAchievementsEn = document.querySelector('.more-achievements.en-achievements');
    const moreAchievementsFa = document.querySelector('.more-achievements.fa-achievements');

    moreBtn.addEventListener('click', () => {
        if (currentLang === 'en') {
            moreAchievementsEn.style.display = 'block';
        } else {
            moreAchievementsFa.style.display = 'block';
        }
        moreBtn.style.display = 'none';
    });

    // Toggle achievements
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const achievementsList = btn.nextElementSibling;
            btn.classList.toggle('active');
            achievementsList.classList.toggle('active');
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

    // Video popup functionality
    const videoPopup = document.getElementById('videoPopup');
    const popupVideo = document.getElementById('popupVideo');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.video-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const videoSrc = btn.getAttribute('data-video');
            popupVideo.src = videoSrc;
            videoPopup.classList.add('active');
            popupVideo.play();
        });
    });

    closeBtn.addEventListener('click', () => {
        videoPopup.classList.remove('active');
        popupVideo.pause();
        popupVideo.src = '';
    });

    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) {
            videoPopup.classList.remove('active');
            popupVideo.pause();
            popupVideo.src = '';
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
