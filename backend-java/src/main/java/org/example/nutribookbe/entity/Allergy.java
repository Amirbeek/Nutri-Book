package org.example.nutribookbe.entity;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Allergies")
public class Allergy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "common_allergies", nullable = false)
    private String common_allergies;
    @Column(name = "other_allergies", nullable = false)
    private String other_allergies;
    @Column(name = "uncommon_allergies", nullable = false)
    private String uncommon_allergies;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "allergies")
    private Set<User> users = new HashSet<>();

    // Constructors, getters, setters, etc.

    // Constructor
    public Allergy() {
    }

    public String getCommon_allergies() {
        return common_allergies;
    }

    public void setCommon_allergies(String common_allergies) {
        this.common_allergies = common_allergies;
    }

    public String getOther_allergies() {
        return other_allergies;
    }

    public void setOther_allergies(String other_allergies) {
        this.other_allergies = other_allergies;
    }

    public String getUncommon_allergies() {
        return uncommon_allergies;
    }

    public void setUncommon_allergies(String uncommon_allergies) {
        this.uncommon_allergies = uncommon_allergies;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}