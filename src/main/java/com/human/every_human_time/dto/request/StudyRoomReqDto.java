package com.human.every_human_time.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter; import lombok.NoArgsConstructor; import lombok.Setter;
import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor
@Schema(description = "열람실 예약 요청 DTO")
public class StudyRoomReqDto {
    @Schema(description = "열람실 번호 (1 또는 2)", example = "1") private Integer roomId;
    @Schema(description = "좌석 번호 (1~224)", example = "42") private Integer seatNum;
    @Schema(description = "이용 시간 (1, 2, 3시간 중 선택)", example = "2") private Integer usageTime;
    @Schema(description = "시작 시간", example = "2026-04-13T10:00:00")
    private LocalDateTime startTime;

}
