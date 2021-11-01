// import {getSlider} from './chief-slider.min.js';
import {getSlider} from './chief-slider.js';

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

const getLastWorksPopap = function () {
  const lastWorksList = document.querySelector('.last-works__list');
  const lastWorksItems = lastWorksList.querySelectorAll('.last-works__item');

  lastWorksItems.forEach((item) => {
    item.addEventListener('click', function () {

      this.childNodes.forEach ((item) => {
        let childOfLi = item;
        if (childOfLi.className == 'last-works__popap') {
          const poPap = childOfLi;
          poPap.classList.add('last-works__popap--show');

          window.addEventListener('keydown', function(evt) {
            if(evt.keyCode === 27 && poPap.classList.contains('last-works__popap--show')) {
            evt.preventDefault();
            poPap.classList.remove('last-works__popap--show');
            }
          });

          const buttonClosePopap = poPap.querySelector('.last-works__popap-close');
          buttonClosePopap.addEventListener ('click', function (evt) {
            evt.stopPropagation();
            if (poPap.classList.contains('last-works__popap--show')) {
              poPap.classList.remove('last-works__popap--show');
            }
          })
        }
      })

        // const buttonClosePopap = childOfLi.querySelector('.last-works__popap-close');buttonClosePopap.addEventListener ('click', function () {
        //   console.log(childOfLi);
        //   childOfLi.classList.remove('last-works__popap--show');
        //   console.log(childOfLi);
        // })
    })
  })
};

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

/* isSlider() - Слайдер работает только до 767px */
const isSlider = function () {
  if (window.matchMedia("screen and (max-width: 767px)").matches) {
    getSlider();
  }
};

/* getResize() - При изменении ширины окна браузера в режиме DevTools после 767px убирает настройки Слайдера */
const getResize = function () {
  const tabletWidth = 768;

  if (window.innerWidth >= tabletWidth) {

    const lastWorksList = document.querySelector('.last-works__list');
    const lastWorksItems = lastWorksList.querySelectorAll('.last-works__item');

    const noTranslate = 'translateX(0px)';

    lastWorksList.style.transform = noTranslate;
    lastWorksItems.forEach((item) => {
      item.style.transform = noTranslate;
    });
  }
};

window.addEventListener("resize", getResize);

getNavJs();
isSlider();
getSmoothLinks();
// getLastWorksPopap();

