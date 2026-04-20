package com.human.base.config;

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
                        .title("Mini Project Base API")
                        .description("""
                                Spring Boot + JPA 미니프로젝트 공통 백엔드 API
                                
                                [공통 기능]
                                - Auth  : 회원가입 / 로그인
                                - User  : 회원 정보 조회 / 수정
                                - Post  : 게시글 CRUD + 검색
                                - Comment : 댓글 CRUD
                                """)
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Human IT")
                                .email("admin@human.com")));
    }
}
