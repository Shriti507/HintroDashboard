import { redirect } from "next/navigation";

// Redirect /dashboard → / (root is the dashboard)
export default function DashboardRedirect() {
  redirect("/");
}
