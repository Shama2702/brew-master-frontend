import { API_BASE_URL } from "../../config";
import { getToken } from "@/helper/token";
import { IAdminOrder } from "@/types/order.type";

export const serviceGetOrders = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.msg);
  }

  return result.data as IAdminOrder[];
};

export const serviceUpdateOrderStatus = async (id: string, data: any) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/admin/order/${id}/status`, {
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

  return result.data as IAdminOrder;
};
