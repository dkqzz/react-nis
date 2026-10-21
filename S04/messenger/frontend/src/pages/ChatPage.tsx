import React, { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../api/messageApi";
import { connectSocket } from "../api/socketClient";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import { handleError } from "../helpers/handleError";
import type { Message } from "../types";

type Props = {
  token: string;
};

export function ChatPage({ token }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [socketStatus, setSocketStatus] = useState<string>("disconnected");

  useEffect(() => {
    let cancelled = false;

    const addUniqueMessage = (message: Message) => {
      setMessages((currentMessages) => {
        if (currentMessages.some((currentMessage) => currentMessage.id === message.id)) {
          return currentMessages;
        }

        return [...currentMessages, message];
      });
    };

    const client = connectSocket(token, {
      onMessage: (message) => {
        if (!cancelled) {
          addUniqueMessage(message);
        }
      },
      onStatus: (status) => {
        if (!cancelled) {
          setSocketStatus(status);
        }
      }
    });

    const loadMessages = async () => {
      setLoading(true);
      setError("");

      try {
        const history = await getMessages(token);
        if (cancelled) return;

        setMessages((currentMessages) => {
          const messagesById = new Map(history.map((message) => [message.id, message]));
          currentMessages.forEach((message) => messagesById.set(message.id, message));
          return Array.from(messagesById.values());
        });
      } catch (requestError) {
        if (!cancelled) {
          setError(handleError(requestError));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadMessages();

    return () => {
      cancelled = true;
      client.disconnect();
    };
  }, [token]);

  const handleSend = async (text: string): Promise<boolean> => {
    setSending(true);
    setError("");

    try {
      const createdMessage = await sendMessage(token, text);
      setMessages((currentMessages) => {
        if (currentMessages.some((message) => message.id === createdMessage.id)) {
          return currentMessages;
        }

        return [...currentMessages, createdMessage];
      });
      return true;
    } catch (requestError) {
      setError(handleError(requestError));
      return false;
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      <p>Статус сокета: {socketStatus}</p>
      {loading ? <p>Загрузка сообщений...</p> : null}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
      <MessageList messages={messages} />
      <MessageInput
        onSend={handleSend}
        disabled={socketStatus !== "connected" || loading || sending}
      />
    </div>
  );
}

export default ChatPage;
