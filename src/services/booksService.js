const SUBSCRIPTION_KEY = "b23b54a59f4f449eb64d507b55ea93e3";
const API_BASE_URL = "https://librosapi.azure-api.net/v1/books";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY
};

export async function getBooks() {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}

export async function getBookById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}

export async function createBook(book) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(book)
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}

export async function updateBook(id, book) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(book)
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}

export async function deleteBook(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}