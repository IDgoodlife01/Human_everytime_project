package com.human.every_human_time.repository;

import com.human.every_human_time.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostPostIdOrderByCreatedAtAsc(Long postId);
}
