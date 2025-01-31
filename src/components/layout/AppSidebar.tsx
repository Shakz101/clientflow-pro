import { Home, Users, PlusCircle, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/dashboard" },
  { title: "Clients", icon: Users, path: "/dashboard/clients" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpenMobile(false); // Close mobile menu after navigation
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground/70">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    className="text-foreground hover:text-primary"
                  >
                    <button onClick={() => handleNavigation(item.path)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto pb-4">
          <button
            onClick={() => {
              handleNavigation("/dashboard/clients/new");
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-accent rounded-md"
          >
            <PlusCircle className="h-4 w-4" />
            Add New Client
          </button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}