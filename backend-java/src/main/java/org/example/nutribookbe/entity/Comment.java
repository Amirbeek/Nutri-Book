package org.example.nutribookbe.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {




    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    //Constructors
    public Comment() {}

    public Comment(String text, User user) {
        this.text = text;
        this.user = user;
    }

    //GETTERS
    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public User getUser() {
        return user;
    }

    //SETTERS
    public void setId(Long id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
