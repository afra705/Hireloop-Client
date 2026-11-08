'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BookmarkIcon,
  BriefcaseIcon,
  Building2Icon,
  FileTextIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient, useSession } from "@/lib/auth-client"

type Role = "seeker" | "recruiter" | "admin"

type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

type RoleConfig = {
  name: string
  subtitle: string
  avatar: string
  badge?: string
  showBrandSubtitle?: boolean
  showIdentity?: boolean
  showCta?: boolean
  showLogout?: boolean
  showUserCard?: boolean
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    {
      name: "Dashboard",
      url: "/dashboard/seekers",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Jobs",
      url: "/dashboard/seekers/jobs",
      icon: BriefcaseIcon,
    },
    {
      name: "Saved Jobs",
      url: "/dashboard/seekers/saved",
      icon: BookmarkIcon,
    },
    {
      name: "Applications",
      url: "/dashboard/seekers/applications",
      icon: FileTextIcon,
    },
    {
      name: "Billing",
      url: "/dashboard/seekers/billing",
      icon: WalletIcon,
    },
    {
      name: "Settings",
      url: "/dashboard/seekers/settings",
      icon: SettingsIcon,
    },
  ],
  recruiter: [
    {
      name: "Dashboard",
      url: "/dashboard/reqruiter",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Manage Jobs",
      url: "/dashboard/reqruiter/jobs",
      icon: BriefcaseIcon,
    },
    {
      name: "Applications",
      url: "/dashboard/reqruiter/applications",
      icon: FileTextIcon,
    },
    {
      name: "Settings",
      url: "/dashboard/reqruiter/settings",
      icon: SettingsIcon,
    },
  ],
  admin: [
    {
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Users",
      url: "/dashboard/admin/users",
      icon: UsersIcon,
    },
    {
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2Icon,
    },
    {
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: BriefcaseIcon,
    },
    {
      name: "Payments",
      url: "/dashboard/admin/payments",
      icon: WalletIcon,
    },
    {
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: SettingsIcon,
    },
  ],
}

const roleConfig: Record<Role, RoleConfig> = {
  seeker: {
    name: "Seeker Portal",
    subtitle: "Professional Tier",
    avatar: "/images/avatars/seeker.png",
    showIdentity: true,
    showCta: true,
    showLogout: true,
  },
  recruiter: {
    name: "Alex Sterling",
    subtitle: "Recruiter",
    avatar: "/images/avatars/recruiter.png",
    badge: "Premium account",
    showIdentity: true,
  },
  admin: {
    name: "Alex Rivera",
    subtitle: "Super Admin",
    avatar: "/images/avatars/admin.png",
    showBrandSubtitle: true,
    showUserCard: true,
  },
}

const getRole = (role: string | null | undefined): Role => {
  if (role === "recruiter" || role === "admin") {
    return role
  }

  return "seeker"
}

const getActiveUrl = (pathname: string, items: MenuItem[]) => {
  return items
    .filter(
      (item) => pathname === item.url || pathname.startsWith(`${item.url}/`)
    )
    .sort((a, b) => b.url.length - a.url.length)[0]?.url
}

const Avatar = ({
  src,
  name,
  className,
}: {
  src: string
  name: string
  className?: string
}) => {
  return (
    <div
      role="img"
      aria-label={`${name} avatar`}
      className={cn(
        "shrink-0 rounded-full bg-cover bg-center ring-1 ring-white/10",
        className
      )}
      style={{ backgroundImage: `url("${src}")` }}
    />
  )
}

const DashboardSideBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const role = getRole(session?.user?.role)
  const config = roleConfig[role]
  const items = menuItemsByRole[role]
  const activeUrl = getActiveUrl(pathname, items)
  const userName = session?.user?.name || config.name
  const avatar = session?.user?.image || config.avatar

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/")
  }

  return (
    <Sidebar
      className="border-r border-white/[0.06] [&_[data-slot=sidebar-inner]]:bg-[#0B0B0C]"
      style={
        {
          "--sidebar": "#0B0B0C",
          "--sidebar-border": "rgba(255, 255, 255, 0.06)",
        } as React.CSSProperties
      }
    >
      <SidebarHeader className="gap-0 px-3 pt-5">
        <Link
          href={items[0].url}
          className="flex w-fit flex-col items-start gap-0.5"
        >
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-8 w-auto"
          />
          {config.showBrandSubtitle && (
            <span className="text-xs leading-4 font-medium text-[#7C7F87]">
              Admin Console
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-3 pt-4">
        {config.showIdentity && (
          <div className="flex items-center gap-3 rounded-[10px] border border-white/[0.06] bg-[#141416] p-2.5">
            <Avatar src={avatar} name={userName} className="size-8" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-sm leading-5 font-semibold text-[#F4F4F5]">
                {userName}
              </span>
              <span className="truncate text-xs leading-4 text-[#A1A4AA]">
                {config.subtitle}
              </span>
              {config.badge && (
                <span className="mt-0.5 w-fit rounded-full border border-[#5C53FE]/[0.32] bg-[#5C53FE]/[0.14] px-2 py-0.5 text-[11px] leading-4 font-semibold text-[#8F88FF]">
                  {config.badge}
                </span>
              )}
            </div>
          </div>
        )}

        <SidebarGroup className="mt-2.5 p-0">
          <SidebarMenu className="gap-0.5">
            {items.map((item) => {
              const isActive = item.url === activeUrl

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    tooltip={item.name}
                    isActive={isActive}
                    className={cn(
                      "relative h-[34px] gap-2.5 rounded-md px-2.5 py-0 text-[13px] font-medium tracking-[-0.005em] [&_svg]:size-[18px]",
                      isActive
                        ? "bg-[#232327] text-[#F4F4F5] hover:bg-[#232327] hover:text-[#F4F4F5] data-active:bg-[#232327] data-active:text-[#F4F4F5]"
                        : "text-[#A1A4AA] hover:bg-[#1B1B1E] hover:text-[#F4F4F5]"
                    )}
                  >
                    {isActive && (
                      <span className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-[#5C53FE]" />
                    )}
                    <item.icon
                      className={cn(
                        "shrink-0",
                        isActive
                          ? "text-[#F4F4F5]"
                          : "text-[#7C7F87] group-hover/menu-button:text-[#A1A4AA]"
                      )}
                    />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 px-3 pb-4">
        {config.showCta && (
          <Link
            href="/dashboard/seekers/settings"
            className="flex h-10 w-full items-center justify-center rounded-[10px] bg-[#FAFAFA] text-sm font-semibold text-[#0B0B0C] transition-colors hover:bg-white"
          >
            Post Resume
          </Link>
        )}

        {config.showLogout && (
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-[34px] w-full items-center gap-2.5 rounded-md px-2.5 text-[13px] font-medium text-[#A1A4AA] transition-colors outline-none hover:bg-[#1B1B1E] hover:text-[#F4F4F5] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/60"
          >
            <LogOutIcon className="size-[18px] text-[#7C7F87]" />
            <span>Logout</span>
          </button>
        )}

        {config.showUserCard && (
          <div className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.06] bg-[#141416] p-2.5">
            <Avatar src={avatar} name={userName} className="size-8" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-[13px] leading-[18px] font-semibold text-[#F4F4F5]">
                {userName}
              </span>
              <span className="truncate text-xs leading-4 text-[#7C7F87]">
                {config.subtitle}
              </span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSideBar
