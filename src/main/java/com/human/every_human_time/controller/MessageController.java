package com.human.every_human_time.controller;

import com.human.every_human_time.dto.request.MessageReqDto;
import com.human.every_human_time.dto.response.ApiResponse;
import com.human.every_human_time.dto.response.MessageResDto;
import com.human.every_human_time.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@Tag(name = "Message", description = "쪽지 API")
public class MessageController {

    private final MessageService messageService;

    @Operation(summary = "쪽지 보내기")
    @PostMapping("/{senderId}")
    public ResponseEntity<ApiResponse<MessageResDto>> sendMessage(
            @PathVariable Long senderId, @RequestBody MessageReqDto dto) {
        try {
            // 기존 서비스 로직 그대로 호출
            MessageResDto result = messageService.sendMessage(senderId, dto);
            return ResponseEntity.ok(ApiResponse.ok("쪽지를 보냈습니다.", result));
        } catch (IllegalArgumentException e) {
            // 서비스에서 던진 "사용자가 존재하지 않습니다" 등의 메시지를 그대로 전달
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }

    @Operation(summary = "받은 쪽지함 조회")
    @GetMapping("/received/{userId}")
    public ResponseEntity<ApiResponse<List<MessageResDto>>> getReceivedMessages(@PathVariable Long userId) {
        try {
            // 기존 서비스 로직 그대로 호출
            List<MessageResDto> list = messageService.getReceivedMessages(userId);
            return ResponseEntity.ok(ApiResponse.ok("받은 쪽지함 조회 성공", list));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.fail("쪽지함 조회 중 오류가 발생했습니다."));
        }
    }

    @Operation(summary = "쪽지 읽음 처리")
    @PutMapping("/{msgId}/read")
    public ResponseEntity<ApiResponse<MessageResDto>> readMessage(
            @PathVariable Long msgId, @RequestParam Long userId) {
        try {
            // 기존 서비스 로직 그대로 호출 (userId 검증 로직 포함됨)
            MessageResDto result = messageService.readMessage(msgId, userId);
            return ResponseEntity.ok(ApiResponse.ok("쪽지를 읽음 처리했습니다.", result));
        } catch (IllegalArgumentException e) {
            // 서비스에서 던진 "권한이 없습니다" 등의 메시지를 그대로 전달
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }
}