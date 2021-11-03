// import {getSlider} from './chief-slider.min.js';
// import {getSlider} from './chief-slider.js';

const getNavJs = function () {
  const pageBody = document.querySelector('.page-body');
  const navMain = pageBody.querySelector('.main-nav');
  const navList = navMain.querySelector('.main-nav__list');
  const navToggle = navMain.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--no-js');
  navMain.classList.add('main-nav--open');

  const getNavDefault = function () {
    if (navMain.classList.contains('main-nav--close')) {
      navMain.classList.remove('main-nav--close');
      navMain.classList.add('main-nav--open');
    }
  }

  navToggle.addEventListener('click', function() {
    if (!navMain.classList.contains('main-nav--close')) {
      navMain.classList.add('main-nav--close');
      navMain.classList.remove('main-nav--open');
    }
    else {
      getNavDefault();
    }
    pageBody.classList.toggle('page-body--no-scroll');
  });

  navList.addEventListener('click', function () {
    getNavDefault();
    pageBody.classList.toggle('page-body--no-scroll');
  });
}

const getSmoothLinks = function () {
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach(function (smoothLink) {
    smoothLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href');

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
};

const isSlider = function () {
  /* isSlider() - Слайдер работает только до 767px */
  if (window.matchMedia("screen and (max-width: 767px)").matches) {
    getSlider();
  }
};

// const getResize = function () {
// /* getResize() - При изменении ширины окна браузера в режиме DevTools после 767px убирает настройки Слайдера */
//   const tabletWidth = 768;

//   if (window.innerWidth >= tabletWidth) {

//     const lastWorksList = document.querySelector('.last-works__list');
//     const lastWorksItems = lastWorksList.querySelectorAll('.last-works__item');

//     const noTranslate = 'translateX(0px)';

//     lastWorksList.style.transform = noTranslate;
//     lastWorksItems.forEach((item) => {
//       item.style.transform = noTranslate;
//     });
//   }
// };

// window.addEventListener("resize", getResize);

getNavJs();
// isSlider();
// getSmoothLinks();
