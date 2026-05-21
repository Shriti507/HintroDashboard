import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FeedbackHistory } from "@/components/feedback/FeedbackHistory";

export const metadata = {
  title: "Feedback History — Hintro",
};

export default function FeedbackHistoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Feedback History
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Review all feedback you have previously submitted.
          </p>
        </div>
        <FeedbackHistory />
      </div>
    </DashboardLayout>
  );
}
