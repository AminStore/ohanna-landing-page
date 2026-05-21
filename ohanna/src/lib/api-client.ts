/**
 * API Client Service
 * Centralized API communication for the frontend
 */

import { customFetch, setBaseUrl } from "@/api/custom-fetch";

// Set the base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
setBaseUrl(API_BASE_URL);

export interface CheckoutRequest {
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      description?: string;
    };
    quantity: number;
  }>;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResponse {
  url: string;
  sessionId: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface TrackOrderRequest {
  id: string;
  email: string;
}

export interface Order {
  id: string;
  items: any[];
  total: number;
  status: string;
  created_at: string;
}

export interface TrackOrderResponse {
  order: Order;
}

export interface HealthResponse {
  status: string;
  message?: string;
}

/**
 * API Client
 */
export const apiClient = {
  /**
   * Health check endpoints
   */
  health: {
    check: async (): Promise<HealthResponse> => {
      return customFetch("/health");
    },
    apiCheck: async (): Promise<{ status: string }> => {
      return customFetch("/api/healthz");
    },
  },

  /**
   * Checkout endpoints
   */
  checkout: {
    create: async (data: CheckoutRequest): Promise<CheckoutResponse> => {
      return customFetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
  },

  /**
   * Contact endpoints
   */
  contact: {
    send: async (data: ContactRequest): Promise<ContactResponse> => {
      return customFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
  },

  /**
   * Order tracking endpoints
   */
  orders: {
    track: async (params: TrackOrderRequest): Promise<TrackOrderResponse> => {
      const searchParams = new URLSearchParams({
        id: params.id,
        email: params.email,
      });
      return customFetch(`/api/track-order?${searchParams}`);
    },
  },

  /**
   * Products endpoints
   */
  products: {
    list: async (): Promise<{ products: any[] }> => {
      return customFetch("/api/products");
    },
  },

  /**
   * Setup endpoints
   */
  setup: {
    status: async (): Promise<{ status: string; message: string }> => {
      return customFetch("/api/setup");
    },
  },
};

export default apiClient;
