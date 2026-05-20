import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCardsContainer } from "@/components/dashboard/DashboardCardsContainer";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-[var(--muted-foreground)]">Welcome back! Here is what's happening today.</p>
        </div>
        
        {/* Dashboard Cards Section */}
        <DashboardCardsContainer />

        {/*Recent calls */}
        <div className="h-96 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm mt-8"></div>
      </div>
    </DashboardLayout>
  );
}
