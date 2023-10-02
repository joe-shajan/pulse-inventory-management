import axios from "axios";
import { Shop } from "@/types";

export const getAllShops = async () => {
  const response = await axios.get("/api/shop");
  return response.data.shops as Shop[];
};
