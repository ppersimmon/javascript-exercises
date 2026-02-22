import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export const fetchClient = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options && (options as any).token) {
    headers.set("Authorization", `Bearer ${(options as any).token}`);
  } else if (typeof window !== "undefined") {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    cache: "no-store",
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    if (typeof window !== "undefined") {
      Cookies.remove("token", { path: "/" });
      if (window.location.pathname !== "/sign-in") {
        window.location.href = "/sign-in";
      }
    }
    throw new Error(`Error. Status: ${response.status}`);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return await response.json();
};
