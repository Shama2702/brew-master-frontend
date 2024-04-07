import { API_BASE_URL } from "../../config";
import { getToken } from "@/helper/token";

export const serviceAddCoffee = async (data: any) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/coffee`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.msg);
  }

  return;
};

export const serviceUpdateCoffee = async (id: string, data: any) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/coffee/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.msg);
  }

  return;
};

export const serviceDeleteCoffee = async (id: string) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/coffee/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.msg);
  }
  return;
};
