package com.readflow.ms1.domain.port.out;

import com.readflow.ms1.domain.model.Category;
import java.util.List;

public interface CategoryRepositoryPort {
    List<Category> findAll();
    long count();
    void saveAll(List<Category> categories);
    Category save(Category category);
}
