package com.human.base.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 회원 엔티티
 *
 * [공통 필드] 3개 조 모두 사용
 * - userId, email, password, name, isAdmin, createdAt
 *
 * [확장 가이드] 각 조에서 필요한 필드 추가
 * - 뮤지컬 조  : birthDate 등
 * - 에브리휴먼  : major(전공), year(학번) 등
 * - 직장인 커뮤 : companyName, certStatus 등
 */
@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "password")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;  // BCrypt 암호화된 비밀번호

    @Column(nullable = false, length = 50)
    private String name;

    @Column(name = "is_admin")
    @Builder.Default
    private boolean isAdmin = false;  // false: 일반유저, true: 관리자

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
