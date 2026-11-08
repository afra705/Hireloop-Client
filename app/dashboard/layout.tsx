import type { CSSProperties } from "react"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSideBar from "../component/DashboardSideBar"

const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "248px" } as CSSProperties}
    >
      <DashboardSideBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayoutPage
