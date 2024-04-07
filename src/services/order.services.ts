import { API_BASE_URL } from "../../config";
import { IOrder } from "@/types/order.type";
import { getToken } from "../helper/token";

export const serviceGetOrders = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.msg);
  }

  return result.data as IOrder[];
};

export const serviceCreateOrder = async (data: any) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/order`, {
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

export const serviceGetOrder = async (orderId: string) => {
  const response = await fetch(`${API_BASE_URL}/order/${orderId}`, {
    method: "GET",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.msg);
  }

  return result.data as IOrder;
};
