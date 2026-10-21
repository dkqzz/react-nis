import axios from "axios";
import type { User } from "../types";
import { fetchJson, isRecord } from "./fetchJson";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function getProfile(token: string): Promise<User> {
  const profile = await fetchJson<User>(`${API_URL}/users/me`, {
    method: "GET",
    headers: authHeaders(token)
  });

  if (!isRecord(profile)) {
    throw new Error("Сервер вернул некорректный профиль");
  }

  return profile as User;
}

export type UpdateProfilePayload = Partial<Pick<User, "nickname" | "bio">>;

export async function updateProfile(token: string, { nickname, bio }: UpdateProfilePayload): Promise<User> {
  const response = await axios.put<User>(
    `${API_URL}/users/me`,
    { nickname, bio },
    { headers: authHeaders(token) }
  );

  if (!isRecord(response.data)) {
    throw new Error("Сервер вернул некорректный профиль");
  }

  return response.data as User;
}
