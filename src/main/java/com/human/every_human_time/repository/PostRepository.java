package com.human.every_human_time.repository;

import com.human.every_human_time.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreatedAtDesc();
    List<Post> findByTitleContainingOrderByCreatedAtDesc(String keyword);
    List<Post> findByUserUserIdOrderByCreatedAtDesc(Long userId);
    List<Post> findByCategoryOrderByCreatedAtDesc(String category);
}
