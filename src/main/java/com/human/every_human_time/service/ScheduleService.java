package com.human.every_human_time.service;

import com.human.every_human_time.dto.request.ScheduleReqDto;
import com.human.every_human_time.dto.response.ApiResponse;
import com.human.every_human_time.dto.response.ScheduleResDto;
import com.human.every_human_time.entity.Schedule;
import com.human.every_human_time.entity.User;
import com.human.every_human_time.repository.ScheduleRepository;
import com.human.every_human_time.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    /** 1. 시간표 등록 */
    public ApiResponse<ScheduleResDto> addSchedule(Long userId, ScheduleReqDto dto) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));



            Schedule schedule = Schedule.builder()
                    .user(user)
                    .className(dto.getClassName())
                    .professor(dto.getProfessor())
                    .classRoom(dto.getClassRoom())
                    .day(dto.getDay())
                    .startTime(dto.getStartTime())
                    .endTime(dto.getEndTime())
                    .color(dto.getColor())
                    .build();

            Schedule saved = scheduleRepository.save(schedule);
            return ApiResponse.ok("시간표가 등록되었습니다.", ScheduleResDto.from(saved));
        } catch (Exception e) {
            return ApiResponse.fail(e.getMessage());
        }
    }

    /** 2. 내 시간표 전체 조회 */
    @Transactional(readOnly = true)
    public ApiResponse<List<ScheduleResDto>> getMySchedules(Long userId) {
        try {
            List<ScheduleResDto> list = scheduleRepository.findByUserUserId(userId)
                    .stream()
                    .map(ScheduleResDto::from)
                    .toList();
            return ApiResponse.ok("시간표 조회 성공", list);
        } catch (Exception e) {
            return ApiResponse.fail("시간표를 불러오는 중 오류가 발생했습니다.");
        }
    }

    /** 3. 시간표 삭제 */
    public ApiResponse<Void> deleteSchedule(Long scheduleId, Long userId) {
        try {
            Schedule schedule = scheduleRepository.findById(scheduleId)
                    .orElseThrow(() -> new IllegalArgumentException("해당 시간표가 존재하지 않습니다."));

            // 본인 확인
            if (!schedule.getUser().getUserId().equals(userId)) {
                return ApiResponse.fail("삭제 권한이 없습니다.");
            }

            scheduleRepository.delete(schedule);
            return ApiResponse.ok("시간표가 삭제되었습니다.");
        } catch (Exception e) {
            return ApiResponse.fail(e.getMessage());
        }
    }
}