package com.readflow.ms1.domain.service;

import com.readflow.ms1.domain.model.Category;
import com.readflow.ms1.domain.port.in.CategoryUseCase;
import com.readflow.ms1.domain.port.out.CategoryRepositoryPort;
import java.util.List;

public class CategoryService implements CategoryUseCase {

    private final CategoryRepositoryPort categoryRepository;

    public CategoryService(CategoryRepositoryPort categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
