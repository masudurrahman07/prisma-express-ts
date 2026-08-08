import { Category, Order, Product, User } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

type ApiRequestInit = Omit<RequestInit, "body"> & {
  body?: any;
};

function normalizeApiResponse<T>(json: any): ApiResponse<T> {
  if (json && typeof json === "object" && "data" in json) {
    return json as ApiResponse<T>;
  }

  return {
    success: true,
    message: "",
    data: json as T,
  };
}

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
  const json = await response.json();
  const normalized = normalizeApiResponse<T>(json);

  if (!response.ok) {
    throw new Error(normalized?.message || response.statusText || "API request failed");
  }

  return normalized;
}

function parseProduct(product: any): Product {
  return {
    ...product,
    price: Number(product.price ?? 0),
  };
}

function parseOrder(order: any): Order {
  return {
    ...order,
    total: Number(order.total ?? 0),
    items: Array.isArray(order.items)
      ? order.items.map((item: any) => ({
          ...item,
          priceAtPurchase: Number(item.priceAtPurchase ?? 0),
        }))
      : [],
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

export const categoriesApi = {
  list: () => apiFetch<Category[]>("/api/v1/categories", { method: "GET" }),
};

export const ordersApi = {
  list: () => apiFetch<Order[]>("/api/v1/orders", { method: "GET" }).then((response) => ({ ...response, data: response.data.map(parseOrder) })),
  create: (items: Array<{ productId: string; quantity: number }>) => apiFetch<Order>("/api/v1/orders", { method: "POST", body: { items } }),
};
