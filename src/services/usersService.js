const SUBSCRIPTION_KEY = "b23b54a59f4f449eb64d507b55ea93e3";
const API_BASE_URL = "https://librosapi.azure-api.net/v1/books";

const jsonHeaders = {
  "Content-Type": "application/json",
  "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
};

const authHeaders = {
  "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
};

async function handleResponse(response) {
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status} - ${text}`);
  }

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function getUsers() {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: authHeaders,
  });

  const data = await handleResponse(response);
  console.log("getUsers response:", data);
  return data;
}

export async function getUserById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "GET",
    headers: authHeaders,
  });

  const data = await handleResponse(response);
  console.log("getUserById response:", data);
  return data;
}

export async function createUser(user) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(user),
  });

  return handleResponse(response);
}

export async function updateUser(id, user) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(user),
  });

  return handleResponse(response);
}

export async function deleteUser(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders,
  });

  return handleResponse(response);
}