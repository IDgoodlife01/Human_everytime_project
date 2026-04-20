package com.human.every_human_time.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

/**
 * 공통 API 응답 형식
 * 모든 API 응답은 이 형태로 통일
 *
 * 성공 예시: { "success": true,  "message": "로그인 성공", "data": { ... } }
 * 실패 예시: { "success": false, "message": "이메일 또는 비밀번호가 틀렸습니다.", "data": null }
 */
@Getter
@Schema(description = "공통 API 응답")
public class ApiResponse<T> {

    @Schema(description = "성공 여부", example = "true")
    private final boolean success;

    @Schema(description = "응답 메시지", example = "요청이 성공했습니다.")
    private final String message;

    @Schema(description = "응답 데이터")
    private final T data;

    private ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    // 성공 (데이터 있음)
    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    // 성공 (데이터 없음)
    public static <T> ApiResponse<T> ok(String message) {
        return new ApiResponse<>(true, message, null);
    }

    // 실패
    public static <T> ApiResponse<T> fail(String message) {
        return new ApiResponse<>(false, message, null);
    }
}
