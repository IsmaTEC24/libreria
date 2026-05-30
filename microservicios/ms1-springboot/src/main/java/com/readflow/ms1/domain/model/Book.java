package com.readflow.ms1.domain.model;

public class Book {
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
    private Boolean isPublic;

    public Book() {}

    public Book(Long id, String userId, String title, String author, String category,
                String description, String language, String coverUrl, String pdfUrl,
                String pdfFileName, Long pdfFileSize, Integer totalPages,
                String currentStatus, Boolean isPublic) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.language = language;
        this.coverUrl = coverUrl;
        this.pdfUrl = pdfUrl;
        this.pdfFileName = pdfFileName;
        this.pdfFileSize = pdfFileSize;
        this.totalPages = totalPages;
        this.currentStatus = currentStatus;
        this.isPublic = isPublic;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getCoverUrl() { return coverUrl; }
    public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }
    public String getPdfUrl() { return pdfUrl; }
    public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }
    public String getPdfFileName() { return pdfFileName; }
    public void setPdfFileName(String pdfFileName) { this.pdfFileName = pdfFileName; }
    public Long getPdfFileSize() { return pdfFileSize; }
    public void setPdfFileSize(Long pdfFileSize) { this.pdfFileSize = pdfFileSize; }
    public Integer getTotalPages() { return totalPages; }
    public void setTotalPages(Integer totalPages) { this.totalPages = totalPages; }
    public String getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
}
