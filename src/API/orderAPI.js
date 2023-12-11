import { client } from "./index";

export const orders = async (order) => {
  const res = await client.post("/orders", order);
  return res;
};
