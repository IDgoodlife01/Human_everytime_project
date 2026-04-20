package com.human.every_human_time.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "posts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder @ToString
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id") private Long postId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) private User user;
    @Column(nullable = false, length = 300) private String title;
    @Lob private String content;
    @Column(length = 50) private String category;
    @Column(name = "created_at") private LocalDateTime createdAt;
    @Column(name = "updated_at") private LocalDateTime updatedAt;
    @PrePersist public void prePersist() { this.createdAt = LocalDateTime.now(); }
    @PreUpdate public void preUpdate() { this.updatedAt = LocalDateTime.now(); }
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
}
