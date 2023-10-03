import axios from "axios";
import { Product } from "@/types";

export const getProducts = async (shopId: string) => {
  const { data } = await axios.get(`/api/shop/${shopId}/product`);
  return data.products as Product[];
};
