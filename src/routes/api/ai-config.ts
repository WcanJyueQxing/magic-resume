import { createFileRoute } from "@tanstack/react-router";

const BACKEND_API = "http://localhost:8000/api";

export const Route = createFileRoute("/api/ai-config")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const response = await fetch(`${BACKEND_API}/ai-config`);
          const result = await response.json();
          return Response.json(result, { status: response.status });
        } catch (error) {
          console.error("Error fetching AI config:", error);
          return Response.json(
            { success: false, error: "Failed to fetch config from backend" },
            { status: 500 }
          );
        }
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const response = await fetch(`${BACKEND_API}/ai-config`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const result = await response.json();
          return Response.json(result, { status: response.status });
        } catch (error) {
          console.error("Error creating AI config:", error);
          return Response.json(
            { success: false, error: "Failed to create config" },
            { status: 500 }
          );
        }
      },
      PUT: async ({ request }) => {
        try {
          const body = await request.json();
          const response = await fetch(`${BACKEND_API}/ai-config`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const result = await response.json();
          return Response.json(result, { status: response.status });
        } catch (error) {
          console.error("Error updating AI config:", error);
          return Response.json(
            { success: false, error: "Failed to update config" },
            { status: 500 }
          );
        }
      },
      DELETE: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const id = url.searchParams.get("id");
          const response = await fetch(`${BACKEND_API}/ai-config?id=${id}`, {
            method: "DELETE",
          });
          const result = await response.json();
          return Response.json(result, { status: response.status });
        } catch (error) {
          console.error("Error deleting AI config:", error);
          return Response.json(
            { success: false, error: "Failed to delete config" },
            { status: 500 }
          );
        }
      },
    },
  },
});
