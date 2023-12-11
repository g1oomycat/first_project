import { client } from "./index";

export const orderDetails = async (order_details) => {
  const res = await client.post("/orderDetails", order_details);
  return res;
};
