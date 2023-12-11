import { client } from "./index";

export const login = async (email, password) => {
  const res = await client.post("/login", { email: email, password: password });
  return res;
};
export const registerDB = async (user) => {
  const res = await client.post("/users", user);
  return res;
};
export const deleteUser = async (id) => {
  const res = await client.delete("/users/" + id);
  return res;
};
export const changeNumber = async (id, number) => {
  const res = await client.patch("/users/" + id, { phone_number: number });
  return res;
};
export const changeFirstName = async (id, name) => {
  const res = await client.patch("/users/" + id, { first_name: name });
  return res;
};
export const changeLastName = async (id, last_name) => {
  const res = await client.patch("/users/" + id, { last_name: last_name });
  return res;
};
export const changePassword = async (id, password) => {
  const res = await client.patch("/users/" + id, { password: password });
  return res;
};
export const changeEmail = async (id, email) => {
  const res = await client.patch("/users/" + id, { email: email });
  return res;
};
export const changeAdress = async (
  id,
  user_street,
  user_housing,
  user_apartament,
  user_entrance,
  user_floor,
  user_balance
) => {
  const res = await client.patch("/users/" + id, {
    user_street: user_street || "Не указано",
    user_housing: user_housing || "Не указано",
    user_apartament: user_apartament || "Не указано",
    user_entrance: user_entrance || "Не указано",
    user_floor: user_floor || "Не указано",
    user_balance: user_balance,
  });
  return res;
};
