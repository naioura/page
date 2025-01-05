// app.js

// DOM Elements
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navList = document.getElementById('nav-list');

// Build Navigation Menu
function buildNav() {
  sections.forEach(section => {
    const navItem = document.createElement('li');
    navItem.innerHTML = `<a href="#${section.id}" class="nav-link">${section.dataset.nav}</a>`;
    navList.appendChild(navItem);
  });
}

// Highlight Active Section
function makeActive() {
  sections.forEach(section => {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150) {
      section.classList.add('active');
      document.querySelector(`a[href="#${section.id}"]`).classList.add('active');
    } else {
      section.classList.remove('active');
      document.querySelector(`a[href="#${section.id}"]`).classList.remove('active');
    }
  });
}

// Smooth Scrolling
function enableSmoothScroll() {
  navList.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A') {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1);
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

// Hide Navbar When Not Scrolling
function hideNavbarWhileNotScrolling() {
  let isScrolling;
  document.addEventListener('scroll', () => {
    navbar.style.display = 'block';
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      navbar.style.display = 'none';
    }, 2000);
  });
}

// Scroll-to-Top Button
function createScrollToTopButton() {
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.textContent = 'Top';
  scrollToTopButton.id = 'scrollToTop';
  scrollToTopButton.style.display = 'none';
  document.body.appendChild(scrollToTopButton);

  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });
}

// Initialize App
function init() {
  buildNav();
  enableSmoothScroll();
  document.addEventListener('scroll', makeActive);
  hideNavbarWhileNotScrolling();
  createScrollToTopButton();
}

init();
