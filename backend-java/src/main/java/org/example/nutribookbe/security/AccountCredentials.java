package org.example.nutribookbe.security;

public class AccountCredentials {
    private String username;
    private String password;

    //GETTERS
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    //SETTERS
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AccountCredentials [username=" + username + ", password=" + password + "]";
    }
}
