package com.human.every_human_time.repository;

import com.human.every_human_time.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    // 받은 쪽지함 (최신순)
    List<Message> findByReceiverUserIdOrderBySentAtDesc(Long receiverId);
    // 보낸 쪽지함
    List<Message> findBySenderUserIdOrderBySentAtDesc(Long senderId);
    // 안 읽은 쪽지 개수
    long countByReceiverUserIdAndIsRead(Long receiverId, Boolean isRead);
}
