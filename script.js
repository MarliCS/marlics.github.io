document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signupBtn');
    const poster = document.querySelector('.poster');
    
    // Add click event to the signup button
    signupBtn.addEventListener('click', () => {
        // Replace this URL with your actual signup link
        window.location.href = 'https://example.com/signup';
    });

    // Add hover effect to the poster
    poster.addEventListener('mouseenter', () => {
        poster.style.transform = 'scale(1.02)';
    });

    poster.addEventListener('mouseleave', () => {
        poster.style.transform = 'scale(1)';
    });
}); 