package com.human.base.repository;

import com.human.base.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 특정 게시글의 댓글 목록 (작성순)
    List<Comment> findByPostPostIdOrderByCreatedAtAsc(Long postId);

    // 특정 회원이 작성한 댓글 목록
    List<Comment> findByUserUserIdOrderByCreatedAtDesc(Long userId);
}
