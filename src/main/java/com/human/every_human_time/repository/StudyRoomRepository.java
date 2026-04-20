package com.human.every_human_time.repository;

import com.human.every_human_time.entity.StudyRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudyRoomRepository extends JpaRepository<StudyRoom, Long> {
    // 특정 열람실의 사용 중인 좌석 목록
    List<StudyRoom> findByRoomIdAndIsOccupied(Integer roomId, Boolean isOccupied);
    // 특정 열람실의 특정 좌석 조회 (중복 체크용)
    Optional<StudyRoom> findByRoomIdAndSeatNumAndIsOccupied(Integer roomId, Integer seatNum, Boolean isOccupied);
    // 특정 유저의 현재 예약
    Optional<StudyRoom> findByUserUserIdAndIsOccupied(Long userId, Boolean isOccupied);
}
