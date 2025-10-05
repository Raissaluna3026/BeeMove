// Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Smooth scrolling
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

        // Video upload functionality
        document.getElementById('video-input').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const videoContainer = document.querySelector('.video-upload');
                videoContainer.innerHTML = `
                    <video controls style="width: 100%; max-width: 600px; border-radius: 10px;">
                        <source src="${URL.createObjectURL(file)}" type="${file.type}">
                        Your browser does not support the video element.
                    </video>
                    <p style="margin-top: 1rem;">Video uploaded successfully!</p>
                `;
            }
        });

        // Redirect to map page function
        function redirectToMapPage() {
            window.location.href = './mapa.html';
        }