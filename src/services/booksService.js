const SUBSCRIPTION_KEY = "b23b54a59f4f449eb64d507b55ea93e3";
const API_BASE_URL = "https://librosapi.azure-api.net/v1";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
};

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: options.headers || defaultHeaders,
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}

/* USERS */
export function getUsers() {
  return apiRequest("/users", {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

export function getUserById(id) {
  return apiRequest(`/users/${id}`, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

export function createUser(user) {
  return apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function updateUser(id, user) {
  return apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

export function deleteUser(id) {
  return apiRequest(`/users/${id}`, {
    method: "DELETE",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

/* CATEGORIES */
export function getCategories() {
  return apiRequest("/categories", {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

/* BOOKS */
export function getBooks() {
  return apiRequest("/books", {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

export function getBookById(id) {
  return apiRequest(`/books/${id}`, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

export function createBook(book) {
  return apiRequest("/books", {
    method: "POST",
    body: JSON.stringify(book),
  });
}

export function updateBook(id, book) {
  return apiRequest(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(book),
  });
}

export function deleteBook(id) {
  return apiRequest(`/books/${id}`, {
    method: "DELETE",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

/* READING PROGRESS */
export function getReadingProgress() {
  return apiRequest("/reading-progress", {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

export function getReadingProgressById(id) {
  return apiRequest(`/reading-progress/${id}`, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

export function createReadingProgress(progress) {
  return apiRequest("/reading-progress", {
    method: "POST",
    body: JSON.stringify(progress),
  });
}

export function updateReadingProgress(id, progress) {
  return apiRequest(`/reading-progress/${id}`, {
    method: "PUT",
    body: JSON.stringify(progress),
  });
}

export function deleteReadingProgress(id) {
  return apiRequest(`/reading-progress/${id}`, {
    method: "DELETE",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

/* FAVORITES */
export function getFavorites() {
  return apiRequest("/favorites", {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

export function getFavoriteById(id) {
  return apiRequest(`/favorites/${id}`, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}

export function createFavorite(favorite) {
  return apiRequest("/favorites", {
    method: "POST",
    body: JSON.stringify(favorite),
  });
}

export function deleteFavorite(id) {
  return apiRequest(`/favorites/${id}`, {
    method: "DELETE",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
    },
  });
}