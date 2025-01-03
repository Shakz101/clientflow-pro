import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface ClientCardProps {
  client: {
    id: string;
    name: string;
    email: string;
    tools?: string[] | null;
    created_at: string;
    created_by: string;
  };
}

export function ClientCard({ client }: ClientCardProps) {
  const { toast } = useToast();

  const handleDeleteClient = () => {
    toast({
      title: "Client deleted",
      description: "The client has been successfully deleted.",
    });
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <Link
            to={`/dashboard/clients/${client.id}`}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            {client.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            {client.tools?.length ? client.tools.join(", ") : "No tools integrated"}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to={`/dashboard/clients/${client.id}`} className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/dashboard/clients/${client.id}/edit`} className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Client
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={handleDeleteClient}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Client
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {new Date(client.created_at).toLocaleDateString()}
        </Badge>
        <span className="text-sm text-muted-foreground">{client.email}</span>
      </div>
    </Card>
  );
}