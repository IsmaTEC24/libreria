package com.readflow.ms1.config;

import com.readflow.ms1.domain.port.in.BookUseCase;
import com.readflow.ms1.domain.port.in.CategoryUseCase;
import com.readflow.ms1.domain.port.out.BookRepositoryPort;
import com.readflow.ms1.domain.port.out.CategoryRepositoryPort;
import com.readflow.ms1.domain.service.BookService;
import com.readflow.ms1.domain.service.CategoryService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public BookUseCase bookUseCase(BookRepositoryPort bookRepository) {
        return new BookService(bookRepository);
    }

    @Bean
    public CategoryUseCase categoryUseCase(CategoryRepositoryPort categoryRepository) {
        return new CategoryService(categoryRepository);
    }
}
