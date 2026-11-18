// Category 
const categoryButton = document.querySelector('.nav-categories');
const category = document.querySelector('#categories');

if (categoryButton && category) {
  categoryButton.addEventListener('click', () => {
    category.classList.toggle('open');
  });
}
// Hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Search button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const noResultsMsg = document.getElementById('noResultsMsg');
let totalVisible = 0;

function filterMovies() {
  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  totalVisible = 0;

  document.querySelectorAll('.section').forEach((section) => {
    const cards = section.querySelectorAll('.movie-card');
    let visibleInSection = 0;

    cards.forEach((card) => {
      const title = card.querySelector('h3')
      const searchableText = (title?.textContent || '').toLowerCase();
      const isMatch = searchableText.includes(query);
      card.style.display = isMatch ? '' : 'none';
      if (isMatch) {
        visibleInSection++;
        totalVisible++;
      }
    });

    if (cards.length > 0) {
      section.style.display = visibleInSection > 0 ? '' : 'none';
    }
  });

  // Hides the hero banner while searching
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.style.display = query !== '' ? 'none' : '';
  }

  if (noResultsMsg) {
    noResultsMsg.style.display = totalVisible === 0 && query !== '' ? 'block' : 'none';
  }
}
// Shows the "no results" message only if there's an active search and nothing match
if (searchInput) {
  searchInput.addEventListener('input', filterMovies);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });
}

if (searchButton) {
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    filterMovies();
  });
}

// Hero section slider

const heroSlides = [
  {bgUrl: "assets/imagehorror/colony.png" },
  {bgUrl: "assets/imageJuly/Spider.jpg"},
  {bgUrl: "assets/imageJuly/Obsession.jpg"},
  {bgUrl: "assets/imageJuly/supergirl.avif" },
  {bgUrl: "assets/imageJuly/minion.jpg"},
];

let currentSlideIndex = 0;
const heroBg = document.getElementById('heroBg');

function changeHeroSlide() {
  if (!heroBg) return;

  heroBg.classList.add('fade-out');

  setTimeout(() => {
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    const slide = heroSlides[currentSlideIndex];
    heroBg.style.backgroundImage = `url('${slide.bgUrl}')`;
    heroBg.classList.remove('fade-out');
  }, 800);
}

setInterval(changeHeroSlide, 5000);