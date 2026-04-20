package com.human.every_human_time.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * 쪽지 엔티티
 * User(N:1) - sender(보낸 사람), receiver(받은 사람)
 * TODO: MessageService 메서드를 구현하세요.
 */
@Entity @Table(name = "messages")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder @ToString
public class Message {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "msg_id") private Long msgId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;            // 보낸 사람

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;          // 받은 사람

    @Lob @Column(nullable = false)
    private String content;         // 쪽지 내용

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(name = "is_read")
    @Builder.Default
    private Boolean isRead = false; // 읽음 여부

    @PrePersist public void prePersist() { this.sentAt = LocalDateTime.now(); }
}
