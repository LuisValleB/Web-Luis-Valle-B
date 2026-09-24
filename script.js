import { athleteData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initStats();
    initTimeline();
    initSelection();
    initSponsors();
    initPressAndVideos();
    initContact();
    initScrollEffects();
    initTarGallery();
    initTorrencialGallery();
});

let currentImageIndex = 0;

function updateLightboxImage() {
    const imgEl = document.getElementById('lightbox-img');
    const filename = currentGallery[currentImageIndex];
    imgEl.src = currentGalleryPath + filename;
}

let currentGallery = [];
let currentGalleryPath = '';

function initTarGallery() {
    const container = document.getElementById('tar-gallery-container');
    if (!container || !athleteData.tarGallery) return;

    athleteData.tarGallery.forEach((imgSrc, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'tar-thumb-wrapper';
        wrap.innerHTML = `<img src="/Transalpine Run 2026/${imgSrc}" alt="Transalpine Run 2026 Image ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.tarGallery, '/Transalpine Run 2026/'));
        container.appendChild(wrap);
    });

    setupLightboxEvents();
}

function initTorrencialGallery() {
    const container = document.getElementById('torrencial-gallery-container');
    if (!container || !athleteData.torrencialGallery) return;

    athleteData.torrencialGallery.forEach((imgSrc, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'tar-thumb-wrapper';
        wrap.innerHTML = `<img src="/Torrencial Valdivia 2026/${imgSrc}" alt="Torrencial 2026 Image ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.torrencialGallery, '/Torrencial Valdivia 2026/'));
        container.appendChild(wrap);
    });
}

function setupLightboxEvents() {
    if(window.lightboxEventsBound) return;
    window.lightboxEventsBound = true;
    
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

function openLightbox(index, galleryArray, path) {
    currentGallery = galleryArray;
    currentGalleryPath = path;
    currentImageIndex = index;
    updateLightboxImage();
    document.getElementById('lightbox').classList.add('show');
    document.body.style.overflow = 'hidden'; // prevent scrolling
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
    document.body.style.overflow = '';
}

function prevImage() {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentGallery.length - 1;
    updateLightboxImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex < currentGallery.length - 1) ? currentImageIndex + 1 : 0;
    updateLightboxImage();
}

function initHero() {
    document.getElementById('hero-phrase').textContent = athleteData.profile.phrase;
    const badgesDiv = document.getElementById('hero-badges');
    athleteData.profile.recognitions.forEach(rec => {
        const span = document.createElement('span');
        span.className = 'sel-result';
        span.style.display = 'inline-block';
        span.style.margin = '0 10px 10px 0';
        span.style.padding = '5px 15px';
        span.style.background = 'rgba(255,255,255,0.1)';
        span.style.borderRadius = '20px';
        span.textContent = rec;
        badgesDiv.appendChild(span);
    });
}

function initStats() {
    const totalRaces = athleteData.results.length;
    let firstPlaces = 0;
    let podiums = 0;
    const countries = new Set();
    
    athleteData.results.forEach(r => {
        countries.add(r.country);
        const pos = r.position.toLowerCase();
        if (pos.includes('1°')) {
            firstPlaces++;
            podiums++;
        } else if (pos.includes('2°') || pos.includes('3°')) {
            podiums++;
        }
    });

    const yearsActive = new Date().getFullYear() - athleteData.profile.started;

    const statsDiv = document.getElementById('hero-stats');
    const stats = [
        { label: 'Años Compitiendo', value: yearsActive },
        { label: 'Carreras', value: totalRaces },
        { label: 'Podios', value: podiums },
        { label: '1° Lugares', value: firstPlaces }
    ];

    stats.forEach(stat => {
        const item = document.createElement('div');
        item.className = 'stat-item';
        item.innerHTML = `
            <span class="stat-number">${stat.value}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        statsDiv.appendChild(item);
    });
}

let currentFilter = 'all';
let timelineLimit = 10;

function renderTimeline(filterType = 'all', showAll = false) {
    const container = document.getElementById('timeline-container');
    container.innerHTML = '';
    
    currentFilter = filterType;
    let lastYear = null;
    let renderedCount = 0;
    
    // Reverse chronological order
    const sortedResults = [...athleteData.results].reverse();
    
    sortedResults.forEach(r => {
        // Apply filters
        if (filterType === 'highlights' && !r.highlight) return;
        if (filterType === 'podiums') {
            const pos = r.position.toLowerCase();
            if (!pos.includes('1°') && !pos.includes('2°') && !pos.includes('3°')) return;
        }

        renderedCount++;
        const isHidden = !showAll && renderedCount > timelineLimit;

        // Group by year
        if (r.year !== lastYear) {
            const divider = document.createElement('div');
            divider.className = 'timeline-year-divider';
            if (isHidden) divider.classList.add('tl-hidden');
            divider.innerHTML = `<span>${r.year}</span>`;
            container.appendChild(divider);
            lastYear = r.year;
        }

        const item = document.createElement('div');
        item.className = 'timeline-item';
        if (isHidden) item.classList.add('tl-hidden');
        
        let posClass = '';
        if (r.position.includes('1°')) posClass = 'tl-pos-1';
        else if (r.position.includes('2°')) posClass = 'tl-pos-2';
        else if (r.position.includes('3°')) posClass = 'tl-pos-3';

        item.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <span class="tl-year">${r.year}</span>
                <h3 class="tl-race">${r.race}</h3>
                <div class="tl-meta">
                    <span>${r.distance}</span>
                    <span>${r.country}</span>
                    <span class="tl-position ${posClass}">${r.position}</span>
                </div>
            </div>
        `;
        container.appendChild(item);
    });

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        if (renderedCount > timelineLimit && !showAll) {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.onclick = () => {
                const hiddenItems = container.querySelectorAll('.tl-hidden');
                hiddenItems.forEach(el => el.classList.remove('tl-hidden'));
                loadMoreBtn.style.display = 'none';
            };
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

function initTimeline() {
    renderTimeline('all');

    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderTimeline(e.target.getAttribute('data-filter'), false);
        });
    });
}

function initSelection() {
    const container = document.getElementById('selection-grid');
    athleteData.selections.forEach(sel => {
        const card = document.createElement('div');
        card.className = 'sel-card';
        card.innerHTML = `
            <div class="sel-year">${sel.year}</div>
            <h4 class="sel-event">${sel.event}</h4>
            <div class="sel-result">${sel.result}</div>
            <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-top: 10px;">${sel.location}</div>
        `;
        container.appendChild(card);
    });
}

function initSponsors() {
    const container = document.getElementById('sponsors-grid');
    athleteData.team.forEach(t => {
        const card = document.createElement('div');
        card.className = 'sponsor-card';
        const linkHtml = t.link ? `<a href="${t.link}" target="_blank" rel="noopener noreferrer" class="sponsor-link">Ver perfil</a>` : '';
        card.innerHTML = `
            <h3>${t.name}</h3>
            <p>${t.role}</p>
            ${linkHtml}
        `;
        container.appendChild(card);
    });
}

function initPressAndVideos() {
    const videoContainer = document.getElementById('video-grid');
    // Just load first 3 videos to not destroy performance.
    athleteData.videos.slice(0, 3).forEach(id => {
        const wrap = document.createElement('div');
        wrap.className = 'video-wrapper';
        wrap.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        videoContainer.appendChild(wrap);
    });

    const pressList = document.querySelector('#press-list ul');
    athleteData.press.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${p.link}" target="_blank" rel="noopener noreferrer">${p.title}</a>`;
        pressList.appendChild(li);
    });
}

function initContact() {
    const container = document.getElementById('contact-links');
    const l = athleteData.links;
    container.innerHTML = `
        <a href="mailto:${l.email}">Email</a>
        <a href="${l.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="${l.strava}" target="_blank" rel="noopener noreferrer">Strava</a>
        <a href="${l.youtube}" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="${l.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    `;
}

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const revealElements = document.querySelectorAll('.section-reveal');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => revealOnScroll.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 60;
                const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}
