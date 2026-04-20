package com.human.base.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Schema(description = "댓글 등록/수정 요청 DTO")
public class CommentReqDto {

    @Schema(description = "작성자 userId", example = "1")
    private Long userId;

    @Schema(description = "댓글 내용", example = "저도 봤어요! 정말 좋았습니다 :)")
    private String content;
}
