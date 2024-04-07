import { API_BASE_URL } from "../../config";
import { ICoffee } from "@/types/coffee.type";

export const serviceFetchMenus = async () => {
  const response = await fetch(`${API_BASE_URL}/coffee`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.msg);
  }

  return result.data as ICoffee[];
};
