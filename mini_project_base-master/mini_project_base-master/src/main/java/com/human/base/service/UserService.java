package com.human.base.service;

import com.human.base.dto.request.UserUpdateReqDto;
import com.human.base.dto.response.UserResDto;
import com.human.base.entity.User;
import com.human.base.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원 단건 조회
    @Transactional(readOnly = true)
    public UserResDto getUser(Long userId) {
        User user = findUserById(userId);
        return UserResDto.from(user);
    }

    // 회원 정보 수정 (이름, 비밀번호)
    public UserResDto updateUser(Long userId, UserUpdateReqDto dto) {
        User user = findUserById(userId);

        // 이름 변경
        if (dto.getName() != null && !dto.getName().isBlank()) {
            user.setName(dto.getName());
        }

        // 비밀번호 변경 (입력한 경우에만)
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        userRepository.save(user);
        log.info("회원 정보 수정 완료: userId={}", userId);
        return UserResDto.from(user);
    }

    // 공통 조회 메서드
    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다. userId=" + userId));
    }
}
