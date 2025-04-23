document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signupBtn');
    const poster = document.querySelector('.poster');
    
    // Add click event to the signup button
    signupBtn.addEventListener('click', () => {
        // Replace this URL with your actual signup link
        window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfjtXOfJy22GKH0eUjK_RrTQqh3175edc8Wdh6x9JrBs7wUrQ/viewform?usp=header';
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

    // Preload all videos
    function preloadVideos() {
        const videos = document.querySelectorAll('.achievement-gif');
        videos.forEach(video => {
            // Set preload attribute
            video.preload = 'auto';
            
            // Force load the video
            const videoSrc = video.getAttribute('src');
            video.src = videoSrc;
            
            // Add load event listener
            video.addEventListener('loadeddata', () => {
                console.log(`Video ${videoSrc} preloaded successfully`);
                // Add a class to indicate the video is loaded
                video.classList.add('video-loaded');
            });
            
            // Add error event listener
            video.addEventListener('error', (e) => {
                console.log(`Error preloading video ${videoSrc}:`, e);
            });

            // Force the video to load
            video.load();
        });
    }

    // Start preloading videos immediately
    preloadVideos();

    function switchLanguage() {
        currentLang = currentLang === 'en' ? 'fa' : 'en';
        document.documentElement.lang = currentLang;
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-en][data-fa]').forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });

        // Update button text and make active language bold
        const enText = languageSwitch.querySelector('.en');
        const faText = languageSwitch.querySelector('.fa');
        
        if (currentLang === 'en') {
            enText.style.fontWeight = '700';
            faText.style.fontWeight = '400';
        } else {
            enText.style.fontWeight = '400';
            faText.style.fontWeight = '700';
        }

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
    
    // Set initial button text weights
    const enText = languageSwitch.querySelector('.en');
    const faText = languageSwitch.querySelector('.fa');
    enText.style.fontWeight = '400';
    faText.style.fontWeight = '700';

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
            const currentLang = document.documentElement.lang;
            
            // Get the appropriate list based on current language
            const list = parent.querySelector(`.${currentLang}-achievements`);
            const moreAchievements = list.querySelectorAll('.more-achievements');
            
            moreAchievements.forEach(achievement => {
                if (!achievement.classList.contains('show')) {
                    achievement.classList.add('show');
                    const icon = btn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                    btn.setAttribute('data-en', 'Less');
                    btn.setAttribute('data-fa', 'کمتر');
                    // Update the button text directly
                    const btnText = btn.querySelector('.btn-text');
                    if (btnText) {
                        btnText.textContent = currentLang === 'en' ? 'Less' : 'کمتر';
                    } else {
                        // If no .btn-text element exists, create one
                        const newBtnText = document.createElement('span');
                        newBtnText.className = 'btn-text';
                        newBtnText.textContent = currentLang === 'en' ? 'Less' : 'کمتر';
                        btn.appendChild(newBtnText);
                    }
                } else {
                    achievement.classList.remove('show');
                    const icon = btn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                    btn.setAttribute('data-en', 'More');
                    btn.setAttribute('data-fa', 'بیشتر');
                    // Update the button text directly
                    const btnText = btn.querySelector('.btn-text');
                    if (btnText) {
                        btnText.textContent = currentLang === 'en' ? 'More' : 'بیشتر';
                    } else {
                        // If no .btn-text element exists, create one
                        const newBtnText = document.createElement('span');
                        newBtnText.className = 'btn-text';
                        newBtnText.textContent = currentLang === 'en' ? 'More' : 'بیشتر';
                        btn.appendChild(newBtnText);
                    }
                }
            });
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

    // Function to play video once and pause at end
    function playVideoOnce(video) {
        // Reset video to beginning
        video.currentTime = 0;
        
        // Remove any existing event listeners
        video.removeEventListener('ended', handleVideoEnd);
        
        // Add new ended event listener
        video.addEventListener('ended', handleVideoEnd);
        
        // Play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video started playing successfully
            }).catch(error => {
                console.log("Video playback failed:", error);
            });
        }
    }

    // Handle video end
    function handleVideoEnd(e) {
        const video = e.target;
        video.pause();
        video.currentTime = video.duration; // Ensure we're at the last frame
    }

    // Intersection Observer for videos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (!video.src) {
                    video.src = video.getAttribute('src');
                }
                playVideoOnce(video);
            } else {
                // When video is out of view, reset it
                const video = entry.target;
                video.pause();
                video.currentTime = 0;
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '50px'
    });

    // Observe all achievement videos
    document.querySelectorAll('.achievement-gif').forEach(video => {
        // Set initial state
        video.pause();
        video.currentTime = 0;
        
        // Add error handling
        video.addEventListener('error', (e) => {
            console.log("Video error:", e);
        });
        
        // Start observing
        observer.observe(video);
    });

    // Play videos when their container becomes visible
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const video = container.querySelector('.achievement-gif');
                if (video) {
                    playVideoOnce(video);
                }
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all achievement boxes
    document.querySelectorAll('.achievement-box').forEach(box => {
        achievementObserver.observe(box);
    });
}); 
