<?php
       // from the form
       $name = trim(strip_tags($_POST['name']));
       $email = trim(strip_tags($_POST['email']));
       $phone = htmlentities($_POST['phone']);

       // set here
       $subject = "YOUniversity enquiry";
       $to = 'jayhan2003@gmail.com';

       $body = $message;

       $headers = "From: $email\r\n";
       $headers .= "Content-type: text/html\r\n";

       // send the email
       mail($to, $subject, $body, $headers);

       // redirect afterwords, if needed
       //header('Location: thanks.html');
?>
