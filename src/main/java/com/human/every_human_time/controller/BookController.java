package com.human.every_human_time.controller;

import com.human.every_human_time.dto.request.BookReqDto;
import com.human.every_human_time.dto.response.ApiResponse;
import com.human.every_human_time.dto.response.BookResDto;
import com.human.every_human_time.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/books")
@RequiredArgsConstructor @Tag(name = "Book", description = "중고책 마켓 API")
public class BookController {
    private final BookService bookService;

    @Operation(summary = "책 등록")
    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse<BookResDto>> saveBook(
            @PathVariable Long userId, @RequestBody BookReqDto dto) {
        try {
            BookResDto result = bookService.saveBook(userId, dto);
            return ResponseEntity.ok(ApiResponse.ok("책이 등록되었습니다.", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }

    @Operation(summary = "판매 중인 책 목록")
    @GetMapping
    public ResponseEntity<ApiResponse<List<BookResDto>>> getBookList() {
        try {
            List<BookResDto> result = bookService.getBookList();
            return ResponseEntity.ok(ApiResponse.ok("판매 중인 책 목록 조회 성공", result));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.fail("목록 조회 중 오류가 발생했습니다."));
        }
    }

    @Operation(summary = "책 상세 조회")
    @GetMapping("/{bookId}")
    public ResponseEntity<ApiResponse<BookResDto>> getBook(@PathVariable Long bookId) {
        try {
            BookResDto result = bookService.getBook(bookId);
            return ResponseEntity.ok(ApiResponse.ok("책 상세 정보 조회 성공", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }

    @Operation(summary = "제목 검색")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<BookResDto>>> searchBook(@RequestParam String keyword) {
        try {
            List<BookResDto> result = bookService.searchBook(keyword);
            return ResponseEntity.ok(ApiResponse.ok("검색 결과 조회 성공", result));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.fail("검색 중 오류가 발생했습니다."));
        }
    }

    @Operation(summary = "판매 완료 처리")
    @PutMapping("/{bookId}/complete")
    public ResponseEntity<ApiResponse<BookResDto>> completeBook(
            @PathVariable Long bookId, @RequestParam Long userId) {
        try {
            BookResDto result = bookService.completeBook(bookId, userId);
            return ResponseEntity.ok(ApiResponse.ok("판매 완료 처리되었습니다.", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }

    @Operation(summary = "책 삭제")
    @DeleteMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(
            @PathVariable Long bookId, @RequestParam Long userId) {
        try {
            bookService.deleteBook(bookId, userId);
            return ResponseEntity.ok(ApiResponse.ok("책이 삭제되었습니다."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }

    @Operation(summary = "책 정보 수정")
    @PutMapping("/{bookId}")
    public ResponseEntity<ApiResponse<BookResDto>> updateBook(
            @PathVariable Long bookId,
            @RequestParam Long userId,
            @RequestBody BookReqDto dto) {
        try {
            BookResDto result = bookService.updateBook(bookId, userId, dto);
            return ResponseEntity.ok(ApiResponse.ok("책 정보가 수정되었습니다.", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }
}
