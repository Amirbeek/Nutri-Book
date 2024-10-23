package org.example.nutribookbe.entity;

import java.io.Serial;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.example.nutribookbe.UserType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    //User Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String username;


    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;


    UserType userType;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(name = "user_allergy", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "allergy_id"))
    private Set<Allergy> allergies = new HashSet<>();

    public User() {
        super();
    }

    //User Constructor
    public User(String username, String email, String password) {
        super();
        this.username = username;
        this.email = email;
        this.password = password;
    }

    //GETTERS
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public UserType getUserType() {
        return userType;
    }

    //SETTERS
    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }


}
