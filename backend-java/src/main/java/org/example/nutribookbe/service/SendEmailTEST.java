package org.example.nutribookbe.service;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;

public class SendEmailTEST {

    public static void main(String[] args) {
        // Set properties
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        // Your email address and password
        String myAccountEmail = "Brunel.Group.Project.49@gmail.com";
        String password = "simbhypaxpycatci";

        // Destination address
        String recipient = "danielbeck94@gmail.com";

        // Get session
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(myAccountEmail, password);
            }
        });

        // Create message
        Message message = prepareMessage(session, myAccountEmail, recipient);

        // Send the mail
        try {
            Transport.send(message);
            System.out.println("Mail sent successfully!");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private static Message prepareMessage(Session session, String myAccountEmail, String recipient) {
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(myAccountEmail));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
            message.setSubject("Test Mail");
            message.setText("Hello there! This is a test mail.");
            return message;
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }
}