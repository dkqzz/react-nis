import type { Message } from "../types";
import { isRecord } from "./fetchJson";

const WS_URL = import.meta.env?.VITE_WS_URL || "ws://localhost:3001";

type SocketCallbacks = {
  onMessage?: (message: Message) => void;
  onStatus?: (status: string) => void;
};

export type SocketClient = {
  sendMessage: (text: string) => void;
  disconnect: () => void;
};

function isMessage(value: unknown): value is Message {
  if (!isRecord(value)) return false;

  return ["id", "userId", "author", "text", "createdAt"].every(
    (key) => typeof value[key] === "string"
  );
}

export function connectSocket(token: string, { onMessage, onStatus }: SocketCallbacks = {}): SocketClient {
  const socket = new WebSocket(WS_URL);

  socket.addEventListener("open", () => onStatus?.("connected"));
  socket.addEventListener("close", () => onStatus?.("disconnected"));
  socket.addEventListener("error", () => onStatus?.("disconnected"));
  socket.addEventListener("message", (event) => {
    let data: unknown;

    try {
      data = JSON.parse(String(event.data)) as unknown;
    } catch {
      return;
    }

    if (!isRecord(data) || data.type !== "message:new" || !isMessage(data.payload)) {
      return;
    }

    onMessage?.(data.payload);
  });

  return {
    sendMessage(text: string) {
      const normalizedText = text.trim();
      if (!normalizedText) {
        throw new Error("Текст сообщения не может быть пустым");
      }

      if (socket.readyState !== WebSocket.OPEN) {
        throw new Error("Соединение с чатом не установлено");
      }

      socket.send(
        JSON.stringify({
          type: "message:send",
          payload: { text: normalizedText, token }
        })
      );
    },
    disconnect() {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    }
  };
}
