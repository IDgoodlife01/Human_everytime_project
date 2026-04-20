package com.human.every_human_time.dto.response;

import com.human.every_human_time.entity.Book;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder; import lombok.Getter;
import java.time.LocalDateTime;

@Getter @Builder @Schema(description = "중고책 응답 DTO")
public class BookResDto {
    private Long bookId;
    private Long userId;
    private String sellerName;
    private String title;
    private String author;
    private String description;
    private String bookCondition;
    private Integer price;
    private String status;
    private LocalDateTime createdAt;
    private byte[] imageData; // 혹은 다시 Base64로 변환해서 전달

    public static BookResDto from(Book b) {
        return BookResDto.builder()
                .bookId(b.getBookId()).userId(b.getUser().getUserId())
                .sellerName(b.getUser().getName()).title(b.getTitle())
                .author(b.getAuthor()).description(b.getDescription())
                .bookCondition(b.getBookCondition()).price(b.getPrice())
                .status(b.getStatus()).imageData(b.getImageData())
                .createdAt(b.getCreatedAt()).build();
    }
}
