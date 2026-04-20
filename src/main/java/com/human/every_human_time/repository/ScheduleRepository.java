package com.human.every_human_time.repository;

import com.human.every_human_time.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // 특정 유저의 시간표 전체 조회
    List<Schedule> findByUserUserId(Long userId);
    // 특정 유저의 특정 요일 시간표
    List<Schedule> findByUserUserIdAndDay(Long userId, String day);
    // TODO: 시간 중복 체크를 위한 쿼리 추가 가능
}
