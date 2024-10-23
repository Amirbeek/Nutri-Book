package org.example.nutribookbe.dto;

public class PasswordResetDTO {
    private String token;
    private String newPassword;

    // standard getters and setters

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
