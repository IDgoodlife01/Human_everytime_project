package com.human.every_human_time.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * 열람실 좌석 예약 엔티티
 * User(N:1) 관계
 * TODO: StudyRoomService 메서드를 구현하세요.
 */
@Entity @Table(name = "study_rooms")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder @ToString
public class StudyRoom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assign_id") private Long assignId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "room_id", nullable = false)
    private Integer roomId;         // 열람실 번호 (1: 제1열람실, 2: 제2열람실)

    @Column(name = "seat_num", nullable = false)
    private Integer seatNum;        // 좌석 번호 (1 ~ 224)

    @Column(name = "start_time")
    private LocalDateTime startTime; // 입실 시간

    @Column(name = "usage_time", nullable = false)
    private Integer usageTime;      // 이용 시간 (1, 2, 3시간)

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;  // 종료 예정 시간

    @Column(name = "is_occupied")
    @Builder.Default
    private Boolean isOccupied = true; // true: 사용 중, false: 빈 좌석

    @PrePersist
    public void prePersist() {
        if (this.startTime == null) this.startTime = LocalDateTime.now();
    }
}
