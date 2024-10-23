package org.example.nutribookbe.controller;

import org.example.nutribookbe.dto.UserPostDTO;
import org.example.nutribookbe.entity.User;
import org.example.nutribookbe.repository.UserRepository;
import org.example.nutribookbe.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    // This is a test for the create user method in the UserController class.
    @Test
    public void testCreateUser() throws Exception {
        UserPostDTO userPostDTO = new UserPostDTO();
        userPostDTO.setUsername("testUsername");
        userPostDTO.setEmail("testEmail@example.com");
        
        User createdUser = new User();
        createdUser.setUsername(userPostDTO.getUsername());
        createdUser.setEmail(userPostDTO.getEmail());

        when(userService.createUser(any(User.class))).thenReturn(createdUser);
        when(userRepository.existsByUsername(userPostDTO.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(userPostDTO.getEmail())).thenReturn(false);

        mockMvc.perform(post("/api/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testUsername\", \"email\":\"testEmail@example.com\", \"password\":\"12345678\"}"))
                .andExpect(status().isCreated());

        verify(userService, times(1)).createUser(any(User.class));
        verify(userRepository, times(1)).existsByUsername(any(String.class));
        verify(userRepository, times(1)).existsByEmail(any(String.class));
    }
}