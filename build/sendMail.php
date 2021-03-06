<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'PHPMailer/src/Exception.php';
  require 'PHPMailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/');
  $mail->IsHTML(true);

  // от кого письмо
  $mail->setFrom('ks123kirill@gmail.com', 'Портфолио kirillskoropistsev.ru');
  // кому отправить письмо
  $mail->addAddress('ks123kirill@gmail.com');
  // тема письма
  $mail->Subject = 'Привет, Бро! Вскрывай скорее!!!';

  // тело письма
  $body = '<h1> Встречай супер письмо!';

  if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }

  if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
  }

  if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
  }

  $mail->Body = $body;

  // отправляем письмо
  if(!$mail->send()) {
    $message = 'Какая то ошибка. Данные не отправлены.';
  } else {
      $message = 'Данные отправлены';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
