package com.readflow.ms1.domain.port.out;

import com.readflow.ms1.domain.model.Book;
import java.util.List;
import java.util.Optional;

public interface BookRepositoryPort {
    List<Book> findAll();
    Optional<Book> findById(Long id);
    Book save(Book book);
    void deleteById(Long id);
    boolean existsById(Long id);
}
