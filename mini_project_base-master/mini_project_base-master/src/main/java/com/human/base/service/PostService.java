package com.human.base.service;

import com.human.base.dto.request.PostReqDto;
import com.human.base.dto.response.PostResDto;
import com.human.base.entity.Post;
import com.human.base.entity.User;
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
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 게시글 등록
    public PostResDto savePost(PostReqDto dto) {
        User user = findUserById(dto.getUserId());

        Post post = Post.builder()
                .user(user)
                .title(dto.getTitle())
                .content(dto.getContent())
                .category(dto.getCategory())
                .build();

        Post saved = postRepository.save(post);
        log.info("게시글 등록 완료: postId={}, userId={}", saved.getPostId(), dto.getUserId());
        return PostResDto.from(saved);
    }

    // 전체 목록 조회 (최신순)
    @Transactional(readOnly = true)
    public List<PostResDto> getPostList() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PostResDto::from)
                .collect(Collectors.toList());
    }

    // 단건 조회
    @Transactional(readOnly = true)
    public PostResDto getPost(Long postId) {
        Post post = findPostById(postId);
        return PostResDto.from(post);
    }

    // 내 게시글 목록
    @Transactional(readOnly = true)
    public List<PostResDto> getMyPostList(Long userId) {
        return postRepository.findByUserUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(PostResDto::from)
                .collect(Collectors.toList());
    }

    // 제목 키워드 검색
    @Transactional(readOnly = true)
    public List<PostResDto> searchPost(String keyword) {
        return postRepository.findByTitleContainingOrderByCreatedAtDesc(keyword)
                .stream()
                .map(PostResDto::from)
                .collect(Collectors.toList());
    }

    // 카테고리별 조회
    @Transactional(readOnly = true)
    public List<PostResDto> getPostListByCategory(String category) {
        return postRepository.findByCategoryOrderByCreatedAtDesc(category)
                .stream()
                .map(PostResDto::from)
                .collect(Collectors.toList());
    }

    // 게시글 수정 (작성자 본인만 가능)
    public PostResDto updatePost(Long postId, PostReqDto dto) {
        Post post = findPostById(postId);

        // 작성자 본인 확인
        if (!post.getUser().getUserId().equals(dto.getUserId())) {
            throw new IllegalArgumentException("게시글 수정 권한이 없습니다.");
        }

        if (dto.getTitle() != null && !dto.getTitle().isBlank()) {
            post.setTitle(dto.getTitle());
        }
        if (dto.getContent() != null && !dto.getContent().isBlank()) {
            post.setContent(dto.getContent());
        }
        if (dto.getCategory() != null) {
            post.setCategory(dto.getCategory());
        }

        Post saved = postRepository.save(post);
        log.info("게시글 수정 완료: postId={}", postId);
        return PostResDto.from(saved);
    }

    // 게시글 삭제 (작성자 본인만 가능)
    public void deletePost(Long postId, Long userId) {
        Post post = findPostById(postId);

        // 작성자 본인 확인
        if (!post.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("게시글 삭제 권한이 없습니다.");
        }

        postRepository.delete(post);
        log.info("게시글 삭제 완료: postId={}", postId);
    }

    // 공통 조회 메서드
    private Post findPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다. postId=" + postId));
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다. userId=" + userId));
    }
}
