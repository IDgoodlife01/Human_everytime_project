package com.human.base.repository;

import com.human.base.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 제목 키워드 검색
    List<Post> findByTitleContainingOrderByCreatedAtDesc(String keyword);

    // 특정 회원이 작성한 게시글 목록 (최신순)
    List<Post> findByUserUserIdOrderByCreatedAtDesc(Long userId);

    // 전체 목록 최신순
    List<Post> findAllByOrderByCreatedAtDesc();

    // 카테고리별 조회 (카테고리 사용하는 조만 활용)
    List<Post> findByCategoryOrderByCreatedAtDesc(String category);
}
