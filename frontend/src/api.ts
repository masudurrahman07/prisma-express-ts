import { Order, Product, User } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

type ApiRequestInit = Omit<RequestInit, "body"> & {
  body?: any;
};

async function apiFetch<T>(path: string, options: ApiRequestInit = {}): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {};
  const init: RequestInit = {
    credentials: "include",
    ...options,
    headers: {
      ...headers,
      ...(options.headers ?? {}),
    },
  };

  if (init.body && typeof init.body === "object" && !(init.body instanceof FormData)) {
    init.body = JSON.stringify(init.body);
    (init.headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${path}`, init);
  const json = (await response.json()) as ApiResponse<T>;
  if (!response.ok) {
    throw new Error(json?.message || response.statusText || "API request failed");
  }
  return json;
}

function parseProduct(product: any): Product {
  return {
    ...product,
    price: Number(product.price ?? 0),
  };
}

export const authApi = {
  me: () => apiFetch<User>("/api/auth/me", { method: "GET" }),
  login: (payload: { email: string; password: string }) => apiFetch<User>("/api/auth/login", { method: "POST", body: payload }),
  register: (payload: { name: string; email: string; password: string }) => apiFetch<User>("/api/auth/register", { method: "POST", body: payload }),
  logout: () => apiFetch<{ ok: boolean }>("/api/auth/logout", { method: "POST" }),
};

export const productsApi = {
  list: () => apiFetch<Product[]>("/api/v1/products", { method: "GET" }).then((response) => ({ ...response, data: response.data.map(parseProduct) })),
  get: (id: string) => apiFetch<Product>(`/api/v1/products/${id}`, { method: "GET" }).then((response) => ({ ...response, data: parseProduct(response.data) })),
};

export const ordersApi = {
  list: () => apiFetch<Order[]>("/api/v1/orders", { method: "GET" }),
  create: (items: Array<{ productId: string; quantity: number }>) => apiFetch<Order>("/api/v1/orders", { method: "POST", body: { items } }),
};
