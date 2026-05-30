package com.readflow.ms1.adapter.out.persistence;

import com.readflow.ms1.adapter.out.persistence.entity.CategoryJpaEntity;
import com.readflow.ms1.adapter.out.persistence.repository.JpaCategoryRepository;
import com.readflow.ms1.domain.model.Category;
import com.readflow.ms1.domain.port.out.CategoryRepositoryPort;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JpaCategoryRepositoryAdapter implements CategoryRepositoryPort {

    private final JpaCategoryRepository jpaRepository;

    public JpaCategoryRepositoryAdapter(JpaCategoryRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public List<Category> findAll() {
        return jpaRepository.findAll().stream()
            .map(e -> new Category(e.getId(), e.getName(), e.getLabel()))
            .collect(Collectors.toList());
    }

    @Override
    public long count() {
        return jpaRepository.count();
    }

    @Override
    public void saveAll(List<Category> categories) {
        List<CategoryJpaEntity> entities = categories.stream()
            .map(c -> new CategoryJpaEntity(c.getId(), c.getName(), c.getLabel()))
            .collect(Collectors.toList());
        jpaRepository.saveAll(entities);
    }
}
