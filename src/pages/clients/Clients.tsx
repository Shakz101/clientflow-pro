import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Eye, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Clients = () => {
  const { toast } = useToast();

  // First fetch the session to ensure we're authenticated
  const { data: session, isLoading: isLoadingSession } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  // Then fetch clients only if we have a session
  const { data: clients, isLoading: isLoadingClients, error } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }
      return data;
    },
    enabled: !!session?.user?.id, // Only run query if we have a session
  });

  // Handle any errors
  if (error) {
    toast({
      variant: "destructive",
      title: "Error fetching clients",
      description: "Please try refreshing the page.",
    });
  }

  // Show loading state while session or data is loading
  if (isLoadingSession || isLoadingClients) {
    return (
      <div className="container py-6">
        <div className="glass rounded-2xl p-8 mb-8">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-4 w-1/3 mt-2" />
        </div>
        <div className="glass rounded-2xl p-6">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 animate-fade-in">
      <div className="glass rounded-2xl p-8 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Clients
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and view all your clients
            </p>
          </div>
          <Button asChild className="glass-button border-none">
            <Link to="/dashboard/clients/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Client
            </Link>
          </Button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        {!clients || clients.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No clients yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first client
            </p>
            <Button asChild>
              <Link to="/dashboard/clients/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Client
              </Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tools</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.tools?.join(", ") || "—"}</TableCell>
                  <TableCell>
                    {new Date(client.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link to={`/dashboard/clients/${client.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Clients;