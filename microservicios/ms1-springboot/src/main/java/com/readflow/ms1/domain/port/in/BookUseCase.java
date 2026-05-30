package com.readflow.ms1.domain.port.in;

import com.readflow.ms1.domain.model.Book;
import java.util.List;
import java.util.Optional;

public interface BookUseCase {
    List<Book> getAllBooks();
    Optional<Book> getBookById(Long id);
    Book createBook(Book book);
    Book updateBook(Long id, Book updates);
    void deleteBook(Long id);
}
