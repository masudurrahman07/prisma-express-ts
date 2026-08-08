export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  age: number | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string | null;
  sku: string | null;
  currency: string | null;
  imageUrl: string | null;
  category: Category | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  product: Product;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  items: OrderItem[];
  user: User;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  userId: string;
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  categoryName?: string | null;
}
