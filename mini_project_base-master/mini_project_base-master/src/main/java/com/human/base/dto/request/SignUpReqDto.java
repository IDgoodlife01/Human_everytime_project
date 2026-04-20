package com.human.base.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Schema(description = "회원가입 요청 DTO")
public class SignUpReqDto {

    @Schema(description = "이메일 (로그인 ID)", example = "hong@human.com")
    private String email;

    @Schema(description = "비밀번호 (평문 전달 → 서버에서 BCrypt 암호화)", example = "1234")
    private String password;

    @Schema(description = "이름 (닉네임)", example = "홍길동")
    private String name;
}
