package com.human.every_human_time.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "comments")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder @ToString
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id") private Long commentId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false) private Post post;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) private User user;
    @Column(nullable = false, length = 1000) private String content;
    @Column(name = "created_at") private LocalDateTime createdAt;
    @PrePersist public void prePersist() { this.createdAt = LocalDateTime.now(); }
}
