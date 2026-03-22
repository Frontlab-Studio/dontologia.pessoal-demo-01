document.addEventListener('DOMContentLoaded', () => {

    // 1. Controle do Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        const toggleMenu = () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('ativo');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        };

        menuToggle.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('ativo')) {
                    toggleMenu();
                }
            });
        });
    }

    // 2. Header Scrolled State
    const header = document.querySelector('.header-principal');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }
    // 3. Scroll Reveal Elegante e Otimizado (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    // Configura o observador: dispara quando o elemento está 10% visível na tela
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Remove o observador após a animação (otimiza CPU)
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

});