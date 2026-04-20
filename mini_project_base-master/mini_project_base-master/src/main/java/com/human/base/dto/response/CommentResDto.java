package com.human.base.dto.response;

import com.human.base.entity.Comment;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@Schema(description = "댓글 응답 DTO")
public class CommentResDto {

    @Schema(description = "댓글 ID", example = "1")
    private Long commentId;

    @Schema(description = "게시글 ID", example = "1")
    private Long postId;

    @Schema(description = "작성자 ID", example = "1")
    private Long userId;

    @Schema(description = "작성자 이름", example = "홍길동")
    private String userName;

    @Schema(description = "댓글 내용", example = "저도 봤어요! 정말 좋았습니다 :)")
    private String content;

    @Schema(description = "작성일시")
    private LocalDateTime createdAt;

    // Entity → Dto 변환
    public static CommentResDto from(Comment comment) {
        return CommentResDto.builder()
                .commentId(comment.getCommentId())
                .postId(comment.getPost().getPostId())
                .userId(comment.getUser().getUserId())
                .userName(comment.getUser().getName())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
