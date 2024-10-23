package org.example.nutribookbe.security;

import org.example.nutribookbe.entity.User;
import org.example.nutribookbe.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository repo;

    public UserDetailsServiceImpl(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User currUser = repo.findByEmail(email);

        System.out.println("loadUserByUsername : UserDetails Service Impl");

        if (currUser != null) {
            System.out.println(currUser.getEmail());

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

            return new org.springframework.security.core
                    .userdetails.User(email, currUser.getPassword()
                    , true, true, true, true,
                    authorities);
        } else {
            throw new UsernameNotFoundException("User not authorized.");
        }
    }
}
