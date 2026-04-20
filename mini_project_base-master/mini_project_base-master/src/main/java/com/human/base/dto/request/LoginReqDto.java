package com.human.base.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Schema(description = "로그인 요청 DTO")
public class LoginReqDto {

    @Schema(description = "이메일", example = "hong@human.com")
    private String email;

    @Schema(description = "비밀번호", example = "1234")
    private String password;
}
