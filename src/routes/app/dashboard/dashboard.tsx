import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "@/app/app/dashboard/dashboard/page";

export const Route = createFileRoute("/app/dashboard/dashboard")({
  component: DashboardPage
});