package com.human.every_human_time.service;

import com.human.every_human_time.dto.request.MessageReqDto;
import com.human.every_human_time.dto.response.MessageResDto;
import com.human.every_human_time.entity.Message;
import com.human.every_human_time.entity.User;
import com.human.every_human_time.repository.MessageRepository;
import com.human.every_human_time.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Slf4j @Service @RequiredArgsConstructor @Transactional
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    /** TODO: 쪽지 보내기 */
    public MessageResDto sendMessage(Long senderId, MessageReqDto dto) {
        // TODO: sender/receiver 유저 조회 →
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("보내는 사용자가 존재하지 않습니다."));

        User receiver = userRepository.findById(dto.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("받는 사용자가 존재하지 않습니다."));

        //  Message 엔티티 생성 →
        Message message = Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(dto.getContent())
                .isRead(false) // 처음엔 안 읽음
                .build();
        //  저장 →
        Message saved = messageRepository.save(message);
        log.info("쪽지 전송 완료: messageId={}, senderId={}, receiverId={}",
                saved.getMsgId(), senderId, dto.getReceiverId());
        //  MessageResDto 반환
        return MessageResDto.from(saved);
    }

    /** TODO: 받은 쪽지함 조회 */
    @Transactional(readOnly = true)
    public List<MessageResDto> getReceivedMessages(Long userId) {
        // TODO: findByReceiverUserIdOrderBySentAtDesc() 사용
        return messageRepository.findByReceiverUserIdOrderBySentAtDesc(userId)
                .stream()
                .map(MessageResDto::from)
                .toList();
    }

    /** TODO: 쪽지 읽음 처리 */
    public MessageResDto readMessage(Long msgId, Long userId) {
        // TODO: findById() →
        Message message = messageRepository.findById(msgId)
                .orElseThrow(() -> new IllegalArgumentException("쪽지가 존재하지 않습니다."));
        //  userId(receiver) 검증 →
        if (!message.getReceiver().getUserId().equals(userId)) {
            throw new IllegalArgumentException("읽기 권한이 없습니다.");
        }
        //  isRead = true →
        message.setIsRead(true);
        //  저장
        Message saved = messageRepository.save(message);

        log.info("쪽지 읽음 처리 완료: messageId={}", msgId);

        return MessageResDto.from(saved);
    }
}
