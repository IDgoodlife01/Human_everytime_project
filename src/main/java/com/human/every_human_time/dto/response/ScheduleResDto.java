package com.human.every_human_time.dto.response;

import com.human.every_human_time.entity.Schedule;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder; import lombok.Getter;
import java.time.LocalTime;

@Getter @Builder @Schema(description = "시간표 응답 DTO")
public class ScheduleResDto {
    private Long scheduleId;
    private Long userId;
    private String className;
    private String professor;
    private String classRoom;
    private String day;
    private LocalTime startTime;
    private LocalTime endTime;
    private String color;

    public static ScheduleResDto from(Schedule s) {
        return ScheduleResDto.builder()
                .scheduleId(s.getScheduleId()).userId(s.getUser().getUserId())
                .className(s.getClassName()).professor(s.getProfessor())
                .classRoom(s.getClassRoom()).day(s.getDay())
                .startTime(s.getStartTime()).endTime(s.getEndTime()).color(s.getColor())
                .build();
    }
}
