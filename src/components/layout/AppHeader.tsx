import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";

const mockNotifications = [
  {
    id: 1,
    title: "New Client Added",
    description: "John Smith has been added to your client list",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Meeting Reminder",
    description: "Upcoming meeting with Sarah Johnson in 30 minutes",
    time: "30 minutes ago",
  },
];

export function AppHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex-1 flex items-center gap-4 md:gap-8">
          <h2 className="text-xl font-semibold truncate">Agency Dashboard</h2>
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients..."
                className="pl-8"
              />
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuGroup>
              {mockNotifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
              {mockNotifications.length === 0 && (
                <DropdownMenuItem className="p-4 text-center">
                  No new notifications
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}