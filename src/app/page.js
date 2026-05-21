import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCardsContainer } from "@/components/dashboard/DashboardCardsContainer";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { RecentCalls } from "@/components/dashboard/RecentCalls";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome greeting */}
        <WelcomeCard />

        {/* Dashboard Stats Cards */}
        <DashboardCardsContainer />

        {/* Recent Calls */}
        <RecentCalls />
      </div>
    </DashboardLayout>
  );
}
