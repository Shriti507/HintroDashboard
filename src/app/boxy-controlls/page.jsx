import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { LifeBuoy } from "lucide-react";

export const metadata = {
  title: "Boxy Controls — Hintro",
};

export default function BoxyControlsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent)] flex items-center justify-center mb-4 text-[var(--primary)]">
          <LifeBuoy className="w-7 h-7" />
        </div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">Boxy Controls</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-2 max-w-sm">
          Fine-tune active assistant widgets, overlay positions, and triggers. This feature is coming soon.
        </p>
      </div>
    </DashboardLayout>
  );
}
