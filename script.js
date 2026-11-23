import { athleteData } from './data.js';

window.toggleEpic = function(id) {
    // Hide all epic sections
    document.querySelectorAll('.epic-section').forEach(el => {
        el.classList.remove('active');
    });
    // Show the requested one
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        // Load any deferred iframes now that the section has non-zero dimensions
        target.querySelectorAll('iframe[data-src]').forEach(iframe => {
            if (!iframe.getAttribute('src')) {
                iframe.setAttribute('src', iframe.getAttribute('data-src'));
            }
        });
        // Scroll to it
        const headerOffset = 60;
        const offsetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
};

// Force page to start at the top on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    initHero();
    initStats();
    initUtmbCircuit();
    initTimeline();
    initSelection();
    initPressAndVideos();
    initContact();
    initScrollEffects();
    initTarGallery();
    initTorrencialGallery();
    initK42Gallery();
    initCascadaGallery();
    initFronteraGallery();
    initK42_2026Gallery();
    initParquemetGallery();
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
        if (index >= 6) wrap.style.display = 'none';
        wrap.innerHTML = `<img src="/Transalpine Run 2026/${imgSrc}" alt="Transalpine Run 2026 Image ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.tarGallery, '/Transalpine Run 2026/'));
        container.appendChild(wrap);
    });

    if (athleteData.tarGallery.length > 6) addLoadMoreButton(container);
    setupLightboxEvents();
}

function initTorrencialGallery() {
    const container = document.getElementById('torrencial-gallery-container');
    if (!container || !athleteData.torrencialGallery) return;

    athleteData.torrencialGallery.forEach((imgSrc, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'tar-thumb-wrapper';
        if (index >= 6) wrap.style.display = 'none';
        wrap.innerHTML = `<img src="/Torrencial Valdivia 2026/${imgSrc}" alt="Torrencial 2026 Image ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.torrencialGallery, '/Torrencial Valdivia 2026/'));
        container.appendChild(wrap);
    });
    
    if (athleteData.torrencialGallery.length > 6) addLoadMoreButton(container);
}

function initK42Gallery() {
    const container = document.getElementById('k42-gallery-container');
    if (!container || !athleteData.k42Gallery) return;

    athleteData.k42Gallery.forEach((imgSrc, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'tar-thumb-wrapper';
        if (index >= 6) wrap.style.display = 'none';
        wrap.innerHTML = `<img src="/k42/${imgSrc}" alt="K42 Villa La Angostura 2025 Image ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.k42Gallery, '/k42/'));
        container.appendChild(wrap);
    });
    
    if (athleteData.k42Gallery.length > 6) addLoadMoreButton(container);
}

function initCascadaGallery() {
    const container = document.getElementById('cascada-gallery-container');
    if (!container || !athleteData.cascadaGallery) return;

    athleteData.cascadaGallery.forEach((imgSrc, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'tar-thumb-wrapper';
        if (index >= 6) wrap.style.display = 'none';
        wrap.innerHTML = `<img src="/Cascada Trail 2026/${imgSrc}" alt="Cascada Trail 2026 Image ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.cascadaGallery, '/Cascada Trail 2026/'));
        container.appendChild(wrap);
    });
    
    if (athleteData.cascadaGallery.length > 6) addLoadMoreButton(container);
}

function initFronteraGallery() {
    const container = document.getElementById('frontera-gallery-container');
    if (!container || !athleteData.fronteraGallery) return;

    athleteData.fronteraGallery.forEach((imgSrc, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'tar-thumb-wrapper';
        if (index >= 6) wrap.style.display = 'none';
        wrap.innerHTML = `<img src="/Frontera Trail 2026/${imgSrc}" alt="Frontera Trail 2026 Foto ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.fronteraGallery, '/Frontera Trail 2026/'));
        container.appendChild(wrap);
    });
    
    if (athleteData.fronteraGallery.length > 6) addLoadMoreButton(container);
}

function initK42_2026Gallery() {
    const container = document.getElementById('k42-2026-gallery-container');
    if (!container || !athleteData.k42_2026Gallery) return;

    athleteData.k42_2026Gallery.forEach((imgSrc, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'tar-thumb-wrapper';
        if (index >= 6) wrap.style.display = 'none';
        wrap.innerHTML = `<img src="/K42 2026/${imgSrc}" alt="ASICS K42 Villa La Angostura 2026 Foto ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.k42_2026Gallery, '/K42 2026/'));
        container.appendChild(wrap);
    });
    
    if (athleteData.k42_2026Gallery.length > 6) addLoadMoreButton(container);
}

function initParquemetGallery() {
    const container = document.getElementById('parquemet-gallery-container');
    if (!container || !athleteData.parquemetGallery) return;

    athleteData.parquemetGallery.forEach((imgSrc, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'tar-thumb-wrapper';
        if (index >= 6) wrap.style.display = 'none';
        wrap.innerHTML = `<img src="/Desafío Trail running Parquemet 2026/${imgSrc}" alt="Desafío Trail Running Parquemet 2026 Foto ${index + 1}" loading="lazy">`;
        wrap.addEventListener('click', () => openLightbox(index, athleteData.parquemetGallery, '/Desafío Trail running Parquemet 2026/'));
        container.appendChild(wrap);
    });
    
    if (athleteData.parquemetGallery.length > 6) addLoadMoreButton(container);
}

function addLoadMoreButton(container) {
    const btnContainer = document.createElement('div');
    btnContainer.style.textAlign = 'center';
    btnContainer.style.gridColumn = '1 / -1';
    btnContainer.style.marginTop = '10px';

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.style.marginTop = '10px';
    btn.textContent = 'Ver más fotos';
    btn.onclick = () => {
        const hiddenThumbs = container.querySelectorAll('.tar-thumb-wrapper[style*="display: none"]');
        hiddenThumbs.forEach(thumb => thumb.style.display = 'block');
        btnContainer.style.display = 'none';
    };
    btnContainer.appendChild(btn);
    container.appendChild(btnContainer);
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

function getFlagHtml(country) {
    const map = {
        'Chile': '<img src="/banderas/bandera chile.webp" alt="Chile" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Argentina': '<img src="/banderas/bandera argentina.webp" alt="Argentina" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Suiza': '<img src="/banderas/bandera suiza.svg" alt="Suiza" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Portugal': '<img src="/banderas/bandera portugal.svg" alt="Portugal" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'España': '<img src="/banderas/bandera espana.svg" alt="España" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Uruguay': '<img src="/banderas/bandera uruguay.svg" alt="Uruguay" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Ecuador': '<img src="https://flagcdn.com/w20/ec.png" alt="Ecuador" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Francia': '<img src="https://flagcdn.com/w20/fr.png" alt="Francia" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Bolivia': '<img src="/banderas/bandera bolivia.svg" alt="Bolivia" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Austria': '<img src="/banderas/bandera austria.svg" alt="Austria" style="height:12px; margin-right:4px; vertical-align:middle;">',
        'Sudáfrica': '<img src="/banderas/bandera sudafrica.svg" alt="Sudáfrica" style="height:12px; margin-right:4px; vertical-align:middle;">'
    };
    return map[country] || '';
}

function renderTimeline(filterType = 'all', expandAll = false) {
    const container = document.getElementById('timeline-container');
    container.innerHTML = '';
    
    currentFilter = filterType;
    
    // Reverse chronological order
    const sortedResults = [...athleteData.results].reverse();
    
    // Group filtered results by year preserving reverse chronological order
    const yearGroups = new Map();
    sortedResults.forEach(r => {
        if (filterType === 'highlights' && !r.highlight) return;
        if (filterType === 'utmb' && !r.utmb) return;
        if (filterType === 'podiums') {
            const pos = r.position.toLowerCase();
            if (!pos.includes('1°') && !pos.includes('2°') && !pos.includes('3°')) return;
        }
        if (!yearGroups.has(r.year)) {
            yearGroups.set(r.year, []);
        }
        yearGroups.get(r.year).push(r);
    });

    const years = Array.from(yearGroups.keys());

    years.forEach((year, yearIdx) => {
        const races = yearGroups.get(year);
        const isExpanded = expandAll || filterType === 'utmb' || yearIdx === 0;

        const divider = document.createElement('div');
        divider.className = 'timeline-year-divider';
        const raceLabel = races.length === 1 ? '1 carrera' : `${races.length} carreras`;
        divider.innerHTML = `
            <button type="button" class="timeline-year-btn ${isExpanded ? 'expanded' : ''}" aria-expanded="${isExpanded}">
                <span class="tl-year-title">${year}</span>
                <span class="tl-year-badge">${raceLabel}</span>
                <span class="tl-year-chevron" aria-hidden="true">▾</span>
            </button>
        `;
        container.appendChild(divider);

        const groupEl = document.createElement('div');
        groupEl.className = `timeline-year-group ${isExpanded ? 'open' : 'collapsed'}`;
        groupEl.setAttribute('data-year', year);

        races.forEach(r => {
            const item = document.createElement('div');
            item.className = `timeline-item ${r.utmb ? 'timeline-item-utmb' : ''}`;
            
            let posClass = '';
            if (r.position.includes('1°')) posClass = 'tl-pos-1';
            else if (r.position.includes('2°')) posClass = 'tl-pos-2';
            else if (r.position.includes('3°')) posClass = 'tl-pos-3';

            const flagHtml = getFlagHtml(r.country);
            const utmbBadgeHtml = r.utmb
                ? `<span class="tl-utmb-tag"><img src="/logos/utmb.png" alt="UTMB"> Circuito UTMB®</span>`
                : '';

            item.innerHTML = `
                <div class="timeline-marker ${r.utmb ? 'timeline-marker-utmb' : ''}"></div>
                <div class="timeline-content ${r.utmb ? 'timeline-content-utmb' : ''}">
                    <div class="tl-header-row">
                        <span class="tl-year">${r.year}</span>
                        ${utmbBadgeHtml}
                    </div>
                    <h3 class="tl-race">${r.race}</h3>
                    <div class="tl-meta">
                        <span>${r.distance}</span>
                        <span>${flagHtml}${r.country}</span>
                        <span class="tl-position ${posClass}">${r.position}</span>
                    </div>
                </div>
            `;
            groupEl.appendChild(item);
        });

        const btn = divider.querySelector('.timeline-year-btn');
        btn.addEventListener('click', () => {
            const currentlyOpen = groupEl.classList.contains('open');
            if (currentlyOpen) {
                groupEl.classList.remove('open');
                groupEl.classList.add('collapsed');
                btn.classList.remove('expanded');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                groupEl.classList.remove('collapsed');
                groupEl.classList.add('open');
                btn.classList.add('expanded');
                btn.setAttribute('aria-expanded', 'true');
            }
            updateLoadMoreBtnState(container);
        });

        container.appendChild(groupEl);
    });

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        if (years.length > 1) {
            loadMoreBtn.style.display = 'inline-block';
            updateLoadMoreBtnState(container);
            loadMoreBtn.onclick = () => {
                const anyCollapsed = container.querySelector('.timeline-year-group.collapsed') !== null;
                renderTimeline(currentFilter, anyCollapsed);
            };
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

function updateLoadMoreBtnState(container) {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;
    const anyCollapsed = container.querySelector('.timeline-year-group.collapsed') !== null;
    loadMoreBtn.textContent = anyCollapsed ? 'Desplegar todos los años' : 'Mostrar solo último año';
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

function initUtmbCircuit() {
    const container = document.getElementById('utmb-circuit-grid');
    if (!container || !athleteData.utmbCircuit) return;
    container.innerHTML = '';

    athleteData.utmbCircuit.forEach(item => {
        const card = document.createElement('div');
        let cardClass = 'utmb-card';
        if (item.isPodiumFirst) cardClass += ' utmb-card-winner';
        if (item.isFinals) cardClass += ' utmb-card-finals';
        card.className = cardClass;

        const logoImg = item.isFinals
            ? `<img src="/logos/occ.png" alt="OCC UTMB" class="utmb-card-brand-logo">`
            : `<img src="/logos/utmb.png" alt="UTMB" class="utmb-card-brand-logo">`;

        const mediaHtml = item.image
            ? `<div class="utmb-card-media" data-gallery-idx="${item.galleryIndex}">
                   <img src="/circuito utmb/${item.image}" alt="${item.race}" class="utmb-card-img" style="object-position: ${item.imagePos || 'center'};" loading="lazy">
                   <span class="utmb-photo-zoom">Ver foto</span>
               </div>`
            : `<div class="utmb-card-media utmb-card-media-finals">
                   <img src="/logos/occ.png" alt="OCC Chamonix" class="utmb-finals-hero-logo">
                   <span class="utmb-finals-hero-sub">UTMB® World Series Finals • Chamonix</span>
               </div>`;

        const noteHtml = item.note ? `<p class="utmb-card-note">${item.note}</p>` : '';
        let actionHtml = '';
        if (item.epicId) {
            actionHtml = `<button type="button" class="utmb-card-action" onclick="toggleEpic('${item.epicId}')">Ver crónica 100K →</button>`;
        } else if (item.link) {
            actionHtml = `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="utmb-card-action">Prensa: Runchile →</a>`;
        }

        card.innerHTML = `
            ${mediaHtml}
            <div class="utmb-card-body">
                <div class="utmb-card-top">
                    <div class="utmb-card-badges">
                        <span class="utmb-year-tag">${item.year}</span>
                        <span class="utmb-status-tag">${item.badge}</span>
                    </div>
                    ${logoImg}
                </div>
                <h3 class="utmb-race-title">${item.race}</h3>
                <div class="utmb-race-category">${item.category}</div>
                <div class="utmb-race-result">${item.result}</div>
                ${noteHtml}
                <div class="utmb-card-footer">
                    <span class="utmb-location">
                        <img src="${item.flag}" alt="${item.location}" class="utmb-flag">
                        ${item.location}
                    </span>
                    ${actionHtml}
                </div>
            </div>
        `;

        const mediaEl = card.querySelector('.utmb-card-media[data-gallery-idx]');
        if (mediaEl && athleteData.utmbGallery) {
            mediaEl.addEventListener('click', () => {
                const idx = parseInt(mediaEl.getAttribute('data-gallery-idx'), 10) || 0;
                openLightbox(idx, athleteData.utmbGallery, '/circuito utmb/');
            });
        }

        container.appendChild(card);
    });

    const galleryContainer = document.getElementById('utmb-gallery-container');
    if (galleryContainer && athleteData.utmbGallery) {
        galleryContainer.innerHTML = '';
        athleteData.utmbGallery.forEach((imgSrc, index) => {
            const wrap = document.createElement('div');
            wrap.className = 'tar-thumb-wrapper';
            if (index >= 6) wrap.style.display = 'none';
            wrap.innerHTML = `<img src="/circuito utmb/${imgSrc}" alt="Circuito UTMB Foto ${index + 1}" loading="lazy">`;
            wrap.addEventListener('click', () => openLightbox(index, athleteData.utmbGallery, '/circuito utmb/'));
            galleryContainer.appendChild(wrap);
        });
        if (athleteData.utmbGallery.length > 6) addLoadMoreButton(galleryContainer);
    }
}

function initSelection() {
    const container = document.getElementById('selection-grid');
    if (!container) return;
    container.innerHTML = '';
    athleteData.selections.forEach(sel => {
        const card = document.createElement('div');
        card.className = 'sel-card';
        const flagTopHtml = sel.flag ? `<div class="sel-flag"><img src="${sel.flag}" alt="${sel.location}" class="sel-flag-img"></div>` : '';
        const flagLocHtml = sel.flag ? `<img src="${sel.flag}" alt="${sel.location}" class="sel-loc-flag">` : '';
        card.innerHTML = `
            ${flagTopHtml}
            <div class="sel-year">${sel.year}</div>
            <h4 class="sel-event">${sel.event}</h4>
            <div class="sel-result">${sel.result}</div>
            <div class="sel-location">${flagLocHtml}<span>${sel.location}</span></div>
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
