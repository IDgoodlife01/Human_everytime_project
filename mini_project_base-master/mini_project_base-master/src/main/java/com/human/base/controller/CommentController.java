package com.human.base.controller;

import com.human.base.dto.request.CommentReqDto;
import com.human.base.dto.response.ApiResponse;
import com.human.base.dto.response.CommentResDto;
import com.human.base.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/{postId}/comments")
@RequiredArgsConstructor
@Tag(name = "Comment", description = "댓글 CRUD API")
public class CommentController {

    private final CommentService commentService;

    @Operation(summary = "댓글 등록")
    @PostMapping
    public ResponseEntity<ApiResponse<CommentResDto>> saveComment(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId,
            @RequestBody CommentReqDto dto) {
        CommentResDto saved = commentService.saveComment(postId, dto);
        return ResponseEntity.ok(ApiResponse.ok("댓글 등록 성공", saved));
    }

    @Operation(
        summary = "댓글 목록 조회",
        description = "특정 게시글의 댓글 목록 (작성 시간 오름차순)"
    )
    @GetMapping
    public ResponseEntity<ApiResponse<List<CommentResDto>>> getCommentList(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId) {
        List<CommentResDto> list = commentService.getCommentList(postId);
        return ResponseEntity.ok(ApiResponse.ok("댓글 목록 조회 성공", list));
    }

    @Operation(
        summary = "댓글 수정",
        description = "작성자 본인만 수정 가능. dto에 userId 포함 필수"
    )
    @PutMapping("/{commentId}")
    public ResponseEntity<ApiResponse<CommentResDto>> updateComment(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId,
            @Parameter(description = "댓글 ID", example = "1")
            @PathVariable Long commentId,
            @RequestBody CommentReqDto dto) {
        CommentResDto updated = commentService.updateComment(commentId, dto);
        return ResponseEntity.ok(ApiResponse.ok("댓글 수정 성공", updated));
    }

    @Operation(
        summary = "댓글 삭제",
        description = "작성자 본인만 삭제 가능. userId를 쿼리파라미터로 전달"
    )
    @DeleteMapping("/{commentId}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId,
            @Parameter(description = "댓글 ID", example = "1")
            @PathVariable Long commentId,
            @Parameter(description = "요청자 userId (본인 확인용)", example = "1")
            @RequestParam Long userId) {
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.ok(ApiResponse.ok("댓글 삭제 성공"));
    }
}
