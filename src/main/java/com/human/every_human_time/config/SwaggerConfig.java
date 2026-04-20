package com.human.every_human_time.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("🕰️ 에브리휴먼타임 API")
                        .description("""
                                에브리휴먼타임 대학생 커뮤니티 API 명세서
                                
                                [구현 기능]
                                - Auth      : 회원가입 / 로그인
                                - User      : 회원 정보 조회 / 수정
                                - Post      : 게시글 CRUD
                                - Comment   : 댓글 CRUD
                                - Schedule  : 시간표 관리    ← 구현 필요
                                - StudyRoom : 열람실 예약    ← 구현 필요
                                - Book      : 중고책 마켓    ← 구현 필요
                                - Message   : 쪽지 기능      ← 구현 필요
                                """)
                        .version("v1.0.0")
                        .contact(new Contact().name("2조 - 에브리휴먼타임")));
    }
}
