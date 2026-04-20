package com.human.every_human_time.service;

import com.human.every_human_time.dto.request.StudyRoomReqDto;
import com.human.every_human_time.dto.response.StudyRoomResDto;
import com.human.every_human_time.entity.StudyRoom;
import com.human.every_human_time.entity.User;
import com.human.every_human_time.repository.StudyRoomRepository;
import com.human.every_human_time.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StudyRoomService {

    private final StudyRoomRepository studyRoomRepository;
    private final UserRepository userRepository;

    /** 좌석 예약 */
    public StudyRoomResDto reserveSeat(Long userId, StudyRoomReqDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        studyRoomRepository.findByRoomIdAndSeatNumAndIsOccupied(dto.getRoomId(), dto.getSeatNum(), true)
                .ifPresent(s -> {
                    throw new IllegalArgumentException("이미 사용 중인 좌석입니다.");
                });

        LocalDateTime endTime = dto.getStartTime().plusHours(dto.getUsageTime());

        StudyRoom studyRoom = StudyRoom.builder()
                .user(user)
                .roomId(dto.getRoomId())
                .seatNum(dto.getSeatNum())
                .startTime(dto.getStartTime())
                .usageTime(dto.getUsageTime())
                .endTime(endTime)
                .isOccupied(true)
                .build();

        StudyRoom saved = studyRoomRepository.save(studyRoom);
        return StudyRoomResDto.from(saved);
    }

    /**
     * [보완] 열람실 좌석 현황 조회 (자동 만료 처리 로직 강화)
     * 현황 조회 요청이 올 때마다 시간이 지난 좌석을 DB에서 즉시 삭제합니다.
     */
    public List<StudyRoomResDto> getSeatStatus(Integer roomId) {
        LocalDateTime now = LocalDateTime.now();

        // 1. 현재 해당 열람실에서 사용 중인 모든 좌석을 가져옴
        List<StudyRoom> activeSeats = studyRoomRepository.findByRoomIdAndIsOccupied(roomId, true);

        // 2. 시간이 만료된 좌석들만 필터링
        List<StudyRoom> expiredSeats = activeSeats.stream()
                .filter(s -> s.getEndTime().isBefore(now))
                .toList();

        // 3. 만료된 좌석이 있다면 DB에서 삭제 및 즉시 반영
        if (!expiredSeats.isEmpty()) {
            studyRoomRepository.deleteAll(expiredSeats);
            studyRoomRepository.flush(); // 중요: 삭제 명령을 즉시 DB에 적용
            log.info("자동 퇴실 처리 완료: {}개 좌석 삭제됨", expiredSeats.size());
        }

        // 4. 삭제가 완료된 후, '진짜' 남은 사용 중인 좌석들만 다시 조회해서 반환
        return studyRoomRepository.findByRoomIdAndIsOccupied(roomId, true)
                .stream()
                .map(StudyRoomResDto::from)
                .toList();
    }

    /** 퇴실 (MySQL 정보 즉시 삭제) */
    public void leaveSeat(Long assignId, Long userId) {
        StudyRoom studyRoom = studyRoomRepository.findById(assignId)
                .orElseThrow(() -> new IllegalArgumentException("예약 정보를 찾을 수 없습니다."));

        if (!studyRoom.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("본인의 좌석만 반납할 수 있습니다.");
        }

        // DB에서 데이터 완전 삭제
        studyRoomRepository.delete(studyRoom);
        log.info("수동 퇴실 완료: 데이터 삭제됨");
    }
}