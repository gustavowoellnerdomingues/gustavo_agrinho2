document.addEventListener('DOMContentLoaded', () => {
    
    // --- ESTADO GLOBAL DE ACESSIBILIDADE ---
    let currentFontSize = 16;
    const root = document.documentElement;

    // Controle de Fonte
    document.getElementById('btn-font-inc').addEventListener('click', () => {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            root.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });

    document.getElementById('btn-font-dec').addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            root.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });

    // Alto Contraste
    document.getElementById('btn-contrast').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });


    // --- RENDERIZAÇÃO E LÓGICA DO CARROSSEL (DATA-DRIVEN) ---
    const depoimentos = [
        {
            texto: "O projeto trouxe meu filho de volta da capital. Hoje ele gerencia a lavoura inteira usando tablets e drones, otimizando nossos lucros em 35% com sustentabilidade.",
            autor: "Ricardo Albuquerque",
            meta: "Produtor de Grãos - Mato Grosso"
        },
        {
            texto: "Eu não me via no campo até entender que a tecnologia limpa poderia transformar a fazenda da minha família em um negócio moderno. Conseguimos a sucessão de forma fluida.",
            autor: "Mariana Silva",
            meta: "Engenheira Agrônoma e Sucessora - Paraná"
        }
    ];

    const track = document.getElementById('carousel-track');
    
    depoimentos.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('testimonial-card');
        slide.innerHTML = `
            <p class="testimonial-text">"${item.texto}"</p>
            <p class="testimonial-author">${item.autor}</p>
            <p class="testimonial-meta">${item.meta}</p>
        `;
        track.appendChild(slide);
    });

    let indexCarousel = 0;
    const btnNext = document.getElementById('carousel-next');
    const btnPrev = document.getElementById('carousel-prev');

    function updateCarousel() {
        track.style.transform = `translateX(-${indexCarousel * 100}%)`;
    }

    btnNext.addEventListener('click', () => {
        indexCarousel = (indexCarousel + 1) % depoimentos.length;
        updateCarousel();
    });

    btnPrev.addEventListener('click', () => {
        indexCarousel = (indexCarousel - 1 + depoimentos.length) % depoimentos.length;
        updateCarousel();
    });


    // --- RENDERIZAÇÃO E LÓGICA DO ACORDEÃO (FAQ) ---
    const faqDados = [
        {
            pergunta: "Como engajar os jovens que já saíram para estudar na cidade?",
            resposta: "Mostrando que o campo moderno exige competências tecnológicas, inteligência de dados e gestão sustentável de ponta, assemelhando-se aos desafios das startups urbanas."
        },
        {
            pergunta: "A tecnologia sustentável não reduz a lucratividade?",
            resposta: "Pelo contrário. A agricultura de precisão reduz o desperdício de insumos, melhora a saúde do solo e abre mercados internacionais premium focados em carbono neutro."
        },
        {
            pergunta: "Qual o momento ideal para iniciar a sucessão familiar?",
            resposta: "O quanto antes. O processo deve ser planejado em etapas, integrando a inovação tecnológica trazida pelos jovens enquanto se preserva o conhecimento operacional dos pais."
        }
    ];

    const accordionContainer = document.getElementById('faq-accordion');

    faqDados.forEach((item, idx) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');

        faqItem.innerHTML = `
            <button class="faq-trigger" aria-expanded="false" aria-controls="faq-answer-${idx}">
                <span>${item.pergunta}</span>
                <span class="faq-icon">+</span>
            </button>
            <div id="faq-answer-${idx}" class="faq-content">
                <p style="padding-top: 10px;">${item.resposta}</p>
            </div>
        `;

        accordionContainer.appendChild(faqItem);
    });

    // Lógica do Acordeão
    const triggers = document.querySelectorAll('.faq-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Fecha todos antes de abrir o atual
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                i.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!isExpanded) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- LEADS FORM SUBMIT ---
    const ctaForm = document.getElementById('cta-form');
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado pelo interesse! Nossa equipe de especialistas em governança e tecnologia agrícola entrará em contato em até 24 horas.');
        ctaForm.reset();
    });
});