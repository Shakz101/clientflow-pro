import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

interface ClientInfoCardProps {
  client: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    status?: string;
    tools?: string[];
  };
}

export const ClientInfoCard = ({ client }: ClientInfoCardProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p className="text-sm text-muted-foreground">Basic details and contact information</p>
          </div>
          <Badge variant="outline" className="capitalize">
            {client.status || 'active'}
          </Badge>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{client.name}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <a href={`mailto:${client.email}`} className="hover:text-primary">
              {client.email}
            </a>
          </div>
          {client.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href={`tel:${client.phone}`} className="hover:text-primary">
                {client.phone}
              </a>
            </div>
          )}
          {client.address && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{client.address}</span>
            </div>
          )}
        </div>

        {client.tools && client.tools.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Integrated Platforms</h3>
            <div className="flex gap-2 flex-wrap">
              {client.tools.map((tool) => (
                <Badge key={tool} variant="secondary">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};