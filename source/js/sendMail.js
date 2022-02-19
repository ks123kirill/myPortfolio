const ALERT_SHOW_TIME = 3000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.display = 'flex'
  alertContainer.style.maxWidth = '540px';
  alertContainer.style.maxHeight = '240px';
  alertContainer.style.backgroundColor = 'transparent';
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = 0;
  alertContainer.style.bottom = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#48494d';
  alertContainer.style.padding = '20px 20px';
  alertContainer.style.margin = 'auto';

  const alertContent = document.createElement('div');
  alertContent.style.display = 'flex';
  alertContent.style.justifyContent = 'center';
  alertContent.style.alignItems = 'center';
  alertContent.style.flexBasis = "100%";
  alertContent.textContent = message;
  alertContent.style.backgroundColor = '#fff';
  alertContent.style.border = '3px solid rgb(181, 195, 214)';
  alertContent.style.borderRadius = '10px';
  alertContent.style.boxShadow = '0px 0px 9px 4px rgba(162, 129, 129, 0.5)';
  alertContent.style.padding = '20px 20px';

  alertContainer.prepend(alertContent);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const form = document.getElementById('form');
form.addEventListener('submit', formSend);

async function formSend(evt) {
  evt.preventDefault();

  let error = formValidate(form);

  let formData = new FormData(form);

  if (error === 0) {
    form.classList.add('_sending');
    let response = await fetch('sendMail.php',
    {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      let result = await response.json();
      showAlert(result.message);
      form.reset();
      form.classList.remove('_sending');
    }
    else {
      // showAlert(result.message);
      showAlert('Какая то ошибка. Данные не отправлены :(');
      form.classList.remove('_sending');
    }
  }
  else {
    showAlert('Заполните поля');
  }
}

function formValidate(form) {
  let error = 0;
  let formReq = document.querySelectorAll('._req');

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index];
    formRemoveError(input);

    if (input.classList.contains('_email')) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      }
    } else {
      if (input.value === '') {
        formAddError(input);
        error++;
      }
    }
  }
  return error;
}

function formAddError(input) {
  input.classList.add('_error');
}

function formRemoveError(input) {
  input.classList.remove('_error');
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
