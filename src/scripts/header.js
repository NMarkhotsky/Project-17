(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
    body: document.querySelector('body'),
  };

  refs.openMenuBtn.addEventListener('click', toggleMenu);
  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    refs.body.classList.toggle('no-scroll');
  }
})();

let searchIcon = document.querySelector('.search__input__icon');
let searchInput = document.querySelector('.form__input');

searchIcon.addEventListener('click', () => {
  searchInput.classList.add('input__open');
  searchIcon.setAttribute('style', 'left: 12px');
});

document.querySelectorAll('.menu__link').forEach(n => {
  if (
    n.href === document.URL ||
    (n.href.substring(n.href.lastIndexOf('/')) === '/index.html' &&
      window.location.origin + '/' === document.URL)
  ) {
    n.classList.add('menu__link--current');
  }
});
