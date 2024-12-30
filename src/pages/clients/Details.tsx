import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Building2, Mail, Phone, MapPin, MessageSquareMore, FolderArchive, Facebook, CreditCard } from "lucide-react";
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

  const actionBoxes = [
    {
      title: "Automated Communication",
      description: "Manage automated emails and messages",
      icon: MessageSquareMore,
      color: "from-blue-500 to-cyan-500",
      comingSoon: false,
    },
    {
      title: "Document Storage",
      description: "Store and manage client documents",
      icon: FolderArchive,
      color: "from-emerald-500 to-teal-500",
      comingSoon: false,
    },
    {
      title: "Facebook Manager",
      description: "Manage Facebook ads and content",
      icon: Facebook,
      color: "from-blue-600 to-indigo-600",
      comingSoon: true,
    },
    {
      title: "Stripe Manager",
      description: "Handle payments and subscriptions",
      icon: CreditCard,
      color: "from-purple-500 to-pink-500",
      comingSoon: true,
    },
  ];

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

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Client Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actionBoxes.map((action) => (
            <Card 
              key={action.title}
              className="glass-card relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
              <div className="p-6 space-y-4">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} text-white`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
                {action.comingSoon && (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    Coming Soon
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;