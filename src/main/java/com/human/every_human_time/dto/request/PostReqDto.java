package com.human.every_human_time.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Schema(description = "게시글 등록/수정 요청 DTO")
public class PostReqDto {

    @Schema(description = "작성자 userId (로그인 후 localStorage에서 전달)", example = "1")
    private Long userId;

    @Schema(description = "게시글 제목", example = "오늘 뮤지컬 보고 왔어요")
    private String title;

    @Schema(description = "게시글 내용", example = "정말 감동적이었습니다!")
    private String content;

    @Schema(description = "카테고리 (선택 사용, 필요없으면 생략)", example = "자유")
    private String category;
}
