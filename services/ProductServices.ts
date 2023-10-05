import axios from "axios";
import { Product } from "@/types";

export const getProducts = async (shopId: string) => {
  const { data } = await axios.get(`/api/shop/${shopId}/product`);
  return data.products as Product[];
};

export const getInfiniteProducts = async (
  shopId: string,
  limit: number,
  skip: number = 0
) => {
  console.log("skip", skip);

  const { data } = await axios.get(
    `/api/shop/${shopId}/infinite-product?limit=${limit}&skip=${skip}`
  );
  return {
    rows: data.products,
    nextSkip: data.nextSkip,
  };
};
