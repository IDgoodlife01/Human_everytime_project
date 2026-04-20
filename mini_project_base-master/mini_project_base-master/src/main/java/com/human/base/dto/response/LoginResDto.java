package com.human.base.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 성공 응답 DTO
 * React에서 localStorage에 저장해서 로그인 상태 유지에 사용
 *
 * localStorage.setItem('loginUser', JSON.stringify(data));
 */
@Getter
@Builder
@Schema(description = "로그인 응답 DTO")
public class LoginResDto {

    @Schema(description = "회원 고유 ID", example = "1")
    private Long userId;

    @Schema(description = "이메일", example = "hong@human.com")
    private String email;

    @Schema(description = "이름", example = "홍길동")
    private String name;

    @Schema(description = "관리자 여부", example = "false")
    private boolean isAdmin;
}
