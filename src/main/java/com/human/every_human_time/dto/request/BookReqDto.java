package com.human.every_human_time.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter; import lombok.NoArgsConstructor; import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Schema(description = "중고책 등록 요청 DTO")
public class BookReqDto {
    @Schema(example = "자료구조론") private String title;
    @Schema(example = "홍길동 (A출판사)") private String author; // 저자 및 출판사 포함
    @Schema(example = "깨끗하게 사용했습니다.") private String description; //상태 설명
    @Schema(description = "책 상태 (S/A/B/C등급)", example = "S등급") private String bookCondition;
    @Schema(example = "15000") private Integer price; // 판매가
    @Schema(description = "이미지 데이터 (Base64 인코딩된 문자열)")
    private String base64Image;
}
