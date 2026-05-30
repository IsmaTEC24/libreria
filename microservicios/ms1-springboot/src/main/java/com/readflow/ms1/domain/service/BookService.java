package com.readflow.ms1.domain.service;

import com.readflow.ms1.domain.model.Book;
import com.readflow.ms1.domain.port.in.BookUseCase;
import com.readflow.ms1.domain.port.out.BookRepositoryPort;
import java.util.List;
import java.util.Optional;

public class BookService implements BookUseCase {

    private final BookRepositoryPort bookRepository;

    public BookService(BookRepositoryPort bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book updates) {
        Book existing = bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found: " + id));

        if (updates.getUserId() != null) existing.setUserId(updates.getUserId());
        if (updates.getTitle() != null) existing.setTitle(updates.getTitle());
        if (updates.getAuthor() != null) existing.setAuthor(updates.getAuthor());
        if (updates.getCategory() != null) existing.setCategory(updates.getCategory());
        if (updates.getDescription() != null) existing.setDescription(updates.getDescription());
        if (updates.getLanguage() != null) existing.setLanguage(updates.getLanguage());
        if (updates.getCoverUrl() != null) existing.setCoverUrl(updates.getCoverUrl());
        if (updates.getPdfUrl() != null) existing.setPdfUrl(updates.getPdfUrl());
        if (updates.getPdfFileName() != null) existing.setPdfFileName(updates.getPdfFileName());
        if (updates.getPdfFileSize() != null) existing.setPdfFileSize(updates.getPdfFileSize());
        if (updates.getTotalPages() != null) existing.setTotalPages(updates.getTotalPages());
        if (updates.getCurrentStatus() != null) existing.setCurrentStatus(updates.getCurrentStatus());
        if (updates.getIsPublic() != null) existing.setIsPublic(updates.getIsPublic());

        return bookRepository.save(existing);
    }

    @Override
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found: " + id);
        }
        bookRepository.deleteById(id);
    }
}
