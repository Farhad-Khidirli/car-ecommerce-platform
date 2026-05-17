const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function getApiHealth() {
  const response = await fetch(`${apiBaseUrl}/api/health`, {
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    throw new Error("API health check failed");
  }

  return response.json() as Promise<{ data: string }>;
}
