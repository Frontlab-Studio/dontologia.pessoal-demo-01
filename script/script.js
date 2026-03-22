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

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
    // 4. Gerenciamento Otimizado de Cookies (Gatilho: 50% de Scroll)
    const cookieBar = document.getElementById('cookie-bar');
    const aceitarBtn = document.getElementById('aceitar-cookies');

    if (cookieBar && aceitarBtn) {
        if (!localStorage.getItem('cookiesAceitos')) {

            const showCookieOnScroll = () => {
                const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercent = (window.scrollY / docHeight) * 100;

                if (scrollPercent >= 50) {
                    cookieBar.classList.add('show');
                    window.removeEventListener('scroll', showCookieOnScroll);
                }
            };

            window.addEventListener('scroll', showCookieOnScroll, { passive: true });
        }

        aceitarBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAceitos', 'true');
            cookieBar.classList.remove('show');
        });
    }

});