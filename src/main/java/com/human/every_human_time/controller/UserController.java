package com.human.every_human_time.controller;

import com.human.every_human_time.dto.request.UserUpdateReqDto;
import com.human.every_human_time.dto.response.ApiResponse;
import com.human.every_human_time.dto.response.UserResDto;
import com.human.every_human_time.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "회원 정보 조회 / 수정 API")
public class UserController {

    private final UserService userService;

    @Operation(
        summary = "회원 정보 조회",
        description = "userId로 특정 회원 정보 조회"
    )
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResDto>> getUser(
            @Parameter(description = "회원 ID", example = "1")
            @PathVariable Long userId) {
        UserResDto dto = userService.getUser(userId);
        return ResponseEntity.ok(ApiResponse.ok("회원 정보 조회 성공", dto));
    }

    @Operation(
        summary = "회원 정보 수정",
        description = "이름, 비밀번호 수정 가능. 변경하지 않을 항목은 빈값 또는 null로 전달"
    )
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResDto>> updateUser(
            @Parameter(description = "회원 ID", example = "1")
            @PathVariable Long userId,
            @RequestBody UserUpdateReqDto dto) {
        UserResDto updated = userService.updateUser(userId, dto);
        return ResponseEntity.ok(ApiResponse.ok("회원 정보 수정 성공", updated));
    }
}
