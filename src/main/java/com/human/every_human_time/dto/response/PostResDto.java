package com.human.every_human_time.dto.response;

import com.human.every_human_time.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@Schema(description = "게시글 응답 DTO")
public class PostResDto {

    @Schema(description = "게시글 ID", example = "1")
    private Long postId;

    @Schema(description = "작성자 ID", example = "1")
    private Long userId;

    @Schema(description = "작성자 이름", example = "홍길동")
    private String userName;

    @Schema(description = "게시글 제목", example = "오늘 뮤지컬 보고 왔어요")
    private String title;

    @Schema(description = "게시글 내용", example = "정말 감동적이었습니다!")
    private String content;

    @Schema(description = "카테고리", example = "자유")
    private String category;

    @Schema(description = "작성일시")
    private LocalDateTime createdAt;

    @Schema(description = "수정일시")
    private LocalDateTime updatedAt;

    // Entity → Dto 변환
    public static PostResDto from(Post post) {
        return PostResDto.builder()
                .postId(post.getPostId())
                .userId(post.getUser().getUserId())
                .userName(post.getUser().getName())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}
