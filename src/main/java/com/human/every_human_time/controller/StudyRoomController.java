package com.human.every_human_time.controller;

import com.human.every_human_time.dto.request.StudyRoomReqDto;
import com.human.every_human_time.dto.response.ApiResponse;
import com.human.every_human_time.dto.response.StudyRoomResDto;
import com.human.every_human_time.service.StudyRoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/study-rooms")
@RequiredArgsConstructor
@Tag(name = "StudyRoom", description = "열람실 예약 API")
public class StudyRoomController {
    private final StudyRoomService studyRoomService;

    @Operation(summary = "좌석 예약")
    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse<StudyRoomResDto>> reserveSeat(
            @PathVariable Long userId, @RequestBody StudyRoomReqDto dto) {
        try {
            StudyRoomResDto result = studyRoomService.reserveSeat(userId, dto);
            return ResponseEntity.ok(ApiResponse.ok("좌석 예약이 완료되었습니다.", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }

    @Operation(summary = "열람실 좌석 현황 조회 (자동 만료 처리 포함)")
    @GetMapping("/{roomId}/status")
    public ResponseEntity<ApiResponse<List<StudyRoomResDto>>> getSeatStatus(@PathVariable Integer roomId) {
        try {
            List<StudyRoomResDto> result = studyRoomService.getSeatStatus(roomId);
            return ResponseEntity.ok(ApiResponse.ok("최신 좌석 현황을 불러왔습니다.", result));
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.fail("현황 조회 중 오류가 발생했습니다."));
        }
    }

    @Operation(summary = "퇴실 (DB 데이터 삭제)")
    @PutMapping("/{assignId}/leave")
    public ResponseEntity<ApiResponse<Void>> leaveSeat(
            @PathVariable Long assignId, @RequestParam Long userId) {
        try {
            studyRoomService.leaveSeat(assignId, userId);
            return ResponseEntity.ok(ApiResponse.ok("퇴실 처리가 완료되었습니다."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.ok(ApiResponse.fail(e.getMessage()));
        }
    }
}