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

getNavJs();
getSmoothLinks();
