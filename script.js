// --- DADOS DINÂMICOS ---
const servicosData = [
    { titulo: "Ônibus Elétricos", desc: "Frota 100% renovável com zero emissão de CO2 e baixo ruído." },
    { titulo: "Integração Total", desc: "Bilhete único válido para trem, metrô e ônibus em toda a rede." },
    { titulo: "Acessibilidade", desc: "100% da frota equipada com elevadores, rampas e sinalização braile." }
];

const faqData = [
    { q: "Como solicitar o cartão do idoso?", a: "Pode ser feito online pelo nosso portal ou em postos credenciados apresentando RG e comprovante de residência." },
    { q: "Quais os horários de pico?", a: "Geralmente entre 07:00-09:00 e 17:00-19:00 nos dias úteis." },
    { q: "O transporte aceita pagamento por aproximação?", a: "Sim, todos os validadores aceitam cartões de crédito, débito e carteiras digitais (NFC)." }
];

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    renderFAQ();
    initScrollReveal();
    initCarousel();
});

// --- FUNÇÕES DE RENDERIZAÇÃO ---
function renderCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = servicosData.map(item => `
        <article class="card">
            <h3>${item.titulo}</h3>
            <p>${item.desc}</p>
        </article>
    `).join('');
}

function renderFAQ() {
    const container = document.getElementById('faq-container');
    container.innerHTML = faqData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(this)">
                ${item.q}
            </button>
            <div class="accordion-content">
                <p>${item.a}</p>
            </div>
        </div>
    `).join('');
}

// --- ACESSIBILIDADE: FONTE ---
let currentFontSize = 16;
function changeFontSize(action) {
    const body = document.body;
    if (action === 'increase' && currentFontSize < 24) currentFontSize += 2;
    if (action === 'decrease' && currentFontSize > 12) currentFontSize -= 2;
    body.style.fontSize = currentFontSize + 'px';
}

// --- ALTO CONTRASTE ---
document.getElementById('contrast-toggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// --- COMPONENTES: ACORDEÃO ---
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    btn.setAttribute('aria-expanded', !isExpanded);
    content.classList.toggle('active');
}

// --- COMPONENTES: CARROSSEL ---
let currentSlide = 0;
function initCarousel() {
    const track = document.getElementById('carousel-track');
    track.innerHTML = servicosData.map(s => `
        <div class="carousel-slide">
            <h3>Destaque: ${s.titulo}</h3>
            <p>Mobilidade inteligente para você.</p>
        </div>
    `).join('');
    
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
}

function moveSlide(direction) {
    const track = document.getElementById('carousel-track');
    const totalSlides = servicosData.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// --- ANIMAÇÃO SCROLL REVEAL (INTERSECTION OBSERVER) ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}
