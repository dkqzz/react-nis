function getErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
    return data.message;
  }

  return `Ошибка запроса (HTTP ${status})`;
}

async function readResponseBody(response: Response): Promise<unknown> {
  const body = await response.text();

  if (!body.trim()) {
    throw new Error(`Сервер вернул пустой ответ (HTTP ${response.status})`);
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    throw new Error("Сервер вернул некорректный JSON");
  }
}

export async function fetchJson<T>(url: string, init: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, init);
  } catch {
    throw new Error("Не удалось подключиться к серверу");
  }

  const data = await readResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, response.status));
  }

  return data as T;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
