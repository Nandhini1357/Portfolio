/**
 * ==========================================================================
 * NANDHINI S | PERSONAL DEVELOPER PORTFOLIO JAVASCRIPT
 * Vanilla JavaScript (ES6+) - Clean, Modular, Zero Dependencies
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --- 1. Responsive Sticky Navbar & Mobile Drawer --- */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScrollNavbar = () => {
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScrollNavbar, { passive: true });
  onScrollNavbar();

  const toggleMobileNav = (open) => {
    const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    navMenu.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileNav();
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMobileNav(false);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        toggleMobileNav(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMobileNav(false);
      }
    });
  }

  /* --- 2. Smooth Scrolling with Offset --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 76;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, '', targetId);
        }
      }
    });
  });

  /* --- 3. Active Navigation Highlighting (ScrollSpy) --- */
  const sections = document.querySelectorAll('section[id]');
  const onScrollSpy = () => {
    const scrollPos = window.pageYOffset;
    const navHeight = navbar ? navbar.offsetHeight : 76;

    sections.forEach((sec) => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - navHeight - 100;
      const secId = sec.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href="#${secId}"]`);

      if (navItem) {
        if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  /* --- 4. Scroll Reveal Animations --- */
  const revealItems = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('revealed'));
  }

  /* --- 5. Skill Search & Category Filtering --- */
  const skillSearchInput = document.getElementById('skill-search-input');
  const categoryBtns = document.querySelectorAll('.skill-category-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  let currentCategory = 'all';

  const filterSkills = () => {
    const query = skillSearchInput ? skillSearchInput.value.trim().toLowerCase() : '';

    skillCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category');
      const cardTitle = (card.getAttribute('data-skill') || '').toLowerCase();
      const cardDesc = card.textContent.toLowerCase();

      const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchesSearch = !query || cardTitle.includes(query) || cardDesc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  };

  categoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      filterSkills();
    });
  });

  if (skillSearchInput) {
    skillSearchInput.addEventListener('input', filterSkills);
  }

  /* --- 6. Gallery & Certificate Lightbox Modal --- */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-display-img');
  const lightboxVideo = document.getElementById('lightbox-display-video');
  const lightboxCaption = document.getElementById('lightbox-caption-text');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');
  const lightboxCounter = document.getElementById('lightbox-counter-badge');

  let currentAlbum = null;
  let currentAlbumIndex = 0;
  let onAlbumChangeCallback = null;

  const updateLightboxContent = () => {
    if (!currentAlbum || currentAlbum.length === 0) return;
    const item = currentAlbum[currentAlbumIndex];
    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.caption || `Photo ${currentAlbumIndex + 1}`;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = item.caption || '';
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentAlbumIndex + 1} / ${currentAlbum.length}`;
    }
    if (typeof onAlbumChangeCallback === 'function') {
      onAlbumChangeCallback(currentAlbumIndex);
    }
  };

  const navigateAlbum = (direction) => {
    if (!currentAlbum || currentAlbum.length <= 1) return;
    currentAlbumIndex = (currentAlbumIndex + direction + currentAlbum.length) % currentAlbum.length;
    updateLightboxContent();
  };

  const openLightbox = (src, caption, isVideo = false, album = null, initialIndex = 0, onChange = null) => {
    if (!lightboxModal) return;

    if (isVideo || (src && src.endsWith('.mp4'))) {
      if (lightboxImg) lightboxImg.style.display = 'none';
      if (lightboxVideo) {
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = src;
        lightboxVideo.currentTime = 0;
        lightboxVideo.play().catch(() => { });
      }
      currentAlbum = null;
      if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'none';
      if (lightboxNextBtn) lightboxNextBtn.style.display = 'none';
      if (lightboxCounter) lightboxCounter.style.display = 'none';
      if (lightboxCaption) lightboxCaption.textContent = caption || '';
    } else {
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.removeAttribute('src');
        lightboxVideo.style.display = 'none';
      }
      if (lightboxImg) {
        lightboxImg.style.display = 'block';
      }

      if (album && album.length > 1) {
        currentAlbum = album;
        currentAlbumIndex = initialIndex;
        onAlbumChangeCallback = onChange;
        if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'flex';
        if (lightboxNextBtn) lightboxNextBtn.style.display = 'flex';
        if (lightboxCounter) lightboxCounter.style.display = 'inline-block';
        updateLightboxContent();
      } else {
        currentAlbum = null;
        onAlbumChangeCallback = null;
        if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'none';
        if (lightboxNextBtn) lightboxNextBtn.style.display = 'none';
        if (lightboxCounter) lightboxCounter.style.display = 'none';
        if (lightboxImg) {
          lightboxImg.src = src;
          lightboxImg.alt = caption || 'Lightbox preview';
        }
        if (lightboxCaption) lightboxCaption.textContent = caption || '';
      }
    }

    lightboxModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.setAttribute('hidden', '');
    if (lightboxImg) lightboxImg.src = '';
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute('src');
      lightboxVideo.style.display = 'none';
    }
    currentAlbum = null;
    onAlbumChangeCallback = null;
    document.body.style.overflow = '';
  };

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateAlbum(-1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateAlbum(1);
    });
  }

  /* Single-image Lightbox Triggers (Certificates, standalone items) */
  document.querySelectorAll('[data-lightbox-src]').forEach((trigger) => {
    if (trigger.hasAttribute('data-gallery-target')) return;
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-lightbox-src');
      const caption = trigger.getAttribute('data-lightbox-caption');
      openLightbox(src, caption, false);
    });
  });

  /* Video Lightbox Triggers */
  document.querySelectorAll('[data-lightbox-video]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-lightbox-video');
      const caption = trigger.getAttribute('data-lightbox-caption');
      openLightbox(src, caption, true);
    });
  });

  /* Multi-Photo Carousel Cards (AWS SBG, VARNAM'26 & NPTEL Showcase) */
  document.querySelectorAll('.gallery-card-carousel').forEach((card) => {
    const slides = card.querySelectorAll('.gallery-slide');
    const prevBtn = card.querySelector('.gallery-nav-prev');
    const nextBtn = card.querySelector('.gallery-nav-next');
    const counterCur = card.querySelector('.gallery-current-slide');
    const counterTot = card.querySelector('.gallery-total-slides');
    const openBtn = card.querySelector('.gallery-carousel-open-btn');
    if (!slides.length) return;

    let currentIndex = 0;
    const total = slides.length;
    if (counterTot) counterTot.textContent = total;

    const setCardSlide = (index) => {
      currentIndex = (index + total) % total;
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      if (counterCur) counterCur.textContent = currentIndex + 1;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setCardSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setCardSlide(currentIndex + 1);
      });
    }

    const albumData = Array.from(slides).map((slide) => ({
      src: slide.getAttribute('data-src') || (slide.querySelector('img') ? slide.querySelector('img').getAttribute('src') : ''),
      caption: slide.getAttribute('data-caption') || ''
    }));

    const launchLightboxModal = (targetIndex = currentIndex) => {
      setCardSlide(targetIndex);
      const activeSlide = slides[currentIndex];
      const src = activeSlide.getAttribute('data-src');
      const caption = activeSlide.getAttribute('data-caption');
      openLightbox(src, caption, false, albumData, currentIndex, (newIdx) => {
        setCardSlide(newIdx);
      });
    };

    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        launchLightboxModal();
      });
    }

    slides.forEach((slide) => {
      slide.addEventListener('click', (e) => {
        if (!e.target.closest('.gallery-nav-arrow')) {
          launchLightboxModal();
        }
      });
    });

    const galleryGroup = card.getAttribute('data-gallery-group');
    if (galleryGroup) {
      document.querySelectorAll(`[data-gallery-target="${galleryGroup}"]`).forEach((trigger) => {
        const handleTrigger = (e) => {
          e.preventDefault();
          const pdfUrl = trigger.getAttribute('data-cert-pdf');
          if (pdfUrl && pdfUrl.trim() !== '') {
            window.open(pdfUrl, '_blank');
            return;
          }
          const targetIdx = parseInt(trigger.getAttribute('data-slide-index'), 10) || 0;
          launchLightboxModal(targetIdx);
        };

        trigger.addEventListener('click', handleTrigger);
        trigger.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTrigger(e);
          }
        });
      });
    }
  });

  /* --- NPTEL Single-Certificate Showcase with Clickable Names Below --- */
  const nptelStage = document.getElementById('nptel-single-showcase');
  if (nptelStage) {
    const slides = Array.from(nptelStage.querySelectorAll('.nptel-stage-slide'));
    const nameItems = Array.from(nptelStage.querySelectorAll('.nptel-name-item'));
    const prevBtn = nptelStage.querySelector('.nptel-stage-prev');
    const nextBtn = nptelStage.querySelector('.nptel-stage-next');
    const indexCounter = document.getElementById('nptel-active-index');
    const featuredTag = document.getElementById('nptel-featured-tag');
    const featuredTitle = document.getElementById('nptel-featured-title');
    const featuredDesc = document.getElementById('nptel-featured-desc');
    const featuredScore = document.getElementById('nptel-featured-score');
    const mediaViewport = nptelStage.querySelector('.nptel-featured-media');
    const zoomTrigger = document.getElementById('nptel-zoom-trigger');

    const courseData = [
      {
        tag: 'NPTEL ELITE • IIT GUWAHATI',
        title: 'Applied Accelerated AI',
        desc: 'Consolidated score of <strong>78% (Elite)</strong> in 12-week course. Scored 25/25 in Online Assignments and 52.5/75 in Proctored Exam. Certified by IIT Guwahati under SWAYAM.',
        scoreText: '78% • Elite',
        isElite: true,
        src: 'assets/images/nptel-cert-applied-ai-78.jpg'
      },
      {
        tag: 'NPTEL ELITE • IIT MADRAS',
        title: 'The Joy of Computing using Python',
        desc: 'Consolidated score of <strong>76% (Elite)</strong> in 12-week course. Scored 24.72/25 in Online Assignments and 51.5/75 in Proctored Exam. Certified by IIT Madras under SWAYAM.',
        scoreText: '76% • Elite',
        isElite: true,
        src: 'assets/images/nptel-cert-joy-computing-python-76.jpg'
      },
      {
        tag: 'NPTEL ELITE • IIT KHARAGPUR',
        title: 'Ethical Hacking',
        desc: 'Consolidated score of <strong>66% (Elite)</strong> in 12-week course. Scored 25/25 in Online Assignments and 40.5/75 in Proctored Exam. Certified by IIT Kharagpur under SWAYAM.',
        scoreText: '66% • Elite',
        isElite: true,
        src: 'assets/images/nptel-cert-ethical-hacking-66.jpg'
      },
      {
        tag: 'NPTEL ELITE • IIT KHARAGPUR',
        title: 'Soft Skill Development',
        desc: 'Consolidated score of <strong>66% (Elite)</strong> in 8-week course. Scored 23.58/25 in Online Assignments and 42.75/75 in Proctored Exam. Certified by IIT Kharagpur under SWAYAM.',
        scoreText: '66% • Elite',
        isElite: true,
        src: 'assets/images/nptel-cert-soft-skill-development-66.jpg'
      },
      {
        tag: 'NPTEL • IIT MADRAS',
        title: 'Machine Learning',
        desc: 'Consolidated score of <strong>52%</strong> in 8-week course. Scored 21.88/25 in Online Assignments and 30/75 in Proctored Exam. Certified by IIT Madras under SWAYAM.',
        scoreText: '52%',
        isElite: false,
        src: 'assets/images/nptel-cert-machine-learning-52.jpg'
      }
    ];

    let currentIdx = 0;
    const total = courseData.length;

    const setCertificate = (newIndex) => {
      currentIdx = (newIndex + total) % total;
      const data = courseData[currentIdx];

      // Update slides
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIdx);
      });

      // Update clickable name items below
      nameItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentIdx);
      });

      // Update active text below certificate image
      if (indexCounter) indexCounter.textContent = currentIdx + 1;
      if (featuredTag) featuredTag.textContent = data.tag;
      if (featuredTitle) featuredTitle.textContent = data.title;
      if (featuredDesc) featuredDesc.innerHTML = data.desc;
      if (featuredScore) {
        featuredScore.textContent = data.scoreText;
        featuredScore.className = data.isElite ? 'nptel-score-tag elite-tag' : 'nptel-score-tag';
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCertificate(currentIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCertificate(currentIdx + 1);
      });
    }

    // Click handler on the clickable names down below
    nameItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(item.getAttribute('data-target-index'), 10) || 0;
        setCertificate(targetIdx);
      });
    });

    // Lightbox modal data
    const albumData = courseData.map((d) => ({
      src: d.src,
      caption: `${d.title} — ${d.scoreText} (${d.tag})`
    }));

    const openTheater = () => {
      openLightbox(courseData[currentIdx].src, albumData[currentIdx].caption, false, albumData, currentIdx, (newIdx) => {
        setCertificate(newIdx);
      });
    };

    if (mediaViewport) {
      mediaViewport.addEventListener('click', (e) => {
        if (!e.target.closest('.nptel-stage-nav')) {
          openTheater();
        }
      });
      mediaViewport.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openTheater();
        }
      });
    }

    if (zoomTrigger) {
      zoomTrigger.addEventListener('click', openTheater);
    }
  }

  /* --- Infosys Springboard Certifications Showcase (All 6 Credentials) --- */
  const infosysStage = document.getElementById('infosys-showcase');
  if (infosysStage) {
    const slides = Array.from(infosysStage.querySelectorAll('.nptel-stage-slide'));
    const nameItems = Array.from(infosysStage.querySelectorAll('.infosys-name-item'));
    const prevBtn = infosysStage.querySelector('.infosys-stage-prev');
    const nextBtn = infosysStage.querySelector('.infosys-stage-next');
    const indexCounter = document.getElementById('infosys-active-index');
    const featuredTag = document.getElementById('infosys-featured-tag');
    const featuredTitle = document.getElementById('infosys-featured-title');
    const featuredDesc = document.getElementById('infosys-featured-desc');
    const featuredScore = document.getElementById('infosys-featured-score');
    const mediaViewport = infosysStage.querySelector('.infosys-media');
    const zoomTrigger = document.getElementById('infosys-zoom-trigger');

    const infosysData = [
      {
        tag: 'INFOSYS SPRINGBOARD • ALGORITHMS',
        title: 'Data Structures and Algorithms',
        desc: 'Completed on April 24, 2025. Comprehensive mastery of linear and non-linear data structures, algorithmic complexity, trees, graphs, and dynamic problem solving.',
        scoreText: 'Verified • 2025',
        isElite: true,
        src: 'assets/images/infosys-cert-dsa.jpg'
      },
      {
        tag: 'INFOSYS SPRINGBOARD • CORE JAVA',
        title: 'Java: Zero to Hero Bootcamp',
        desc: 'Completed on March 20, 2025. Object-oriented architecture, collections framework, exception handling, multithreading, and stream processing in Java.',
        scoreText: 'Verified • 2025',
        isElite: true,
        src: 'assets/images/infosys-cert-java-bootcamp.jpg'
      },
      {
        tag: 'INFOSYS SPRINGBOARD • DATA & SQL',
        title: 'Database and SQL',
        desc: 'Completed on March 25, 2025. Relational schema design, normalization, complex SQL joins, indexing, subqueries, and transaction management.',
        scoreText: 'Verified • 2025',
        isElite: true,
        src: 'assets/images/infosys-cert-database-sql.jpg'
      },
      {
        tag: 'INFOSYS SPRINGBOARD • ARTIFICIAL INTELLIGENCE',
        title: 'Introduction to Artificial Intelligence',
        desc: 'Completed on July 5, 2025. Fundamental AI paradigms, search algorithms, knowledge representation, machine intelligence concepts, and modern AI workflows.',
        scoreText: 'Verified • 2025',
        isElite: true,
        src: 'assets/images/infosys-cert-intro-ai.jpg'
      },
      {
        tag: 'INFOSYS SPRINGBOARD • CYBERSECURITY',
        title: 'Crypto in IT Security & Hacking',
        desc: 'Completed on February 14, 2026. Cryptographic primitives, symmetric & asymmetric encryption, cryptographic attacks, digital certificates, and defense mechanisms.',
        scoreText: 'Specialist • 2026',
        isElite: true,
        src: 'assets/images/infosys-cert-crypto-security.jpg'
      },
      {
        tag: 'COMPTIA SECURITYX • INFOSYS',
        title: 'CompTIA SecurityX: Applied Cryptography',
        desc: 'Completed on June 15, 2026. Enterprise cryptographic algorithms, PKI infrastructure, symmetric/asymmetric cipher suites, and key management.',
        scoreText: 'Specialist • 2026',
        isElite: true,
        src: 'assets/images/infosys-cert-comptia-securityx.jpg'
      }
    ];

    let currentInfosysIdx = 0;
    const totalInfosys = infosysData.length;

    const setInfosysCert = (newIndex) => {
      currentInfosysIdx = (newIndex + totalInfosys) % totalInfosys;
      const data = infosysData[currentInfosysIdx];

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentInfosysIdx);
      });

      nameItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentInfosysIdx);
      });

      if (indexCounter) indexCounter.textContent = currentInfosysIdx + 1;
      if (featuredTag) featuredTag.textContent = data.tag;
      if (featuredTitle) featuredTitle.textContent = data.title;
      if (featuredDesc) featuredDesc.innerHTML = data.desc;
      if (featuredScore) featuredScore.textContent = data.scoreText;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInfosysCert(currentInfosysIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInfosysCert(currentInfosysIdx + 1);
      });
    }

    nameItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(item.getAttribute('data-target-index'), 10) || 0;
        setInfosysCert(targetIdx);
      });
    });

    const albumInfosysData = infosysData.map((d) => ({
      src: d.src,
      caption: `${d.title} — ${d.tag} (Wingspan Verified)`
    }));

    const openInfosysTheater = () => {
      openLightbox(infosysData[currentInfosysIdx].src, albumInfosysData[currentInfosysIdx].caption, false, albumInfosysData, currentInfosysIdx, (newIdx) => {
        setInfosysCert(newIdx);
      });
    };

    if (mediaViewport) {
      mediaViewport.addEventListener('click', (e) => {
        if (!e.target.closest('.nptel-stage-nav')) {
          openInfosysTheater();
        }
      });
      mediaViewport.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openInfosysTheater();
        }
      });
    }

    if (zoomTrigger) {
      zoomTrigger.addEventListener('click', openInfosysTheater);
    }
  }

  /* --- Coursera Global Certifications Showcase (Google, Alberta, UTokyo) --- */
  const courseraStage = document.getElementById('coursera-showcase');
  if (courseraStage) {
    const slides = Array.from(courseraStage.querySelectorAll('.nptel-stage-slide'));
    const nameItems = Array.from(courseraStage.querySelectorAll('.coursera-name-item'));
    const prevBtn = courseraStage.querySelector('.coursera-stage-prev');
    const nextBtn = courseraStage.querySelector('.coursera-stage-next');
    const indexCounter = document.getElementById('coursera-active-index');
    const featuredTag = document.getElementById('coursera-featured-tag');
    const featuredTitle = document.getElementById('coursera-featured-title');
    const featuredDesc = document.getElementById('coursera-featured-desc');
    const featuredScore = document.getElementById('coursera-featured-score');
    const mediaViewport = courseraStage.querySelector('.coursera-media');
    const zoomTrigger = document.getElementById('coursera-zoom-trigger');

    const courseraData = [
      {
        tag: 'GOOGLE • COURSERA',
        title: 'Crash Course on Python',
        desc: 'Completed on June 25, 2025. Foundational Python programming, data structures, scripting, OOP paradigms, and automation practices authorized by Google.',
        scoreText: 'Google Certified',
        isElite: true,
        src: 'assets/images/coursera-cert-google-python.jpg'
      },
      {
        tag: 'UNIVERSITY OF ALBERTA • COURSERA',
        title: 'Object-Oriented Design',
        desc: 'Completed on March 19, 2025. Advanced software design principles, UML modeling, design patterns, modular architecture, and code maintainability.',
        scoreText: 'Alberta Certified',
        isElite: true,
        src: 'assets/images/coursera-cert-alberta-ood.jpg'
      },
      {
        tag: 'THE UNIVERSITY OF TOKYO • COURSERA',
        title: 'Welcome to Game Theory',
        desc: 'Completed on March 22, 2025. Strategic decision-making models, Nash equilibria, simultaneous and sequential games, and economic behavioral dynamics.',
        scoreText: 'UTokyo Certified',
        isElite: true,
        src: 'assets/images/coursera-cert-utokyo-game-theory.jpg'
      }
    ];

    let currentCourseraIdx = 0;
    const totalCoursera = courseraData.length;

    const setCourseraCert = (newIndex) => {
      currentCourseraIdx = (newIndex + totalCoursera) % totalCoursera;
      const data = courseraData[currentCourseraIdx];

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentCourseraIdx);
      });

      nameItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentCourseraIdx);
      });

      if (indexCounter) indexCounter.textContent = currentCourseraIdx + 1;
      if (featuredTag) featuredTag.textContent = data.tag;
      if (featuredTitle) featuredTitle.textContent = data.title;
      if (featuredDesc) featuredDesc.innerHTML = data.desc;
      if (featuredScore) featuredScore.textContent = data.scoreText;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCourseraCert(currentCourseraIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCourseraCert(currentCourseraIdx + 1);
      });
    }

    nameItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(item.getAttribute('data-target-index'), 10) || 0;
        setCourseraCert(targetIdx);
      });
    });

    const albumCourseraData = courseraData.map((d) => ({
      src: d.src,
      caption: `${d.title} — ${d.tag} (Coursera Verified)`
    }));

    const openCourseraTheater = () => {
      openLightbox(courseraData[currentCourseraIdx].src, albumCourseraData[currentCourseraIdx].caption, false, albumCourseraData, currentCourseraIdx, (newIdx) => {
        setCourseraCert(newIdx);
      });
    };

    if (mediaViewport) {
      mediaViewport.addEventListener('click', (e) => {
        if (!e.target.closest('.nptel-stage-nav')) {
          openCourseraTheater();
        }
      });
      mediaViewport.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCourseraTheater();
        }
      });
    }

    if (zoomTrigger) {
      zoomTrigger.addEventListener('click', openCourseraTheater);
    }
  }

  /* --- Technical Symposia & Competitions Showcase (PSG Tech & Karpagam) --- */
  const symposiumStage = document.getElementById('symposium-showcase');
  if (symposiumStage) {
    const slides = Array.from(symposiumStage.querySelectorAll('.nptel-stage-slide'));
    const nameItems = Array.from(symposiumStage.querySelectorAll('.symposium-name-item'));
    const prevBtn = symposiumStage.querySelector('.symposium-stage-prev');
    const nextBtn = symposiumStage.querySelector('.symposium-stage-next');
    const indexCounter = document.getElementById('symposium-active-index');
    const featuredTag = document.getElementById('symposium-featured-tag');
    const featuredTitle = document.getElementById('symposium-featured-title');
    const featuredDesc = document.getElementById('symposium-featured-desc');
    const featuredScore = document.getElementById('symposium-featured-score');
    const mediaViewport = symposiumStage.querySelector('.symposium-media');
    const zoomTrigger = document.getElementById('symposium-zoom-trigger');

    const symposiumData = [
      {
        tag: 'PSG TECH • KRIYA 2026',
        title: 'Green Aviation & Smart Aerospace',
        desc: 'Presented technical research paper on "Green Aviation &amp; Smart Aerospace Technologies" at KRIYA 2026, the Global Clash of Techno Talents at PSG College of Technology (March 13–15, 2026). Awarded to Nandhini S, Sri Krishna College of Technology.',
        scoreText: 'Paper Presentation',
        isElite: true,
        src: 'assets/images/symposium-cert-psg-kriya-aviation.jpg'
      },
      {
        tag: 'KARPAGAM TECH • VARNAM\'26',
        title: 'Code Twins Technical Challenge',
        desc: 'Active participation in Code Twins, the competitive paired coding and algorithmic problem-solving challenge at VARNAM\'26 National Level Fest, Karpagam Institute of Technology (February 03–07, 2026).',
        scoreText: 'Code Twins • 2026',
        isElite: true,
        src: 'assets/images/symposium-cert-varnam-code-twins.jpg'
      },
      {
        tag: 'KARPAGAM TECH • VARNAM\'26',
        title: 'Mind Maze Technical Contest',
        desc: 'Active participation in Mind Maze, an analytical reasoning, logic, and rapid technical puzzle contest at VARNAM\'26 National Level Sports, Techno &amp; Cultural Fest, Karpagam Institute of Technology (February 03–07, 2026).',
        scoreText: 'Mind Maze • 2026',
        isElite: true,
        src: 'assets/images/symposium-cert-varnam-mind-maze.jpg'
      },
      {
        tag: 'KARPAGAM TECH • VARNAM\'26',
        title: 'MERN - Full Stack Development',
        desc: 'Participated in the MERN Full Stack Development technical session covering MongoDB, Express.js, React, and Node.js architecture at VARNAM\'26 National Level Fest, Karpagam Institute of Technology (February 03–07, 2026).',
        scoreText: 'MERN Stack • 2026',
        isElite: true,
        src: 'assets/images/symposium-cert-varnam-mern-stack.jpg'
      }
    ];

    let currentSymposiumIdx = 0;
    const totalSymposium = symposiumData.length;

    const setSymposiumCert = (newIndex) => {
      currentSymposiumIdx = (newIndex + totalSymposium) % totalSymposium;
      const data = symposiumData[currentSymposiumIdx];

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSymposiumIdx);
      });

      nameItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentSymposiumIdx);
      });

      if (indexCounter) indexCounter.textContent = currentSymposiumIdx + 1;
      if (featuredTag) featuredTag.textContent = data.tag;
      if (featuredTitle) featuredTitle.textContent = data.title;
      if (featuredDesc) featuredDesc.innerHTML = data.desc;
      if (featuredScore) featuredScore.textContent = data.scoreText;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSymposiumCert(currentSymposiumIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSymposiumCert(currentSymposiumIdx + 1);
      });
    }

    nameItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(item.getAttribute('data-target-index'), 10) || 0;
        setSymposiumCert(targetIdx);
      });
    });

    const albumSymposiumData = symposiumData.map((d) => ({
      src: d.src,
      caption: `${d.title} — ${d.tag} (National Credential)`
    }));

    const openSymposiumTheater = () => {
      openLightbox(symposiumData[currentSymposiumIdx].src, albumSymposiumData[currentSymposiumIdx].caption, false, albumSymposiumData, currentSymposiumIdx, (newIdx) => {
        setSymposiumCert(newIdx);
      });
    };

    if (mediaViewport) {
      mediaViewport.addEventListener('click', (e) => {
        if (!e.target.closest('.nptel-stage-nav')) {
          openSymposiumTheater();
        }
      });
      mediaViewport.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openSymposiumTheater();
        }
      });
    }

    if (zoomTrigger) {
      zoomTrigger.addEventListener('click', openSymposiumTheater);
    }
  }

  /* --- Cloud & Networking Showcase (AWS Cloud Practitioner & Cisco Networking) --- */
  const cloudStage = document.getElementById('cloud-showcase');
  if (cloudStage) {
    const slides = Array.from(cloudStage.querySelectorAll('.nptel-stage-slide'));
    const nameItems = Array.from(cloudStage.querySelectorAll('.cloud-name-item'));
    const prevBtn = cloudStage.querySelector('.cloud-stage-prev');
    const nextBtn = cloudStage.querySelector('.cloud-stage-next');
    const indexCounter = document.getElementById('cloud-active-index');
    const featuredTag = document.getElementById('cloud-featured-tag');
    const featuredTitle = document.getElementById('cloud-featured-title');
    const featuredDesc = document.getElementById('cloud-featured-desc');
    const featuredScore = document.getElementById('cloud-featured-score');
    const mediaViewport = cloudStage.querySelector('.cloud-media');
    const zoomTrigger = document.getElementById('cloud-zoom-trigger');

    const cloudData = [
      {
        tag: 'AWS • TRAINING & CERTIFICATION',
        title: 'AWS Cloud Practitioner Essentials',
        desc: 'Completed on July 28, 2026. Foundational mastery of AWS Cloud concepts, security, architecture, pricing, compute, storage, and networking services. Awarded to Nandhini S by Michelle Vaz, Director, AWS Training & Certification.',
        scoreText: 'AWS Certified • 2026',
        isElite: true,
        src: 'assets/images/cert-aws-cloud-practitioner-essentials.png'
      },
      {
        tag: 'QA • CERTIFICATE OF ACHIEVEMENT',
        title: 'Fundamentals of AWS',
        desc: 'Completed comprehensive 20h 28m of intensive training in Fundamentals of AWS on September 13, 2026. Certified by Josh Hubbert, Chief Executive Officer, QA (Certificate: 22882680). Awarded to Nandhini Sowndhirarajan.',
        scoreText: 'QA Certified • 20h 28m',
        isElite: true,
        src: 'assets/images/cert-qa-fundamentals-of-aws.png'
      },
      {
        tag: 'CISCO • NETWORKING ACADEMY',
        title: 'Networking Basics',
        desc: 'Completed on June 17, 2026. Foundational networking principles, IPv4/IPv6 addressing, subnetting, network protocols, OSI model, and routing basics. Certified by Lynn Bloomer, Director, Cisco Networking Academy (Cert ID: f729d5ff-be12-4f05-8df2-2420d291d362).',
        scoreText: 'Cisco Verified • 2026',
        isElite: true,
        src: 'assets/images/cert-cisco-networking-basics.jpg'
      }
    ];

    let currentCloudIdx = 0;
    const totalCloud = cloudData.length;

    const setCloudCert = (newIndex) => {
      currentCloudIdx = (newIndex + totalCloud) % totalCloud;
      const data = cloudData[currentCloudIdx];

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentCloudIdx);
      });

      nameItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentCloudIdx);
      });

      if (indexCounter) indexCounter.textContent = currentCloudIdx + 1;
      if (featuredTag) featuredTag.textContent = data.tag;
      if (featuredTitle) featuredTitle.textContent = data.title;
      if (featuredDesc) featuredDesc.innerHTML = data.desc;
      if (featuredScore) featuredScore.textContent = data.scoreText;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCloudCert(currentCloudIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCloudCert(currentCloudIdx + 1);
      });
    }

    nameItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(item.getAttribute('data-target-index'), 10) || 0;
        setCloudCert(targetIdx);
      });
    });

    const albumCloudData = cloudData.map((d) => ({
      src: d.src,
      caption: `${d.title} — ${d.tag}`
    }));

    const openCloudTheater = () => {
      openLightbox(cloudData[currentCloudIdx].src, albumCloudData[currentCloudIdx].caption, false, albumCloudData, currentCloudIdx, (newIdx) => {
        setCloudCert(newIdx);
      });
    };

    if (mediaViewport) {
      mediaViewport.addEventListener('click', (e) => {
        if (!e.target.closest('.nptel-stage-nav')) {
          openCloudTheater();
        }
      });
      mediaViewport.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCloudTheater();
        }
      });
    }

    if (zoomTrigger) {
      zoomTrigger.addEventListener('click', openCloudTheater);
    }
  }

  /* --- Industry Internships Showcase (Skylena AI/ML, Thiranex Full Stack, Knite Infotech) --- */
  const internshipStage = document.getElementById('internship-showcase');
  if (internshipStage) {
    const slides = Array.from(internshipStage.querySelectorAll('.nptel-stage-slide'));
    const nameItems = Array.from(internshipStage.querySelectorAll('.internship-name-item'));
    const prevBtn = internshipStage.querySelector('.internship-stage-prev');
    const nextBtn = internshipStage.querySelector('.internship-stage-next');
    const indexCounter = document.getElementById('internship-active-index');
    const featuredTag = document.getElementById('internship-featured-tag');
    const featuredTitle = document.getElementById('internship-featured-title');
    const featuredDesc = document.getElementById('internship-featured-desc');
    const featuredScore = document.getElementById('internship-featured-score');
    const mediaViewport = internshipStage.querySelector('.internship-media');
    const zoomTrigger = document.getElementById('internship-zoom-trigger');

    const internshipData = [
      {
        tag: 'SKYLENA INFO TECHNOLOGY • AI & ML',
        title: 'AI & Machine Learning Internship',
        desc: 'Completed 30-day intensive industry internship in Artificial Intelligence and Machine Learning covering data preprocessing, model training, visualization, Python libraries, and AI application development for real-world problem-solving. Awarded to Nandhini S (Reg: 727824TUIT134, SKCT) by Ram Kumar Thangavel, Senior Principal Engineer.',
        scoreText: '30-Day Internship • Skylena',
        isElite: true,
        src: 'assets/images/internship-cert-skylena-aiml.jpg'
      },
      {
        tag: 'THIRANEX • MSME RECOGNIZED',
        title: 'Full Stack Development Internship',
        desc: 'Successfully completed full-time industry internship in Full Stack Development from June 09 to July 08, 2026. Practical experience in modern web architecture, REST APIs, and production application delivery. Certified by Hariharan M, Founder & CEO (ID: THX-JUN0926-1039).',
        scoreText: 'Full Stack • Thiranex',
        isElite: true,
        src: 'assets/images/internship-cert-thiranex-fullstack.jpg'
      },
      {
        tag: 'KNITE INFOTECH • VIRTUAL INTERNSHIP',
        title: 'Full Stack Virtual Internship',
        desc: 'Completed hands-on Full Stack Development Virtual Internship from June 17, 2026 to July 17, 2026 at Knite Infotech. Practical exposure to modern web stack engineering, frontend integration, and backend services. Certified by Krish N Kumaresh, CEO.',
        scoreText: 'Virtual Internship • Knite',
        isElite: true,
        src: 'assets/images/internship-cert-knite-infotech.jpg'
      }
    ];

    let currentInternshipIdx = 0;
    const totalInternship = internshipData.length;

    const setInternshipCert = (newIndex) => {
      currentInternshipIdx = (newIndex + totalInternship) % totalInternship;
      const data = internshipData[currentInternshipIdx];

      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentInternshipIdx);
      });

      nameItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === currentInternshipIdx);
      });

      if (indexCounter) indexCounter.textContent = currentInternshipIdx + 1;
      if (featuredTag) featuredTag.textContent = data.tag;
      if (featuredTitle) featuredTitle.textContent = data.title;
      if (featuredDesc) featuredDesc.innerHTML = data.desc;
      if (featuredScore) featuredScore.textContent = data.scoreText;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInternshipCert(currentInternshipIdx - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInternshipCert(currentInternshipIdx + 1);
      });
    }

    nameItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(item.getAttribute('data-target-index'), 10) || 0;
        setInternshipCert(targetIdx);
      });
    });

    const albumInternshipData = internshipData.map((d) => ({
      src: d.src,
      caption: `${d.title} — ${d.tag}`
    }));

    const openInternshipTheater = () => {
      openLightbox(internshipData[currentInternshipIdx].src, albumInternshipData[currentInternshipIdx].caption, false, albumInternshipData, currentInternshipIdx, (newIdx) => {
        setInternshipCert(newIdx);
      });
    };

    if (mediaViewport) {
      mediaViewport.addEventListener('click', (e) => {
        if (!e.target.closest('.nptel-stage-nav')) {
          openInternshipTheater();
        }
      });
      mediaViewport.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openInternshipTheater();
        }
      });
    }

    if (zoomTrigger) {
      zoomTrigger.addEventListener('click', openInternshipTheater);
    }
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (lightboxModal && !lightboxModal.hasAttribute('hidden')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateAlbum(-1);
      } else if (e.key === 'ArrowRight') {
        navigateAlbum(1);
      }
    }
  });

  /* --- 6b. Resume Theater Mode Lightbox --- */
  const resumeImgTrigger = document.getElementById('resume-img-trigger');
  const resumeFullscreenBtn = document.getElementById('resume-fullscreen-btn');
  const openResumeTheater = () => {
    openLightbox(
      'assets/images/nandhini-resume.jpg',
      'Nandhini S — Official Resume (Curriculum Vitae)',
      false
    );
  };
  if (resumeImgTrigger) {
    resumeImgTrigger.addEventListener('click', openResumeTheater);
    resumeImgTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openResumeTheater();
      }
    });
  }
  if (resumeFullscreenBtn) {
    resumeFullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openResumeTheater();
    });
  }

  /* --- 7. Back-to-Top Button --- */
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --- 8. Contact Form Validation --- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const formNotice = document.getElementById('form-notice-box');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateInput = (input, errorEl, validCondition, errorMsg) => {
    if (!validCondition(input.value.trim())) {
      input.classList.add('invalid');
      if (errorEl) errorEl.textContent = errorMsg;
      return false;
    } else {
      input.classList.remove('invalid');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  };

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('invalid')) {
        validateInput(nameInput, nameError, (v) => v.length >= 2, 'Please enter at least 2 characters.');
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('invalid')) {
        validateInput(emailInput, emailError, (v) => emailRegex.test(v), 'Please enter a valid email address.');
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      if (messageInput.classList.contains('invalid')) {
        validateInput(messageInput, messageError, (v) => v.length >= 10, 'Message must be at least 10 characters.');
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const validName = validateInput(
        nameInput,
        nameError,
        (v) => v.length >= 2,
        'Please enter your name (at least 2 characters).'
      );
      const validEmail = validateInput(
        emailInput,
        emailError,
        (v) => emailRegex.test(v),
        'Please enter a valid email address.'
      );
      const validMessage = validateInput(
        messageInput,
        messageError,
        (v) => v.length >= 10,
        'Please provide a message of at least 10 characters.'
      );

      if (validName && validEmail && validMessage) {
        // Honest validation notice:
        // Do not pretend an email was sent without a backend service configured.
        if (formNotice) {
          formNotice.removeAttribute('hidden');
          formNotice.innerHTML = `
            <strong>Form validated successfully!</strong><br>
            <em>Note: Direct form submission requires a backend service (e.g. EmailJS / Formspree). In the meantime, please connect directly via email (<a href="mailto:shreenandhini1357@gmail.com" style="color:#00c8ff;text-decoration:underline;">shreenandhini1357@gmail.com</a>) or LinkedIn.</em>
          `;
          formNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
      }
    });
  }

  /* --- 8b. Contact Form Drawer Toggle --- */
  const drawerToggle = document.getElementById('contact-drawer-toggle');
  const formDrawer = document.getElementById('contact-form-drawer');
  if (drawerToggle && formDrawer) {
    drawerToggle.addEventListener('click', () => {
      const isHidden = formDrawer.hasAttribute('hidden');
      if (isHidden) {
        formDrawer.removeAttribute('hidden');
        drawerToggle.setAttribute('aria-expanded', 'true');
        const arrow = drawerToggle.querySelector('.drawer-arrow');
        if (arrow) arrow.innerHTML = '&#x25B2;';
        formDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        formDrawer.setAttribute('hidden', '');
        drawerToggle.setAttribute('aria-expanded', 'false');
        const arrow = drawerToggle.querySelector('.drawer-arrow');
        if (arrow) arrow.innerHTML = '&#x25BC;';
      }
    });
  }

  /* --- 9. Current Year in Footer --- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
