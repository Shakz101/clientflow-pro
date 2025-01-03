import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MessageSquareMore, FolderArchive, Facebook, CreditCard } from "lucide-react";
import { ClientInfoCard } from "@/components/clients/ClientInfoCard";
import { ClientActionBox } from "@/components/clients/ClientActionBox";

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
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="container py-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Client not found</h3>
          <p className="text-muted-foreground mb-4">
            The client you're looking for doesn't exist or you don't have access to it.
          </p>
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

      <ClientInfoCard client={client} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Client Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actionBoxes.map((action) => (
            <ClientActionBox
              key={action.title}
              {...action}
              clientId={id!}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;