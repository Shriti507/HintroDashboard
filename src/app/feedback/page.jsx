import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";

export const metadata = {
  title: "Feedback — Hintro",
};

export default function FeedbackPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Feedback
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            Share your thoughts to help us improve Hintro.
          </p>
        </div>
        <FeedbackForm />
      </div>
    </DashboardLayout>
  );
}
