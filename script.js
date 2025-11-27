document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. Menu Responsivo (Hambúrguer)
    // =========================================
    const nav = document.querySelector('.main-nav');
    const headerContainer = document.querySelector('.header-container');

    // Cria o botão de toggle (ícone hambúrguer)
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'main-menu');
    menuToggle.setAttribute('role', 'button');
    nav.id = 'main-menu';

    menuToggle.innerHTML = `
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    `;
    
    if (headerContainer) {
        headerContainer.insertBefore(menuToggle, nav);
    }
    
    const toggleMenu = () => {
        const isExpanded = nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : ''; // Evita scroll do body quando menu aberto
    };
    
    menuToggle.addEventListener('click', toggleMenu);

    // Fechar o menu ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMenu(); // Usa a função de toggle para fechar e reajustar aria/scroll
            }
        });
    });


    // =========================================
    // 2. Funcionalidade de FAQ (Acordeão)
    // =========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.classList.contains('active');

            // Função para fechar todos os outros itens
            const closeAll = () => {
                document.querySelectorAll('.faq-question.active').forEach(otherQuestion => {
                    otherQuestion.classList.remove('active');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    otherAnswer.style.maxHeight = null;
                    otherAnswer.classList.remove('active');
                });
            };

            // Se for abrir, feche todos antes
            if (!isExpanded) {
                closeAll();
            }

            // Toggle do item clicado
            question.classList.toggle('active', !isExpanded);
            question.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.classList.add('active');
            } else {
                answer.style.maxHeight = null;
                answer.classList.remove('active');
            }
        });
    });


    // =========================================
    // 3. Smooth Scrolling (Rolagem Suave)
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Ignora links que são apenas para mostrar/esconder elementos ou links vazios
        if (anchor.getAttribute('href') === '#' || anchor.classList.contains('btn-primary-small')) {
            return; 
        }

        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Subtrai a altura do header fixo (80px)
                    behavior: 'smooth'
                });
            }
        });
    });
});