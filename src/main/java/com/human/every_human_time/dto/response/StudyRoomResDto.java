package com.human.every_human_time.dto.response;

import com.human.every_human_time.entity.StudyRoom;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder; import lombok.Getter;
import java.time.LocalDateTime;

@Getter @Builder @Schema(description = "열람실 예약 응답 DTO")
public class StudyRoomResDto {
    private Long assignId;
    private Long userId;
    private String userName;
    private Integer roomId;
    private Integer seatNum;
    private LocalDateTime startTime;
    private Integer usageTime;
    private LocalDateTime endTime;
    private Boolean isOccupied;

    public static StudyRoomResDto from(StudyRoom s) {
        return StudyRoomResDto.builder()
                .assignId(s.getAssignId()).userId(s.getUser().getUserId())
                .userName(s.getUser().getName()).roomId(s.getRoomId())
                .seatNum(s.getSeatNum()).startTime(s.getStartTime())
                .usageTime(s.getUsageTime()).endTime(s.getEndTime())
                .isOccupied(s.getIsOccupied()).build();
    }
}
