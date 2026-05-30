package com.readflow.ms1.adapter.out.persistence;

import com.readflow.ms1.adapter.out.persistence.entity.BookJpaEntity;
import com.readflow.ms1.adapter.out.persistence.repository.JpaBookRepository;
import com.readflow.ms1.domain.model.Book;
import com.readflow.ms1.domain.port.out.BookRepositoryPort;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JpaBookRepositoryAdapter implements BookRepositoryPort {

    private final JpaBookRepository jpaRepository;

    public JpaBookRepositoryAdapter(JpaBookRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public List<Book> findAll() {
        return jpaRepository.findAll().stream().map(this::toDomain).collect(Collectors.toList());
    }

    @Override
    public Optional<Book> findById(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public Book save(Book book) {
        return toDomain(jpaRepository.save(toEntity(book)));
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaRepository.existsById(id);
    }

    private Book toDomain(BookJpaEntity e) {
        return new Book(e.getId(), e.getUserId(), e.getTitle(), e.getAuthor(), e.getCategory(),
                        e.getDescription(), e.getLanguage(), e.getCoverUrl(), e.getPdfUrl(),
                        e.getPdfFileName(), e.getPdfFileSize(), e.getTotalPages(),
                        e.getCurrentStatus(), e.getIsPublic());
    }

    private BookJpaEntity toEntity(Book b) {
        BookJpaEntity e = new BookJpaEntity();
        e.setId(b.getId());
        e.setUserId(b.getUserId());
        e.setTitle(b.getTitle());
        e.setAuthor(b.getAuthor());
        e.setCategory(b.getCategory());
        e.setDescription(b.getDescription());
        e.setLanguage(b.getLanguage());
        e.setCoverUrl(b.getCoverUrl());
        e.setPdfUrl(b.getPdfUrl());
        e.setPdfFileName(b.getPdfFileName());
        e.setPdfFileSize(b.getPdfFileSize());
        e.setTotalPages(b.getTotalPages());
        e.setCurrentStatus(b.getCurrentStatus());
        e.setIsPublic(b.getIsPublic());
        return e;
    }
}
