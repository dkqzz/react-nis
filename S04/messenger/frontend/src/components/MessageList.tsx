import React from "react";
import type { Message } from "../types";

type Props = {
  messages: Message[];
};

export function MessageList({ messages }: Props) {
  if (!messages?.length) {
    return <p>Нет сообщений</p>;
  }

  return (
    <ul aria-label="Список сообщений" style={{ listStyle: "none", padding: 0, display: "grid", gap: "12px" }}>
      {messages.map((message) => {
        const date = new Date(message.createdAt);
        const formattedDate = Number.isNaN(date.getTime())
          ? message.createdAt
          : date.toLocaleString("ru-RU");

        return (
          <li key={message.id} style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "8px" }}>
            <div>
              <strong>{message.author}</strong>
              <time dateTime={message.createdAt} style={{ marginLeft: "8px", color: "#666" }}>
                {formattedDate}
              </time>
            </div>
            <div>{message.text}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default MessageList;
