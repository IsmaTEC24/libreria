package com.readflow.ms1.adapter.in.rest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.readflow.ms1.domain.model.Book;

public class BookResponseDTO {
    private Long id;
    private String userId;
    private String title;
    private String author;
    private String category;
    private String description;
    private String language;
    private String coverUrl;
    private String pdfUrl;
    private String pdfFileName;
    private Long pdfFileSize;
    private Integer totalPages;
    private String currentStatus;
    @JsonProperty("isPublic")
    private Boolean isPublic;

    public static BookResponseDTO from(Book book) {
        BookResponseDTO dto = new BookResponseDTO();
        dto.id = book.getId();
        dto.userId = book.getUserId();
        dto.title = book.getTitle();
        dto.author = book.getAuthor();
        dto.category = book.getCategory();
        dto.description = book.getDescription();
        dto.language = book.getLanguage();
        dto.coverUrl = book.getCoverUrl();
        dto.pdfUrl = book.getPdfUrl();
        dto.pdfFileName = book.getPdfFileName();
        dto.pdfFileSize = book.getPdfFileSize();
        dto.totalPages = book.getTotalPages();
        dto.currentStatus = book.getCurrentStatus();
        dto.isPublic = book.getIsPublic();
        return dto;
    }

    public Long getId() { return id; }
    public String getUserId() { return userId; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public String getLanguage() { return language; }
    public String getCoverUrl() { return coverUrl; }
    public String getPdfUrl() { return pdfUrl; }
    public String getPdfFileName() { return pdfFileName; }
    public Long getPdfFileSize() { return pdfFileSize; }
    public Integer getTotalPages() { return totalPages; }
    public String getCurrentStatus() { return currentStatus; }
    @JsonProperty("isPublic")
    public Boolean getIsPublic() { return isPublic; }
}
