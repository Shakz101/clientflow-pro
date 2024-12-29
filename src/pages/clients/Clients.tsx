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

const Clients = () => {
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
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
        {clients?.length === 0 ? (
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
              {clients?.map((client) => (
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