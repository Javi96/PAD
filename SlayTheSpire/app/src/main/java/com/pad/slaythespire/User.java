package com.pad.slaythespire;

public class User {

    private String name;
    private String email;
    private String password;
    private Double points;
    private Long matches;
    private Long level;
    private String icon;
    private Boolean protect;

    public User(String name, String email, String password, Double points, Long matches, Long level, String icon, Boolean protect) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.points = points;
        this.matches = matches;
        this.level = level;
        this.icon = icon;
        this.protect = protect;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Double getPoints() {
        return points;
    }

    public Long getMatches() {
        return matches;
    }

    public Long getLevel() {
        return level;
    }

    public String getIcon() {
        return icon;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPoints(Double points) {
        this.points = points;
    }

    public void setMatches(Long matches) {
        this.matches = matches;
    }

    public void setLevel(Long level) {
        this.level = level;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Boolean getProtect() {
        return protect;
    }

    public void setProtect(Boolean protect) {
        this.protect = protect;
    }
}
