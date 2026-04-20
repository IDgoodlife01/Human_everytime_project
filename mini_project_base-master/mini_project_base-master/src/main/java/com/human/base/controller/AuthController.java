package com.human.base.controller;

import com.human.base.dto.request.LoginReqDto;
import com.human.base.dto.request.SignUpReqDto;
import com.human.base.dto.response.ApiResponse;
import com.human.base.dto.response.LoginResDto;
import com.human.base.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "회원가입 / 로그인 API")
public class AuthController {

    private final AuthService authService;

    @Operation(
        summary = "이메일 중복 확인",
        description = "사용 가능하면 true, 이미 사용 중이면 false 반환"
    )
    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmail(
            @Parameter(description = "중복 확인할 이메일", example = "hong@human.com")
            @RequestParam String email) {
        boolean available = authService.checkEmail(email);
        String message = available ? "사용 가능한 이메일입니다." : "이미 사용 중인 이메일입니다.";
        return ResponseEntity.ok(ApiResponse.ok(message, available));
    }

    @Operation(
        summary = "회원가입",
        description = "이메일, 비밀번호, 이름으로 회원가입. 비밀번호는 서버에서 BCrypt 암호화 처리"
    )
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signUp(@RequestBody SignUpReqDto dto) {
        authService.signUp(dto);
        return ResponseEntity.ok(ApiResponse.ok("회원가입이 완료되었습니다."));
    }

    @Operation(
        summary = "로그인",
        description = """
            로그인 성공 시 userId, email, name, isAdmin 반환.
            React에서 아래와 같이 localStorage에 저장해서 사용:
            localStorage.setItem('loginUser', JSON.stringify(data));
            """
    )
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResDto>> login(@RequestBody LoginReqDto dto) {
        LoginResDto loginRes = authService.login(dto);
        return ResponseEntity.ok(ApiResponse.ok("로그인 성공", loginRes));
    }
}
