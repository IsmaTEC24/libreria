package com.readflow.ms1.domain.port.in;

import com.readflow.ms1.domain.model.Category;
import java.util.List;

public interface CategoryUseCase {
    List<Category> getAllCategories();
    Category createCategory(Category category);
}
