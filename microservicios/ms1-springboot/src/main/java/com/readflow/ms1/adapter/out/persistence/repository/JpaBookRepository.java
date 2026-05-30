package com.readflow.ms1.adapter.out.persistence.repository;

import com.readflow.ms1.adapter.out.persistence.entity.BookJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaBookRepository extends JpaRepository<BookJpaEntity, Long> {}
