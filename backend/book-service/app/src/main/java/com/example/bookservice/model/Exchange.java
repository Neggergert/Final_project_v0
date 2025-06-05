package com.example.bookservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Exchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Book book;
    private Long fromUserId;
    private Long toUserId;
    private String location;
    private LocalDateTime exchangedAt = LocalDateTime.now();

    public Exchange() {}

    public Exchange(Book book, Long fromUserId, Long toUserId, String location) {
        this.book = book;
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.location = location;
    }

    public Long getId() { return id; }
    public Book getBook() { return book; }
    public void setBook(Book book) { this.book = book; }
    public Long getFromUserId() { return fromUserId; }
    public void setFromUserId(Long fromUserId) { this.fromUserId = fromUserId; }
    public Long getToUserId() { return toUserId; }
    public void setToUserId(Long toUserId) { this.toUserId = toUserId; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public LocalDateTime getExchangedAt() { return exchangedAt; }
    public void setExchangedAt(LocalDateTime exchangedAt) { this.exchangedAt = exchangedAt; }
}
