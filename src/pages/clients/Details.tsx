import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const ClientDetails = () => {
  const { id } = useParams();

  const { data: client, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container py-6 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <Card className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Card>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="container py-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Client not found</h3>
          <p className="text-muted-foreground mb-4">The client you're looking for doesn't exist or you don't have access to it.</p>
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{client.name}</h1>
          <p className="text-sm text-muted-foreground">Client Details</p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/dashboard" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

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
    </div>
  );
};

export default ClientDetails;