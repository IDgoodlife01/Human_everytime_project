package com.human.every_human_time.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalTime;

/**
 * 시간표 엔티티
 * User(N:1) 관계 - 한 유저가 여러 수업 유닛을 가질 수 있음
 * TODO: ScheduleService 메서드를 구현하세요.
 */
@Entity @Table(name = "schedules")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder @ToString
public class Schedule {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id") private Long scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "class_name", length = 50)
    private String className;       // 강의명

    @Column(length = 50)
    private String professor;       // 교수명

    @Column(name = "class_room", length = 20)
    private String classRoom;       // 강의실

    @Column(nullable = false, length = 10)
    private String day;             // 요일 (월/화/수/목/금)


    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;    // 강의 시작 시간

    @JsonFormat(pattern = "HH:mm")

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;      // 강의 종료 시간

    @Column(nullable = false, length = 20)
    private String color;           // 시간표 색상 (예: #FF5733)
}
