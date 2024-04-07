import { API_BASE_URL } from "../../config";
import { IMe } from "@/types/auth.type";
import { getToken, setToken } from "@/helper/token";

export const serviceLogin = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.msg);
  }

  setToken(result.token);
  return result.data as IMe;
};

export const serviceRegisterUser = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.msg);
  }

  setToken(result.token);
  return result.data as IMe;
};

export const serviceAuth = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.msg);
  }

  return result.data as IMe;
};
