import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface ClientCardProps {
  client: {
    id: string;
    name: string;
    company: string;
    status: "active" | "pending" | "inactive";
    email: string;
  };
}

export function ClientCard({ client }: ClientCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    inactive: "bg-gray-100 text-gray-800",
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <Link
            to={`/clients/${client.id}`}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            {client.name}
          </Link>
          <p className="text-sm text-muted-foreground">{client.company}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Badge
          variant="secondary"
          className={`${statusColors[client.status]} capitalize`}
        >
          {client.status}
        </Badge>
        <span className="text-sm text-muted-foreground">{client.email}</span>
      </div>
    </Card>
  );
}