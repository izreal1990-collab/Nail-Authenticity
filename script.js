const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

const filters = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.work-card');
filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const category = filter.dataset.filter;
    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxVideo = lightbox.querySelector('video');
const lightboxCaption = lightbox.querySelector('p');
const closeButton = lightbox.querySelector('.lightbox-close');
let lastFocusedCard;

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');
  lightboxVideo.load();
  lightboxVideo.hidden = true;
  lightboxImage.hidden = false;
  lightboxImage.src = '';
  if (lastFocusedCard) lastFocusedCard.focus();
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    lastFocusedCard = card;
    const videoSource = card.dataset.video;
    lightboxImage.hidden = Boolean(videoSource);
    lightboxVideo.hidden = !videoSource;
    if (videoSource) {
      lightboxVideo.src = videoSource;
      lightboxVideo.load();
      lightboxVideo.play().catch(() => {});
    } else {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute('src');
      lightboxVideo.load();
      lightboxImage.src = card.dataset.image;
      lightboxImage.alt = card.querySelector('img').alt;
    }
    lightboxCaption.textContent = card.dataset.title;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeButton.focus();
  });
});

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
});
