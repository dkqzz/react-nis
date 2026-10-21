import React, { useState } from "react";
import { login } from "../api/authApi";
import { handleError } from "../helpers/handleError";
import { setToken } from "../helpers/authStorage";
import type { User } from "../types";

type Props = {
  onLogin: (token: string, user: User) => void;
};

export function LoginPage({ onLogin }: Props) {
  const [phone, setPhone] = useState<string>("+79990000000");
  const [password, setPassword] = useState<string>("123456");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedPhone = phone.trim();

    if (!normalizedPhone || !password) {
      setError("Телефон и пароль обязательны");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await login({ phone: normalizedPhone, password });
      setToken(response.token);
      onLogin(response.token, response.user);
    } catch (requestError) {
      setError(handleError(requestError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label htmlFor="phone">Телефон</label>
        <input
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          autoComplete="tel"
          required
        />
        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          autoComplete="current-password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Входим..." : "Войти"}
        </button>
      </form>
      {error ? <p style={{ color: "red" }}>{error}</p> : null}
    </div>
  );
}

export default LoginPage;
