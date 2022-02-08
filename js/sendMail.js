const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.width = '500px';
  alertContainer.style.height = '200px';
  alertContainer.style.backgroundColor = '#353535';
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = 0;
  alertContainer.style.bottom = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.margin = 'auto';
  alertContainer.style.padding = '80px 50px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;
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
      alert(result.message);
      showAlert('Данные точно отправлены!');
      console.log(result.message);
      form.reset();
      form.classList.remove('_sending');
    }
    else {
      alert('ошибка');
      form.classList.remove('_sending');
    }
  }
  else {
    alert('Заполните поля');
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
