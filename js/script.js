const tabs = document.querySelector('.tabs');
const navTabsLink = tabs.querySelectorAll('.nav-tabs__link');
const listTabsItems = tabs.querySelectorAll('.list-tabs__item');
const catalogList = document.querySelector('.catalog__list');
const catalogLinks = catalogList.querySelectorAll('.catalog__link');

const mainNavJs = function () {
  const mainHeader = document.querySelector('.main-header');
  const navMain = mainHeader.querySelector('.main-nav');
  const navToggle = mainHeader.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--no-js');
  navMain.classList.add('main-nav--open');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--close')) {
      navMain.classList.remove('main-nav--close');
      navMain.classList.add('main-nav--open');
    } else {
      navMain.classList.add('main-nav--close');
      navMain.classList.remove('main-nav--open');
    }
  });
}

const tabsJs = function () {
  listTabsItems.forEach((item) => {
    if (!item.classList.contains('list-tabs__item--show')) {
      item.classList.add('list-tabs__item--closed');
    }
  });
}

const getTabsFunction = function (iterator) {
  for (let j = 0; j < navTabsLink.length; j++) {
    navTabsLink[j].classList.remove('nav-tabs__link--active');
    if (listTabsItems[j].classList.contains('list-tabs__item--show')) {
      listTabsItems[j].classList.remove('list-tabs__item--show');
      listTabsItems[j].classList.add('list-tabs__item--closed');
    }
  }
  navTabsLink[iterator].classList.add('nav-tabs__link--active');
  listTabsItems[iterator].classList.remove('list-tabs__item--closed');
  listTabsItems[iterator].classList.add('list-tabs__item--show');
}

const getActiveTab = function () {
  for (let i = 0; i < navTabsLink.length; i++) {
    navTabsLink[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      getTabsFunction(i);
    });
  }
}

const getCatalogLink = function () {
  for (let i = 0; i < catalogLinks.length; i++) {
    catalogLinks[i].addEventListener('click', function () {
      getTabsFunction(i);
    });
  }
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

const getSuccess = function () {
  const successPopap = document.querySelector('.modal-success');
  const successClose = successPopap.querySelector('.modal__close');

  successPopap.classList.add('modal--show');

  successClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    successPopap.classList.remove('modal--show');
  });

  window.addEventListener('keydown', function(evt) {
    if(evt.keyCode === 27 && successPopap.classList.contains('modal--show')) {
        evt.preventDefault();
        successPopap.classList.remove('modal--show');
    }
  });
}

const getModal = function() {
  const buySection = document.querySelector('.tabs-section');
  const buyPopap = document.querySelector('.modal-buy');
  const buyClose = buyPopap.querySelector('.modal__close');
  const buyTel = buyPopap.querySelector('.modal-buy__input--tel');
  const buyEmail = buyPopap.querySelector('.modal-buy__input--email');
  const buyForm = buyPopap.querySelector('.modal-buy__form');

  let isStorageSupport = true;
  let storageTel = '';
  let storageEmail = '';

  try {
    storageTel = localStorage.getItem('tel');
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  buySection.addEventListener('click', function(evt) {
      let target = evt.target.className;
      if (target.match('tabs-section__buy')) {
        evt.preventDefault();
        buyPopap.classList.add('modal--show');
        if(storageTel) {
          buyTel.value = storageTel;
          buyTel.focus();
        }
        else {
          buyTel.focus();
        }
        if(storageEmail) {
          buyEmail.value = storageEmail;
        }
      }
  });

  buyForm.addEventListener('submit', function(evt) {
    if (!buyTel.value || !buyEmail.value) {
      evt.preventDefault();
      buyPopap.classList.remove('modal--error');
      buyPopap.offsetWidth = buyPopap.offsetWidth;
      buyPopap.classList.add('modal--error');
      console.log('1');
    }
    else if(isStorageSupport) {
      localStorage.setItem('tel', buyTel.value);
      localStorage.setItem('email', buyEmail.value);
      getSuccess();
      console.log('2');
    }
    else if (buyTel.value && buyEmail.value) {
      getSuccess();
      console.log('3');
    }
  });

  buyClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    buyPopap.classList.remove('modal--show');
    buyPopap.classList.remove('modal--error');
  });

  window.addEventListener('keydown', function(evt) {
    if(evt.keyCode === 27 && buyPopap.classList.contains('modal--show')) {
        evt.preventDefault();
        buyPopap.classList.remove('modal--show');
        buyPopap.classList.remove('modal--error');
    }
  });
};

const writeUs = function () {
  const writeUsForm = document.querySelector('.write-us__form');
  const writeUsTel = writeUsForm.querySelector('.form__input--phone');
  const writeUsEmail = writeUsForm.querySelector('.form__input--email');
  const writeUsPopap = document.querySelector('.modal-success');
  const writeUsClose = writeUsPopap.querySelector('.modal__close');


  // let isStorageSupport = true;
  // let storageTel = '';
  // let storageEmail = '';

  // try {
  //   storageTel = localStorage.getItem('tel');
  //   storageEmail = localStorage.getItem('email');
  // } catch (err) {
  //   isStorageSupport = false;
  // }

  // if (storageTel) {
  //   writeUsTel.value = storageTel;
  //   writeUsTel.focus();
  // }
  // else {
  //   writeUsTel.focus();
  // }
  // if (storageEmail) {
  //   writeUsEmail.value = storageEmail;
  // }

  writeUsForm.addEventListener('submit', function(evt) {
    if(!writeUsTel.value || !writeUsEmail.value) {
      evt.preventDefault();
      writeUsForm.classList.remove('modal--error');
      writeUsForm.offsetWidth = writeUsForm.offsetWidth;
      writeUsForm.classList.add('modal--error');
    }
    else {
      // localStorage.setItem('login', writeUsTel.value);
      // localStorage.setItem('email', writeUsEmail.value);
      writeUsPopap.classList.add('modal--show');
    }
    // else {
    //   writeUsPopap.classList.add('modal--show');
    // }
  });

  writeUsClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    writeUsPopap.classList.remove('modal--show');
    writeUsPopap.classList.remove('modal--error');
  });

  window.addEventListener('keydown', function(evt) {
    if(evt.keyCode === 27 && writeUsPopap.classList.contains('modal--show')) {
        evt.preventDefault();
        writeUsPopap.classList.remove('modal--show');
        writeUsPopap.classList.remove('modal--error');
    }
  });
}

// mainNavJs();
// tabsJs();
// getActiveTab();
// getCatalogLink();
// getSmoothLinks();
// getModal();
// writeUs();
