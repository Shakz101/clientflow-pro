import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Building2, Mail, Phone, MapPin, MessageSquareMore, FolderArchive, Facebook, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
      tooltip: "Set up automated email campaigns, SMS notifications, and custom communication workflows to keep your client engaged and informed about their projects and services.",
      icon: MessageSquareMore,
      color: "from-blue-500 to-cyan-500",
      comingSoon: false,
      path: "communication"
    },
    {
      title: "Document Storage",
      description: "Store and manage client documents",
      tooltip: "Securely store, organize, and share important client documents, contracts, and project files. Keep everything in one place with version control and easy access.",
      icon: FolderArchive,
      color: "from-emerald-500 to-teal-500",
      comingSoon: false,
      path: "documents"
    },
    {
      title: "Facebook Manager",
      description: "Manage Facebook ads and content",
      tooltip: "Create and manage Facebook advertising campaigns, track performance metrics, and optimize social media content to boost your client's online presence.",
      icon: Facebook,
      color: "from-blue-600 to-indigo-600",
      comingSoon: true,
      path: "facebook"
    },
    {
      title: "Stripe Manager",
      description: "Handle payments and subscriptions",
      tooltip: "Process payments, manage subscriptions, and track financial transactions seamlessly. Generate invoices and maintain payment records all in one place.",
      icon: CreditCard,
      color: "from-purple-500 to-pink-500",
      comingSoon: true,
      path: "payments"
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
            <HoverCard key={action.title}>
              <HoverCardTrigger asChild>
                <Link 
                  to={action.comingSoon ? "#" : `/dashboard/clients/${id}/${action.path}`}
                  className={action.comingSoon ? 'cursor-not-allowed' : ''}
                  onClick={(e) => action.comingSoon && e.preventDefault()}
                >
                  <Card className="glass-card relative overflow-hidden group">
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
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 glass">
                <div className="space-y-2">
                  <h4 className="font-semibold">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {action.tooltip}
                  </p>
                  {!action.comingSoon && (
                    <p className="text-sm text-primary mt-2">
                      Click to manage {action.title.toLowerCase()}
                    </p>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;