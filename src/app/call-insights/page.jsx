import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Phone } from "lucide-react";

export const metadata = {
  title: "Call Insights — Hintro",
};

export default function CallInsightsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent)] flex items-center justify-center mb-4 text-[var(--primary)]">
          <Phone className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">Call Insights</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-2 max-w-sm">
          Detailed metrics, transcription logs, and AI conversation frameworks are coming soon.
        </p>
      </div>
    </DashboardLayout>
  );
}
