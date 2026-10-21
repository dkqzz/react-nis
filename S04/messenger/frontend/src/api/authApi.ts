import axios from "axios";
import type { User } from "../types";
import { isRecord } from "./fetchJson";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

export type LoginPayload = {
  phone: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export async function login({ phone, password }: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/auth/login`,
    { phone, password },
    { headers: { "Content-Type": "application/json" } }
  );

  const data = response.data;
  if (!isRecord(data) || typeof data.token !== "string" || !isRecord(data.user)) {
    throw new Error("Сервер вернул некорректные данные авторизации");
  }

  return data as LoginResponse;
}
