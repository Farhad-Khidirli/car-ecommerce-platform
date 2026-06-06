const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export type UserRole = "USER" | "ADMIN";
export type ListingStatus = "DRAFT" | "PUBLISHED" | "FROZEN" | "HIDDEN";

export type AuthUser = {
  id: string;
  email: string | null;
  phone: string | null;
  displayName: string;
  role: UserRole;
};

export type AuthResponse = {
  token: string;
  expiresAt: string;
  user: AuthUser;
};

export type ListingResponse = {
  id: string;
  sellerId: string;
  sellerName: string;
  categoryKey: string;
  title: string;
  description: string | null;
  priceAmount: number;
  priceCurrency: string;
  status: ListingStatus;
  listingType: string;
  imageUrl: string | null;
  contactName: string | null;
  contactPhone: string | null;
  moderationMessage: string | null;
  parameters: Record<string, string>;
  createdAt: string;
  updatedAt: string;
};

export type ListingPayload = {
  categoryKey: string;
  title: string;
  description: string;
  priceAmount: number;
  priceCurrency: string;
  listingType: string;
  imageUrl: string;
  contactName: string;
  contactPhone: string;
  parameters: Record<string, string>;
};

type ApiEnvelope<T> = { data: T };

async function request<T>(path: string, init: RequestInit = {}): Promise<ApiEnvelope<T>> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {})
    }
  });

  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try {
      const parsed = JSON.parse(text) as { message?: string; error?: string; status?: number };
      message = parsed.message || parsed.error || text;
    } catch {
      // Keep the raw response text when the API does not return JSON.
    }
    throw new Error(message || `Request failed with ${response.status}`);
  }

  const text = await response.text();
  if (response.status === 204 || !text) {
    return { data: undefined as T };
  }

  return JSON.parse(text) as ApiEnvelope<T>;
}

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function getApiHealth() {
  const response = await fetch(`${apiBaseUrl}/api/health`, {
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    throw new Error("API health check failed");
  }

  return response.json() as Promise<{ data: string }>;
}

export async function login(identifier: string, password: string) {
  const response = await request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ identifier, password })
  });
  return response.data;
}

export async function register(payload: { email?: string; phone?: string; displayName: string; password: string }) {
  const response = await request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return response.data;
}

export async function getMe(token: string) {
  const response = await request<AuthUser>("/api/auth/me", {
    headers: authHeader(token)
  });
  return response.data;
}

export async function getPublicListings() {
  const response = await request<ListingResponse[]>("/api/listings");
  return response.data;
}

export async function getPublicListing(id: string) {
  const response = await request<ListingResponse>(`/api/listings/${id}`);
  return response.data;
}

export async function getMyListings(token: string) {
  const response = await request<ListingResponse[]>("/api/me/listings", {
    headers: authHeader(token)
  });
  return response.data;
}

export async function createListing(token: string, payload: ListingPayload) {
  const response = await request<ListingResponse>("/api/me/listings", {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify(payload)
  });
  return response.data;
}

export async function deleteListing(token: string, id: string) {
  await request<void>(`/api/me/listings/${id}`, {
    method: "DELETE",
    headers: authHeader(token)
  });
}

export async function getAdminListings(token: string) {
  const response = await request<ListingResponse[]>("/api/admin/listings", {
    headers: authHeader(token)
  });
  return response.data;
}

export async function moderateListing(token: string, id: string, status: ListingStatus, message: string) {
  const response = await request<ListingResponse>(`/api/admin/listings/${id}/moderation`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify({ status, message })
  });
  return response.data;
}
