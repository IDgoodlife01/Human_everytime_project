package com.human.every_human_time.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter; import lombok.NoArgsConstructor; import lombok.Setter;
import java.time.LocalTime;

@Getter @Setter @NoArgsConstructor
@Schema(description = "시간표 등록 요청 DTO")
public class ScheduleReqDto {
    @Schema(example = "운영체제") private String className;
    @Schema(example = "김교수") private String professor;
    @Schema(example = "공학관 301") private String classRoom;
    @Schema(example = "월") private String day;
    @Schema(example = "09:00") private LocalTime startTime;
    @Schema(example = "11:00") private LocalTime endTime;
    @Schema(example = "#4A90E2") private String color;
}
