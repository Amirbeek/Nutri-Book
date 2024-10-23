package org.example.nutribookbe.dto;

import org.example.nutribookbe.UserType ;

public class UserPostDTO {
	String username;
	String email;
	String password;
	UserType userType;
	
	public UserPostDTO(String name, String email, String password) {
		super();
		this.username = name;
		this.email = email;
		this.password = password;
	}

	public UserPostDTO() {

	}


	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
