import axios from "axios";
import type { Message } from "../types";
import { fetchJson } from "./fetchJson";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

export async function getMessages(token: string): Promise<Message[]> {
  const messages = await fetchJson<Message[]>(`${API_URL}/messages`, {
    method: "GET",
    headers: authHeaders(token)
  });

  if (!Array.isArray(messages)) {
    throw new Error("Сервер вернул некорректный список сообщений");
  }

  return messages;
}

export async function sendMessage(token: string, text: string): Promise<Message> {
  const response = await axios.post<Message>(
    `${API_URL}/messages`,
    { text },
    { headers: authHeaders(token) }
  );

  if (!response.data || typeof response.data !== "object" || Array.isArray(response.data)) {
    throw new Error("Сервер вернул некорректное сообщение");
  }

  return response.data;
}
