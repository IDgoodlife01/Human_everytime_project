package com.human.every_human_time.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Schema(description = "회원 정보 수정 요청 DTO")
public class UserUpdateReqDto {

    @Schema(description = "변경할 이름", example = "홍길동2")
    private String name;

    @Schema(description = "변경할 비밀번호 (변경 안 할 경우 빈값 또는 null)", example = "5678")
    private String password;
}
