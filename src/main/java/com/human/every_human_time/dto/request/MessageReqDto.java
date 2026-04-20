package com.human.every_human_time.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter; import lombok.NoArgsConstructor; import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Schema(description = "쪽지 전송 요청 DTO")
public class MessageReqDto {
    @Schema(description = "받는 사람 userId", example = "2") private Long receiverId;
    @Schema(example = "안녕하세요! 책 아직 판매 중인가요?") private String content;
}
