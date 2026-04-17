import { getUsers } from "./booksService.js";

export async function loginUser(email, password) {
  const users = await getUsers();

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    throw new Error("Correo o contraseña incorrectos");
  }

  return user;
}