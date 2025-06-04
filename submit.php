<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "singhyashvardhan582@example.com";
    $subject = "New Message from Portfolio Contact Form";
    $headers = "From: ".$email;

    $mail_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    if(mail($to, $subject, $mail_body, $headers)){
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message!";
    }
}
?>
