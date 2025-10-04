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
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                    <p style="margin-top: 1rem;">Vídeo carregado com sucesso!</p>
                `;
            }
        });

        // NASA Worldview map function
        function openNASAMap() {
            const nasaMapUrl = "https://worldview.earthdata.nasa.gov/?v=-118.58532438941101,34.6197965887461,-118.12811960409199,34.821609638515824&l=Reference_Labels_15m,Reference_Features_15m(hidden),Coastlines_15m,HLS_S30_Nadir_BRDF_Adjusted_Reflectance(hidden),HLS_L30_Nadir_BRDF_Adjusted_Reflectance,VIIRS_NOAA20_CorrectedReflectance_TrueColor(hidden),VIIRS_SNPP_CorrectedReflectance_TrueColor(hidden),MODIS_Aqua_CorrectedReflectance_TrueColor(hidden),MODIS_Terra_CorrectedReflectance_TrueColor(hidden)&lg=true&l1=Reference_Labels_15m,Reference_Features_15m(hidden),Coastlines_15m,HLS_S30_Nadir_BRDF_Adjusted_Reflectance,HLS_L30_Nadir_BRDF_Adjusted_Reflectance,VIIRS_NOAA20_CorrectedReflectance_TrueColor(hidden),VIIRS_SNPP_CorrectedReflectance_TrueColor(hidden),MODIS_Aqua_CorrectedReflectance_TrueColor(hidden),MODIS_Terra_CorrectedReflectance_TrueColor(hidden)&lg1=true&ca=true&cv=53&t=2023-04-07-T02%3A00%3A00Z&t1=2020-04-18-T16%3A00%3A00Z";
            window.open(nasaMapUrl, '_blank');
        }