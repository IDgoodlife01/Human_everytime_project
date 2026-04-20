package com.human.base.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 게시글 엔티티
 *
 * [공통 필드] 3개 조 모두 사용
 * - postId, user(작성자), title, content, createdAt
 *
 * [확장 가이드]
 * - 뮤지컬 조  : category 필드 추가 가능
 * - 직장인 커뮤 : category(ENUM), viewCount, likeCount 추가
 */
@Entity
@Table(name = "posts")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    // 작성자 - User와 N:1 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 300)
    private String title;

    @Lob
    private String content;

    // 카테고리 (선택 사용 - 필요 없는 조는 무시)
    @Column(length = 50)
    private String category;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
