import { Button } from "@/components/ui/button";
import { ClientCard } from "@/components/clients/ClientCard";
import { Link } from "react-router-dom";
import { PlusCircle, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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
    <div className="container py-4 md:py-6 px-4 md:px-6 animate-fade-in relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="glass rounded-xl md:rounded-2xl p-4 md:p-8 mb-4 md:mb-8 relative">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
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
            <Button asChild className="glass-button border-none w-full md:w-auto">
              <Link to="/dashboard/clients/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Client
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        <div className="glass rounded-xl md:rounded-2xl p-4 md:p-8 relative">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">Recent Clients</h2>
            <Button asChild variant="ghost" className="w-full md:w-auto">
              <Link to="/dashboard/clients">View All</Link>
            </Button>
          </div>

          {isLoadingClients ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
            <div className="text-center py-8 md:py-12">
              <h3 className="text-lg font-semibold mb-2">No clients yet</h3>
              <p className="text-muted-foreground mb-4">Get started by adding your first client</p>
              <Button asChild className="w-full md:w-auto">
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
                  <CarouselItem key={client.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <ClientCard client={client} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="glass-button -left-2 md:-left-4 hidden md:flex" />
              <CarouselNext className="glass-button -right-2 md:-right-4 hidden md:flex" />
            </Carousel>
          )}
        </div>

        <div className="glass rounded-xl md:rounded-2xl p-4 md:p-8 relative">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <MessageSquare className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
          
          <div className="p-4 md:p-6 rounded-lg border bg-card">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-primary/10 shrink-0">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Welcome to Your Dashboard!</h3>
                <p className="text-muted-foreground">
                  Thank you for joining us. This is where you'll receive important announcements and updates from the Site Admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;