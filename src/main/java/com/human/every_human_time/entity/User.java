package com.human.every_human_time.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

/**
 * 회원 엔티티
 * [베이스 공통] userId, email, password, name, isAdmin, createdAt
 * [2조 추가]   major(전공), year(학번)
 */
@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder @ToString(exclude = "password")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(name = "is_admin")
    @Builder.Default
    private boolean isAdmin = false;

    // ===== 2조 추가 필드 =====
    @Column(length = 50)
    private String major;       // 전공 (예: 컴퓨터공학과)

    @Column(length = 10)
    private String year;        // 학번 (예: 26학번)

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // 내가 보낸 쪽지 리스트
    @Builder.Default
    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    private List<Message> sentMessages = new ArrayList<>();

    // 내가 받은 쪽지 리스트
    @Builder.Default
    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
    private List<Message> receivedMessages = new ArrayList<>();

    // 내 열람실 예약 현황
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<StudyRoom> studyRooms = new ArrayList<>();

    @PrePersist
    public void prePersist() { this.createdAt = LocalDateTime.now(); }
}
