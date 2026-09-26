/**
 * Supabase Database Schema Definitions
 * Anzari Furniture Luxury E-Commerce
 */

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'customer' | 'admin' | string;
  phone?: string;
  wishlist?: string[];
  createdAt: string;
  updatedAt?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  userId: string | null;
  subscribedAt: string;
  status: 'active' | 'unsubscribed' | string;
  user?: User | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  price: number;
  compareAtPrice?: number | null;
  category: string;
  room: string;
  collectionName: string;
  images: string[];
  secondaryImage?: string | null;
  material: string;
  dimensions?: { width: number; height: number; depth: number; unit: string } | null;
  colors?: Array<{ name: string; hex: string; bgClass?: string }> | null;
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  bestseller: boolean;
  badge?: string | null;
  tags?: string[];
  features?: string[];
  careInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string | null;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string | null;
  user?: User | null;
  customerDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliveryMethod: string;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed' | string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | string;
  trackingCode?: string | null;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface Review {
  id: string;
  productId: string;
  userId: string | null;
  userName: string;
  userLocation: string;
  rating: number;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Supabase Database interface for client-level typing
 */
export interface Database {
  public: {
    Tables: {
      NewsletterSubscriber: {
        Row: NewsletterSubscriber;
        Insert: {
          id?: string;
          email: string;
          userId?: string | null;
          subscribedAt?: string;
          status?: string;
        };
        Update: {
          id?: string;
          email?: string;
          userId?: string | null;
          subscribedAt?: string;
          status?: string;
        };
      };
      User: {
        Row: User;
        Insert: {
          id?: string;
          name: string;
          email: string;
          password?: string;
          role?: string;
          phone?: string;
          wishlist?: string[];
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          password?: string;
          role?: string;
          phone?: string;
          wishlist?: string[];
          createdAt?: string;
          updatedAt?: string;
        };
      };
      Product: {
        Row: Product;
        Insert: Partial<Product> & { name: string; slug: string; price: number; category: string; room: string };
        Update: Partial<Product>;
      };
      Order: {
        Row: Order;
        Insert: Partial<Order>;
        Update: Partial<Order>;
      };
      OrderItem: {
        Row: OrderItem;
        Insert: Partial<OrderItem>;
        Update: Partial<OrderItem>;
      };
      Review: {
        Row: Review;
        Insert: Partial<Review>;
        Update: Partial<Review>;
      };
    };
  };
}
