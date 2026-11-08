import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import DashboardSideBar from "../component/DashboardSideBar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSideBar />

      <SidebarInset className="min-w-0 overflow-x-hidden bg-[#0B0B0C]">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}