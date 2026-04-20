package com.human.every_human_time.dto.response;

import com.human.every_human_time.entity.Message;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder; import lombok.Getter;
import java.time.LocalDateTime;

@Getter @Builder @Schema(description = "쪽지 응답 DTO")
public class MessageResDto {
    private Long msgId;
    private Long senderId;
    private String senderName;
    private Long receiverId;
    private String receiverName;
    private String content;
    private LocalDateTime sentAt;
    private Boolean isRead;

    public static MessageResDto from(Message m) {
        return MessageResDto.builder()
                .msgId(m.getMsgId()).senderId(m.getSender().getUserId())
                .senderName(m.getSender().getName()).receiverId(m.getReceiver().getUserId())
                .receiverName(m.getReceiver().getName()).content(m.getContent())
                .sentAt(m.getSentAt()).isRead(m.getIsRead()).build();
    }
}
