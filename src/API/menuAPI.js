import { client } from "./index";

export const getProducts = async () => {
  const res = await client.get("/products");
  return res;
};
