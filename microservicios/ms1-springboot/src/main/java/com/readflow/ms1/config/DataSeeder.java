package com.readflow.ms1.config;

import com.readflow.ms1.domain.model.Category;
import com.readflow.ms1.domain.port.out.CategoryRepositoryPort;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepositoryPort categoryRepository;

    public DataSeeder(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) return;

        categoryRepository.saveAll(List.of(
            new Category(null, "Ficcion", "Ficción"),
            new Category(null, "No Ficcion", "No Ficción"),
            new Category(null, "Ciencia", "Ciencia"),
            new Category(null, "Historia", "Historia"),
            new Category(null, "Tecnologia", "Tecnología"),
            new Category(null, "Literatura", "Literatura"),
            new Category(null, "Filosofia", "Filosofía"),
            new Category(null, "Arte", "Arte")
        ));
    }
}
