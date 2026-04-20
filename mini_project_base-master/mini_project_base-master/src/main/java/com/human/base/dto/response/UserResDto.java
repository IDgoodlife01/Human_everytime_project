package com.human.base.dto.response;

import com.human.base.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@Schema(description = "회원 정보 응답 DTO")
public class UserResDto {

    @Schema(description = "회원 ID", example = "1")
    private Long userId;

    @Schema(description = "이메일", example = "hong@human.com")
    private String email;

    @Schema(description = "이름", example = "홍길동")
    private String name;

    @Schema(description = "관리자 여부", example = "false")
    private boolean isAdmin;

    @Schema(description = "가입일")
    private LocalDateTime createdAt;

    // Entity → Dto 변환 (정적 팩토리 메서드)
    public static UserResDto from(User user) {
        return UserResDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .isAdmin(user.isAdmin())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
