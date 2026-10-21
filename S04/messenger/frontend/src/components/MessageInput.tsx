import React, { useState } from "react";

type Props = {
  onSend: (text: string) => boolean | void | Promise<boolean | void>;
  disabled?: boolean;
};

export function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedText = text.trim();
    if (!normalizedText || disabled) return;

    const sent = await onSend(normalizedText);
    if (sent !== false) {
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        aria-label="Сообщение"
        placeholder="Введите сообщение"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !text.trim()}>
        Отправить
      </button>
    </form>
  );
}

export default MessageInput;
