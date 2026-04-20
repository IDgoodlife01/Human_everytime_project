package com.human.every_human_time.controller;

import com.human.every_human_time.dto.request.ScheduleReqDto;
import com.human.every_human_time.dto.response.ApiResponse;
import com.human.every_human_time.dto.response.ScheduleResDto;
import com.human.every_human_time.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
@Tag(name = "Schedule", description = "시간표 API")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "시간표 추가")
    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse<ScheduleResDto>> addSchedule(
            @PathVariable Long userId, @RequestBody ScheduleReqDto dto) {
        return ResponseEntity.ok(scheduleService.addSchedule(userId, dto));
    }

    @Operation(summary = "내 시간표 조회")
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<List<ScheduleResDto>>> getMySchedules(@PathVariable Long userId) {
        return ResponseEntity.ok(scheduleService.getMySchedules(userId));
    }

    @Operation(summary = "시간표 삭제")
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<ApiResponse<Void>> deleteSchedule(
            @PathVariable Long scheduleId, @RequestParam Long userId) {
        return ResponseEntity.ok(scheduleService.deleteSchedule(scheduleId, userId));
    }
}