import React, { useEffect, useState } from "react";
import { clearToken, getToken } from "./helpers/authStorage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

type Route = "login" | "profile" | "chat";

function pathForRoute(route: Route): string {
  return `/${route}`;
}

function routeFromPath(path: string, token: string | null): Route {
  if (!token) return "login";
  if (path === "/profile") return "profile";
  if (path === "/chat") return "chat";
  return "chat";
}

export function App() {
  const [token, setAuthToken] = useState<string | null>(() => getToken());
  const [route, setRoute] = useState<Route>(() => routeFromPath(window.location.pathname, getToken()));

  useEffect(() => {
    const normalizedRoute = routeFromPath(window.location.pathname, token);
    const normalizedPath = pathForRoute(normalizedRoute);

    if (window.location.pathname !== normalizedPath) {
      window.history.replaceState({}, "", normalizedPath);
    }

    setRoute(normalizedRoute);
  }, [token]);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(routeFromPath(window.location.pathname, token));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [token]);

  const navigate = (nextRoute: Route) => {
    if (nextRoute !== "login" && !token) {
      return;
    }

    window.history.pushState({}, "", pathForRoute(nextRoute));
    setRoute(nextRoute);
  };

  const handleLogin = (nextToken: string) => {
    setAuthToken(nextToken);
    window.history.pushState({}, "", "/chat");
    setRoute("chat");
  };

  const handleLogout = () => {
    clearToken();
    setAuthToken(null);
    window.history.pushState({}, "", "/login");
    setRoute("login");
  };

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "24px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        <h1 style={{ margin: 0, marginRight: "auto" }}>Messenger Mini</h1>
        {token ? (
          <>
            <button type="button" onClick={() => navigate("profile")} disabled={route === "profile"}>
              Профиль
            </button>
            <button type="button" onClick={() => navigate("chat")} disabled={route === "chat"}>
              Чат
            </button>
            <button type="button" onClick={handleLogout}>
              Выйти
            </button>
          </>
        ) : null}
      </header>

      {route === "login" || !token ? (
        <LoginPage onLogin={handleLogin} />
      ) : route === "profile" ? (
        <ProfilePage token={token} />
      ) : (
        <ChatPage token={token} />
      )}
    </div>
  );
}

export default App;
