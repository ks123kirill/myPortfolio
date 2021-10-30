(function () {
    if (typeof window.CustomEvent === "function") return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    window.CustomEvent = CustomEvent;
})();

$modal = function (options) {
    var
        _elemModal,
        _eventShowModal,
        _eventHideModal,
        _hiding = false,
        _destroyed = false,
        _animationSpeed = 200;

    function _createModal(options) {
        var
            elemModal = document.createElement('div'),
            modalTemplate = '<div class="modal__backdrop" data-dismiss="modal"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">×</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>',
            modalFooterTemplate = '<div class="modal__footer">{{buttons}}</div>',
            modalButtonTemplate = '<button type="button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>',
            modalHTML,
            modalFooterHTML = '';

        elemModal.classList.add('modal');
        modalHTML = modalTemplate.replace('{{title}}', options.title || 'Новое окно');
        modalHTML = modalHTML.replace('{{content}}', options.content || '');
        if (options.footerButtons) {
            for (var i = 0, length = options.footerButtons.length; i < length; i++) {
                var modalFooterButton = modalButtonTemplate.replace('{{button_class}}', options.footerButtons[i].class);
                modalFooterButton = modalFooterButton.replace('{{button_handler}}', options.footerButtons[i].handler);
                modalFooterButton = modalFooterButton.replace('{{button_text}}', options.footerButtons[i].text);
                modalFooterHTML += modalFooterButton;
            }
            modalFooterHTML = modalFooterTemplate.replace('{{buttons}}', modalFooterHTML);
        }
        modalHTML = modalHTML.replace('{{footer}}', modalFooterHTML);
        elemModal.innerHTML = modalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }

    function _showModal() {
        if (!_destroyed && !_hiding) {
            _elemModal.classList.add('modal__show');
            document.dispatchEvent(_eventShowModal);
        }
    }

    function _hideModal() {
        _hiding = true;
        _elemModal.classList.remove('modal__show');
        _elemModal.classList.add('modal__hiding');
        setTimeout(function () {
            _elemModal.classList.remove('modal__hiding');
            _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
    }

    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'modal') {
            _hideModal();
        }
    }

    _elemModal = _createModal(options || {});


    _elemModal.addEventListener('click', _handlerCloseModal);
    _eventShowModal = new CustomEvent('show.modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.modal', { detail: _elemModal });

    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener('click', _handlerCloseModal),
                _destroyed = true;
        },
        setContent: function (html) {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};

const lastProjectsList = {
  'pink' : {
    title: 'Pink',
    description: 'Приложение для раскрашивания фотографий',
    specification: ['Верстка 3х страниц', 'HTML5, CSS3, mobile first, responsive design', 'Методология: БЭМ', 'Препроцессор: Less', 'Сборщик: Gulp'],
    demo: 'https://ks123kirill.github.io/pink/',
    repo: 'https://github.com/ks123kirill/pink',
    img: 'img/pink.png'
  },
  'bikes' : {
    title: 'Bikes',
    description: 'Магазин по продаже крутых велосипедов',
    specification: ['Верстка 1 страницы', 'HTML5, CSS3, desktop first, responsive design', 'Методология: БЭМ', 'Препроцессор: Sass', 'Сборщик: Gulp'],
    demo: 'https://ks123kirill.github.io/bikes/',
    repo: 'https://github.com/ks123kirill/bikes',
    img: 'img/bikes.png'
  },
  'keksobooking' : {
    title: 'Keksobooking',
    description: 'Cервис размещения объявлений о сдаче в аренду недвижимости',
    specification: ['Разработка веб-интерфейса', 'Использование модулей ECMAScript', 'Использование Fetch API', 'Использование Leaflet API - картографический сервис', 'Валидация формы'],
    demo: 'https://ks123kirill.github.io/keksobooking/',
    repo: 'https://github.com/ks123kirill/keksobooking',
    img: 'img/keksobooking.png'
  }
};

// создаём модальное окно
var modal = $modal();
var modalsCollection = document.querySelectorAll('#show-modal');

modalsCollection.forEach((item) => {
  item.addEventListener('click', function(e) {
    const myProject = item.dataset.projectName;
    modal.setTitle(lastProjectsList[myProject].title);
    modal.setContent(
      `<p class="last-works__description">${lastProjectsList[myProject].description}</p>
      <p class="last-works__heading">Описание:</p>
      <ul class="last-works__specification">
        <li>${lastProjectsList[myProject].specification[0]}</li>
        <li>${lastProjectsList[myProject].specification[1]}</li>
        <li>${lastProjectsList[myProject].specification[2]}</li>
        <li>${lastProjectsList[myProject].specification[3]}</li>
        <li>${lastProjectsList[myProject].specification[4]}</li>
      </ul>
      <a class="last-works__link last-works__link--demo" href="${lastProjectsList[myProject].demo}">Посмотреть демо</a>
      <a class="last-works__link last-works__link--repo" href="${lastProjectsList[myProject].repo}">Посмотреть репозиторий</a>`
    );
    
    modal.show();

    window.addEventListener('keydown', function(evt) {
      if(evt.keyCode === 27) {
      evt.preventDefault();
      modal.hide();
      }
    });
  });
});
