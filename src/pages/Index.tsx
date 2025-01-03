import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ClientCard } from "@/components/clients/ClientCard";
import { Link } from "react-router-dom";
import { PlusCircle, CircleDot } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: clients, isLoading: isLoadingClients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('company_name')
        .eq('id', session.user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="container py-6 animate-fade-in relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-primary">
            <CircleDot className="h-8 w-8" />
            <span>Devircle</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="glass rounded-2xl p-8 mb-8 relative mt-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome Back{' '}
              {isLoadingProfile ? (
                <Skeleton className="h-8 w-32 inline-block" />
              ) : (
                <Link 
                  to="/dashboard/profile" 
                  className="hover:underline decoration-blue-600"
                >
                  {profile?.company_name}
                </Link>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your clients and campaigns
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild className="glass-button border-none">
              <Link to="/dashboard/clients/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Client
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Clients</h2>
          <Button asChild variant="ghost">
            <Link to="/dashboard/clients">View All</Link>
          </Button>
        </div>

        {isLoadingClients ? (
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full">
                <div className="p-6 rounded-lg border bg-card">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : clients?.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No clients yet</h3>
            <p className="text-muted-foreground mb-4">Get started by adding your first client</p>
            <Button asChild>
              <Link to="/dashboard/clients/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Client
              </Link>
            </Button>
          </div>
        ) : (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {clients?.map((client) => (
                <CarouselItem key={client.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <ClientCard client={client} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="glass-button -left-4" />
            <CarouselNext className="glass-button -right-4" />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Index;