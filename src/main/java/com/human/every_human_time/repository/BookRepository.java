package com.human.every_human_time.repository;

import com.human.every_human_time.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // 판매 상태별 조회 (판매중 / 판매완료)
    List<Book> findByStatusOrderByCreatedAtDesc(String status);
    // 특정 유저가 등록한 책 목록
    List<Book> findByUserUserIdOrderByCreatedAtDesc(Long userId);
    // 제목 검색
    List<Book> findByTitleContainingOrderByCreatedAtDesc(String title);
}
