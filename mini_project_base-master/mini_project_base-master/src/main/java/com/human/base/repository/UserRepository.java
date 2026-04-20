package com.human.base.repository;

import com.human.base.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일로 회원 조회 (로그인, 중복체크)
    Optional<User> findByEmail(String email);

    // 이메일 존재 여부 확인 (중복가입 방지)
    boolean existsByEmail(String email);
}
