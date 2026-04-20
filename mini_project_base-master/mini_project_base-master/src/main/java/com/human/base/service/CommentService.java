package com.human.base.service;

import com.human.base.dto.request.CommentReqDto;
import com.human.base.dto.response.CommentResDto;
import com.human.base.entity.Comment;
import com.human.base.entity.Post;
import com.human.base.entity.User;
import com.human.base.repository.CommentRepository;
import com.human.base.repository.PostRepository;
import com.human.base.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 댓글 등록
    public CommentResDto saveComment(Long postId, CommentReqDto dto) {
        Post post = findPostById(postId);
        User user = findUserById(dto.getUserId());

        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(dto.getContent())
                .build();

        Comment saved = commentRepository.save(comment);
        log.info("댓글 등록 완료: commentId={}, postId={}", saved.getCommentId(), postId);
        return CommentResDto.from(saved);
    }

    // 특정 게시글 댓글 목록 조회
    @Transactional(readOnly = true)
    public List<CommentResDto> getCommentList(Long postId) {
        findPostById(postId);  // 게시글 존재 확인
        return commentRepository.findByPostPostIdOrderByCreatedAtAsc(postId)
                .stream()
                .map(CommentResDto::from)
                .collect(Collectors.toList());
    }

    // 댓글 수정 (작성자 본인만)
    public CommentResDto updateComment(Long commentId, CommentReqDto dto) {
        Comment comment = findCommentById(commentId);

        // 작성자 본인 확인
        if (!comment.getUser().getUserId().equals(dto.getUserId())) {
            throw new IllegalArgumentException("댓글 수정 권한이 없습니다.");
        }

        comment.setContent(dto.getContent());
        Comment saved = commentRepository.save(comment);
        log.info("댓글 수정 완료: commentId={}", commentId);
        return CommentResDto.from(saved);
    }

    // 댓글 삭제 (작성자 본인만)
    public void deleteComment(Long commentId, Long userId) {
        Comment comment = findCommentById(commentId);

        // 작성자 본인 확인
        if (!comment.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("댓글 삭제 권한이 없습니다.");
        }

        commentRepository.delete(comment);
        log.info("댓글 삭제 완료: commentId={}", commentId);
    }

    // 공통 조회 메서드
    private Comment findCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다. commentId=" + commentId));
    }

    private Post findPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다. postId=" + postId));
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다. userId=" + userId));
    }
}
