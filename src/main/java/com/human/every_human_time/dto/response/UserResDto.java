package com.human.every_human_time.dto.response;

import com.human.every_human_time.entity.User;
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
    // 1. 여기에 두 필드를 추가하세요!
    @Schema(description = "전공", example = "컴퓨터공학과")
    private String major;
    @Schema(description = "학번", example = "20260413")
    private String year;

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
                // 3. 엔티티에서 꺼낸 값을 DTO에 넣어주는 코드를 추가하세요!
                .major(user.getMajor())
                .year(user.getYear())
                .isAdmin(user.isAdmin())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
