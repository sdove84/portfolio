<?php
require_once('./email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');


echo '<pre>';
print_r($_POST);
echo '</pre>';

$mail = new PHPMailer;
$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication


$mail->Username = EMAIL_USER;                 // SMTP username
$mail->Password = EMAIL_PASS;                 // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = $_POST['email'];//your email sending accounts
$mail->FromName = $_POST['contactName'];//your email sending account name
$mail->addAddress(EMAIL_USER);     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo(/*email address of the person sending the message, so you can reply*/);
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Contact Response From Portfolio';
$mail->Body    = "Portfolio contact form submission from: <b>$_POST[contactName]</b> | $_POST[email]<br><br>$_POST[comments]";
$mail->AltBody = "Portfolio contact form submission from: <b>$_POST[contactName]</b> | $_POST[email] \n\n$_POST[comments]";

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
?>
