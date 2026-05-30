package com.readflow.ms1.adapter.out.persistence.repository;

import com.readflow.ms1.adapter.out.persistence.entity.CategoryJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCategoryRepository extends JpaRepository<CategoryJpaEntity, Long> {}
