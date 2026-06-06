import { getToken } from "./authToken.js";

const SUBSCRIPTION_KEY = import.meta.env.VITE_API_SUBSCRIPTION_KEY;
const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
  };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

export async function getMe() {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}

export async function getUserByFirebaseUid(uid) {
  const response = await fetch(`${API_BASE_URL}/firebase/${encodeURIComponent(uid)}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}

export async function getUserById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}

export async function createUser(user) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}

export async function updateUser(id, user) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}
