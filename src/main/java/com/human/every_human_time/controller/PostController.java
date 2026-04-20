package com.human.every_human_time.controller;

import com.human.every_human_time.dto.request.PostReqDto;
import com.human.every_human_time.dto.response.ApiResponse;
import com.human.every_human_time.dto.response.PostResDto;
import com.human.every_human_time.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@Tag(name = "Post", description = "게시글 CRUD + 검색 API")
public class PostController {

    private final PostService postService;

    @Operation(summary = "게시글 등록")
    @PostMapping
    public ResponseEntity<ApiResponse<PostResDto>> savePost(@RequestBody PostReqDto dto) {
        PostResDto saved = postService.savePost(dto);
        return ResponseEntity.ok(ApiResponse.ok("게시글 등록 성공", saved));
    }

    @Operation(
        summary = "게시글 전체 목록",
        description = "최신순으로 전체 게시글 반환"
    )
    @GetMapping
    public ResponseEntity<ApiResponse<List<PostResDto>>> getPostList() {
        List<PostResDto> list = postService.getPostList();
        return ResponseEntity.ok(ApiResponse.ok("게시글 목록 조회 성공", list));
    }

    @Operation(summary = "게시글 단건 조회")
    @GetMapping("/{postId}")
    public ResponseEntity<ApiResponse<PostResDto>> getPost(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId) {
        PostResDto dto = postService.getPost(postId);
        return ResponseEntity.ok(ApiResponse.ok("게시글 조회 성공", dto));
    }

    @Operation(
        summary = "내 게시글 목록",
        description = "특정 회원이 작성한 게시글 목록 조회"
    )
    @GetMapping("/my/{userId}")
    public ResponseEntity<ApiResponse<List<PostResDto>>> getMyPostList(
            @Parameter(description = "회원 ID", example = "1")
            @PathVariable Long userId) {
        List<PostResDto> list = postService.getMyPostList(userId);
        return ResponseEntity.ok(ApiResponse.ok("내 게시글 목록 조회 성공", list));
    }

    @Operation(
        summary = "제목 키워드 검색",
        description = "제목에 키워드가 포함된 게시글 검색 (최신순)"
    )
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<PostResDto>>> searchPost(
            @Parameter(description = "검색 키워드", example = "뮤지컬")
            @RequestParam String keyword) {
        List<PostResDto> list = postService.searchPost(keyword);
        return ResponseEntity.ok(ApiResponse.ok("게시글 검색 성공", list));
    }

    @Operation(
        summary = "카테고리별 목록",
        description = "특정 카테고리의 게시글 목록 조회 (카테고리 사용하는 조만 활용)"
    )
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<PostResDto>>> getPostListByCategory(
            @Parameter(description = "카테고리", example = "자유")
            @PathVariable String category) {
        List<PostResDto> list = postService.getPostListByCategory(category);
        return ResponseEntity.ok(ApiResponse.ok("카테고리별 게시글 조회 성공", list));
    }

    @Operation(
        summary = "게시글 수정",
        description = "작성자 본인만 수정 가능. dto에 userId 포함 필수"
    )
    @PutMapping("/{postId}")
    public ResponseEntity<ApiResponse<PostResDto>> updatePost(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId,
            @RequestBody PostReqDto dto) {
        PostResDto updated = postService.updatePost(postId, dto);
        return ResponseEntity.ok(ApiResponse.ok("게시글 수정 성공", updated));
    }

    @Operation(
        summary = "게시글 삭제",
        description = "작성자 본인만 삭제 가능. userId를 쿼리파라미터로 전달"
    )
    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @Parameter(description = "게시글 ID", example = "1")
            @PathVariable Long postId,
            @Parameter(description = "요청자 userId (본인 확인용)", example = "1")
            @RequestParam Long userId) {
        postService.deletePost(postId, userId);
        return ResponseEntity.ok(ApiResponse.ok("게시글 삭제 성공"));
    }
}
