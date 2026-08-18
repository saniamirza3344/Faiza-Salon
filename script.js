/* =========================================================
   AESTHETIC SALON BY FAIZA JABEEN — SCRIPT.JS
   Vanilla JS, no dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initServices();
  initGallery();
  initBeforeAfter();
  initTestimonials();
  initStats();
  initReveal();
  initBookingForm();
  initNewsletter();
  initBackToTop();
});

/* ---------------------------------------------------------
   1. NAVBAR: scroll state + mobile menu + smooth close
   --------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------
   2. SERVICES: data + tab filtering
   --------------------------------------------------------- */
const SERVICES = {
  hair: [
    { icon: '', name: 'Haircut & Styling', desc: 'Precision cuts tailored to your face shape.', price: 'Rs. 800', photo: 'images/service-hair-1.jpg' },
    { icon: '', name: 'Hair Wash & Blow Dry', desc: 'Refreshing wash with a smooth salon blow-out.', price: 'Rs. 500', photo: 'images/hair_washing.jpg' },
    { icon: '', name: 'Hair Color', desc: 'Full-head color in shades made for you.', price: 'Rs. 3,500', photo: 'images/hair_colore.jpg' },
    { icon: '', name: 'Highlights', desc: 'Dimension and glow with expert highlighting.', price: 'Rs. 4,000', photo: 'images/hairhightlight.jpg' },
    { icon: '', name: 'Balayage', desc: 'Hand-painted, sun-kissed color melt.', price: 'Rs. 6,000', photo: 'images/Balayage.jpg' },
    { icon: '', name: 'Hair Treatment', desc: 'Deep repair for damaged, dry hair.', price: 'Rs. 1500', photo: 'images/hair_tratment.jpg' },
    { icon: '', name: 'Keratin Treatment', desc: 'Smooth, frizz-free hair that lasts.', price: 'Rs. 7,500', photo: 'images/service-hair-2.jpg' },
    { icon: '', name: 'Hair Spa', desc: 'Nourishing spa ritual for scalp and strands.', price: 'Rs. 1,800', photo: 'images/Hair_Spa.jpg' },
    { icon: '', name: 'Bridal Hair Styling', desc: 'Elegant styling for your big day.', price: 'Rs. 2000', photo: 'images/hairstyle.jpg' }
  ],
  makeup: [
    { icon: '', name: 'Party Makeup', desc: 'Glamorous looks for any celebration.', price: 'Rs. 3,000', photo: 'images/party_makup.jpg' },
    { icon: '', name: 'Bridal Makeup', desc: 'Flawless, long-lasting bridal artistry.', price: 'Rs. 12,000', photo: 'images/Nikkah_makeup_look.jpg' },
    { icon: '', name: 'Engagement Makeup', desc: 'Soft, radiant looks for your engagement.', price: 'Rs. 8,000', photo: 'images/angajment.jpg' },
    { icon: '', name: 'Soft Glam Makeup', desc: 'Natural glow with a subtle shimmer.', price: 'Rs. 2,800', photo: 'images/soft_gulabMakeup.jpg' },
    { icon: '', name: 'HD Makeup', desc: 'Camera-ready, high-definition finish.', price: 'Rs. 4,500', photo: 'images/hd_makeup.jpg' },
    { icon: '', name: 'Eye Makeup', desc: 'Defined, expressive eye looks.', price: 'Rs. 1,200', photo: 'images/eye_makup.jpg' },
    { icon: '', name: 'Makeup Consultation', desc: 'Personalized guidance for your best look.', price: 'Rs. 3000', photo: 'images/makeup_colaction.jpg' }
  ],
  skin: [
    { icon: '', name: 'Deep Cleansing Facial', desc: 'Purifies and refreshes tired skin.', price: 'Rs. 1,500', photo: 'images/deep_cleansing.jpg' },
    { icon: '', name: 'Glow Facial', desc: 'Instant radiance boost for any occasion.', price: 'Rs. 2,000', photo: 'images/glow_fesial.jpg' },
    { icon: '', name: 'Hydrafacial', desc: 'Deep hydration with a smooth, dewy finish.', price: 'Rs. 4,500', photo: 'images/Hydrafacial.jpg' },
    { icon: '', name: 'Anti-Aging Facial', desc: 'Firming care to reduce fine lines.', price: 'Rs. 3,500', photo: 'images/anti_agalfesial.jpg' },
    { icon: '', name: 'Acne Facial', desc: 'Gentle, targeted care for blemish-prone skin.', price: 'Rs. 2,200', photo: 'images/acne_facial.jpg' },
    { icon: '', name: 'Whitening Facial', desc: 'Brightens and evens out skin tone.', price: 'Rs. 2,500', photo: 'images/whitning_facial.jpg' },
    { icon: '', name: 'Face Cleanup', desc: 'Quick refresh for everyday glow.', price: 'Rs. 900', photo: 'images/face_cleanup.jpg' },
    { icon: '', name: 'Skin Polishing', desc: 'Smooths texture for a soft, even finish.', price: 'Rs. 1,800' }
  ],
  nails: [
    { icon: '', name: 'Manicure', desc: 'Classic care for healthy, tidy hands.', price: 'Rs. 800', photo: 'images/manicure.jpg' },
    { icon: '', name: 'Pedicure', desc: 'Relaxing foot care and polish.', price: 'Rs. 1,000', photo: 'images/pedicure.jpg' },   
    { icon: '', name: 'Gel Nails', desc: 'Chip-free, glossy long-wear color.', price: 'Rs. 1,800', photo: 'images/gul_nails.jpg' },
    { icon: '', name: 'Nail Art', desc: 'Custom designs to match your style.', price: 'Rs. 500+', photo: 'images/nail_art.jpg' },
    { icon: '', name: 'Nail Extensions', desc: 'Length and shape, done beautifully.', price: 'Rs. 2,500', photo: 'images/nail_extention.jpg' },
    { icon: '', name: 'French Tips', desc: 'Timeless, elegant classic finish.', price: 'Rs. 1,200', photo: 'images/french_tips.jpg' }
  ],
  grooming: [
    { icon: '', name: 'Eyebrow Threading', desc: 'Sharp, clean brow shaping.', price: 'Rs. 200', photo: 'images/eye_brows.jpg' },
    { icon: '', name: 'Upper Lip', desc: 'Quick and precise lip threading.', price: 'Rs. 100', photo: 'images/uper_lips.jpg' },
    { icon: '', name: 'Full Face Threading', desc: 'Complete facial hair removal.', price: 'Rs. 500', photo: 'images/full_face_threading.jpg' },
    { icon: '', name: 'Waxing', desc: 'Smooth skin, gentle technique.', price: 'Rs. 400', photo: 'images/waxing.jpg' },
    { icon: '', name: 'Full Arms Wax', desc: 'Silky-smooth arms in one session.', price: 'Rs. 900', photo: 'images/Arm_Waxing.jpg' },
    { icon: '', name: 'Full Legs Wax', desc: 'Complete leg waxing, done fast.', price: 'Rs. 1,200', photo: 'images/full_legs_waxing.jpg' },
    { icon: '', name: 'Underarms Wax', desc: 'Quick, gentle underarm care.', price: 'Rs. 300', photo: 'images/under_arm_wax.jpg' },
    { icon: '', name: 'Body Wax', desc: 'Full-body smoothing treatment.', price: 'Rs. 2,500', photo: 'images/body_wax.jpg' }
  ],
  bridal: [
    { icon: '', name: 'Bridal Makeup', desc: 'Signature bridal artistry, made to last.', price: 'Rs. 12,000', photo: 'images/service-bridal-1.jpg' },
    { icon: '', name: 'Bridal Hairstyling', desc: 'Elegant updos and styling for your day.', price: 'Rs. 5,000', photo: 'images/service-bridal-2.jpg' },
    { icon: '', name: 'Bridal Facial', desc: 'Pre-wedding glow preparation.', price: 'Rs. 4,000', photo: 'images/Bridal_Facials.jpg' },
    { icon: '', name: 'Bridal Nails', desc: 'Polished hands and feet for the big day.', price: 'Rs. 2,500', photo: 'images/bridal_nails.jpg' },
    { icon: '', name: 'Bridal Mehndi', desc: 'Intricate, traditional henna artistry.', price: 'Rs. 3,000', photo: 'images/bridal_mahndi.jpg' },
    { icon: '', name: 'Complete Bridal Package', desc: 'Everything included for a flawless day.', price: 'Rs. 25,000', photo: 'images/complete_bridle_pakg.jpg' }
  ]
};

/* Each service above carries its own matching "photo" (by filename) —
   only services with a photo show one; nothing cycles or repeats. */
function initServices() {
  const grid = document.getElementById('serviceGrid');
  const tabs = document.querySelectorAll('#serviceTabs .tab');

  const render = (category) => {
    grid.innerHTML = '';
    SERVICES[category].forEach((s, i) => {
      const card = document.createElement('article');
      card.className = 'service-card';
      card.style.animationDelay = `${i * 0.05}s`;
      const photo = s.photo || '';
      card.innerHTML = `
        ${photo ? `<div class="service-card__photo"><img src="${photo}" alt="${s.name}" loading="lazy"></div>` : ''}
        <span class="service-card__icon" aria-hidden="true">${s.icon}</span>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <div class="service-card__foot">
          <span class="service-card__price">${s.price}</span>
          <a href="#booking" class="service-card__book">Book Now →</a>
        </div>`;
      grid.appendChild(card);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      render(tab.dataset.target);
    });
  });

  render('hair');
}

/* ---------------------------------------------------------
   3. GALLERY: filter + lightbox
   --------------------------------------------------------- */
/* Each item's img: points to a local path inside the images/ folder.
   Put your own downloaded photo there with the exact matching name
/* Only items with a real photo on file are listed — no broken images,
   no duplicated photos reused from the Services grid. */
const GALLERY_ITEMS = [
  { cat: 'makeup', label: 'Bridal Makeup Look', icon: '', img: 'images/gallery-1.jpg' },
  { cat: 'hair', label: 'Balayage Color', icon: '', img: 'images/gallery-2.jpg' },
  { cat: 'bridal', label: 'Bridal Styling', icon: '', img: 'images/gallery-3.jpg' },
  { cat: 'salon', label: 'Salon Interior', icon: '', img: 'images/gallery-5.jpg' },
  { cat: 'hair', label: 'Keratin Finish', icon: '', img: 'images/gallery-7.jpg' },
  { cat: 'hair', label: 'Hair Spa Ritual', icon: '', img: 'images/gallery-11.jpg' }
];

let currentLightboxIndex = 0;

function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const tabs = document.querySelectorAll('#galleryTabs .tab');

  GALLERY_ITEMS.forEach((item, i) => {
    const el = document.createElement('figure');
    el.className = 'gallery-item';
    el.dataset.cat = item.cat;
    el.dataset.index = i;
    el.innerHTML = `
      <div class="img-placeholder has-img" data-label="Replace with images/gallery-${i + 1}.jpg">
        <span class="ph-icon">${item.icon}</span>
        <img src="${item.img}" alt="${item.label}" loading="lazy">
      </div>
      <figcaption class="gallery-item__overlay">
        <span class="gallery-item__cat">${item.cat}</span>
        <span class="gallery-item__view">${item.label}</span>
      </figcaption>`;
    el.addEventListener('click', () => openLightbox(i));
    grid.appendChild(el);
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const filter = tab.dataset.filter;
      grid.querySelectorAll('.gallery-item').forEach((item) => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  // Lightbox controls
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
  document.getElementById('lightboxPrev').addEventListener('click', () => stepLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => stepLightbox(1));
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  renderLightbox();
  const lb = document.getElementById('lightbox');
  lb.classList.add('is-open');
  lb.setAttribute('aria-hidden', 'false');
}

function stepLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  renderLightbox();
}

function renderLightbox() {
  const item = GALLERY_ITEMS[currentLightboxIndex];
  document.getElementById('lightboxContent').innerHTML = `
    <div class="img-placeholder has-img" data-label="images/gallery-${currentLightboxIndex + 1}.jpg">
      <span class="ph-icon">${item.icon}</span>
      <img src="${item.img}" alt="${item.label}">
    </div>`;
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('is-open');
  lb.setAttribute('aria-hidden', 'true');
}

/* ---------------------------------------------------------
   4. BEFORE / AFTER SLIDER
   --------------------------------------------------------- */
const TRANSFORMATIONS = [
  { title: 'Hair Transformation', beforeIcon: '', afterIcon: '', beforeImg: 'images/before-1.jpg', afterImg: 'images/after-1.jpg' },
  { title: 'Makeup Transformation', beforeIcon: '', afterIcon: '', beforeImg: 'images/before-2.jpg', afterImg: 'images/after-2.jpg' },
  { title: 'Bridal Transformation', beforeIcon: '', afterIcon: '', beforeImg: 'images/before-3.jpg', afterImg: 'images/after-3.jpg' }
];

function initBeforeAfter() {
  const grid = document.getElementById('baGrid');
  TRANSFORMATIONS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'ba-card';
    card.innerHTML = `
      <div class="ba-slider">
        <span class="ba-tag ba-tag--before">Before</span>
        <span class="ba-tag ba-tag--after">After</span>
        <div class="img-placeholder ba-before has-img" data-label="images/before-${i + 1}.jpg">
          <span class="ph-icon">${t.beforeIcon}</span>
          <img src="${t.beforeImg}" alt="${t.title} — before">
        </div>
        <div class="img-placeholder ba-after has-img" data-label="images/after-${i + 1}.jpg">
          <span class="ph-icon">${t.afterIcon}</span>
          <img src="${t.afterImg}" alt="${t.title} — after">
        </div>
        <div class="ba-handle"></div>
        <input type="range" min="0" max="100" value="50" aria-label="Compare before and after: ${t.title}">
      </div>
      <div class="ba-label">${t.title}</div>`;
    grid.appendChild(card);

    const range = card.querySelector('input[type="range"]');
    const after = card.querySelector('.ba-after');
    const handle = card.querySelector('.ba-handle');
    range.addEventListener('input', () => {
      after.style.clipPath = `inset(0 0 0 ${range.value}%)`;
      handle.style.left = `${range.value}%`;
    });
  });
}

/* ---------------------------------------------------------
   5. TESTIMONIALS SLIDER (auto-advancing)
   --------------------------------------------------------- */
const TESTIMONIALS = [
  { text: 'Absolutely loved my makeup and hairstyling. The team was so professional and welcoming.', name: 'Ayesha' },
  { text: 'The bridal package was beautiful. Everything from makeup to hair styling was perfect.', name: 'Hira' },
  { text: 'Such a relaxing salon experience. I loved the facial and overall service.', name: 'Sana' },
  { text: 'Best salon in town for nails and threading — always consistent, always gentle.', name: 'Mahnoor' }
];

function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  let current = 0;

  TESTIMONIALS.forEach((t) => {
    const slide = document.createElement('div');
    slide.className = 'testimonial-card';
    slide.innerHTML = `
      <div class="testimonial-card__stars" aria-hidden="true">★★★★★</div>
      <p>&ldquo;${t.text}&rdquo;</p>
      <div class="testimonial-card__name">— ${t.name}</div>`;
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Show testimonial from ${t.name}`);
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('button');

  const goTo = (index) => {
    current = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  goTo(0);

  let autoplay = setInterval(() => goTo(current + 1), 5000);
  const slider = document.getElementById('testimonialSlider');
  slider.addEventListener('mouseenter', () => clearInterval(autoplay));
  slider.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 5000);
  });
}

/* ---------------------------------------------------------
   6. STAT COUNTERS
   --------------------------------------------------------- */
function initStats() {
  const stats = document.querySelectorAll('.stat__num');
  if (!stats.length) return;

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  stats.forEach((s) => observer.observe(s));
}

/* ---------------------------------------------------------
   7. SCROLL REVEAL (IntersectionObserver)
   --------------------------------------------------------- */
function initReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-fade');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((t) => observer.observe(t));
}

/* ---------------------------------------------------------
   8. BOOKING FORM VALIDATION
   --------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  const validators = {
    fullName: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    phone: (v) => /^[0-9+\-\s]{7,15}$/.test(v.trim()) || 'Please enter a valid phone number.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    service: (v) => v !== '' || 'Please select a service.',
    date: (v) => v !== '' || 'Please choose a date.',
    time: (v) => v !== '' || 'Please choose a time.'
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(validators).forEach((name) => {
      const input = form.elements[name];
      const field = input.closest('.field');
      const errorEl = field.querySelector('.field__error');
      const result = validators[name](input.value);

      if (result !== true) {
        isValid = false;
        field.classList.add('has-error');
        errorEl.textContent = result;
      } else {
        field.classList.remove('has-error');
        errorEl.textContent = '';
      }
    });

    if (!isValid) {
      success.textContent = '';
      return;
    }

    success.textContent = 'Thank you! Your appointment request has been received.';
    form.reset();
    setTimeout(() => { success.textContent = ''; }, 6000);
  });
}

/* ---------------------------------------------------------
   9. NEWSLETTER FORM
   --------------------------------------------------------- */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const success = document.getElementById('newsletterSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.textContent = "You're subscribed! Watch your inbox for beauty tips and offers.";
    form.reset();
    setTimeout(() => { success.textContent = ''; }, 6000);
  });
}

/* ---------------------------------------------------------
   10. BACK TO TOP
   --------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
