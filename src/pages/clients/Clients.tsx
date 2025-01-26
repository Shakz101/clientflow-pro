import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { Eye, PlusCircle, LayoutGrid, Table as TableIcon, Trash2, CheckSquare } from "lucide-react";
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
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Clients = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isGridView, setIsGridView] = useState(false);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    enabled: !!session?.user?.id,
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: async (clientIds: string[]) => {
      const { error } = await supabase
        .from('clients')
        .delete()
        .in('id', clientIds);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: "Success",
        description: "Selected clients have been deleted",
      });
      setSelectedClients([]);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete clients. Please try again.",
      });
      console.error('Delete error:', error);
    },
  });

  const handleBulkDelete = async () => {
    await bulkDeleteMutation.mutateAsync(selectedClients);
    setShowDeleteDialog(false);
  };

  const toggleSelectAll = () => {
    if (selectedClients.length === clients?.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients?.map(client => client.id) || []);
    }
  };

  const toggleClientSelection = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

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
          <div className="flex gap-2">
            {selectedClients.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                className="mr-2"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Selected ({selectedClients.length})
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setIsGridView(!isGridView)}
              className="mr-2"
            >
              {isGridView ? (
                <TableIcon className="mr-2 h-4 w-4" />
              ) : (
                <LayoutGrid className="mr-2 h-4 w-4" />
              )}
              {isGridView ? "Table View" : "Grid View"}
            </Button>
            <Button asChild className="glass-button border-none">
              <Link to="/dashboard/clients/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Client
              </Link>
            </Button>
          </div>
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
        ) : isGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="relative p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedClients.includes(client.id)}
                    onCheckedChange={() => toggleClientSelection(client.id)}
                  />
                </div>
                <div className="pt-6">
                  <h3 className="font-semibold text-lg">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                  <div className="mt-2 text-sm">
                    <p>Tools: {client.tools?.join(", ") || "—"}</p>
                    <p>Created: {new Date(client.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <Link to={`/dashboard/clients/${client.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedClients.length === clients.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
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
                  <TableCell>
                    <Checkbox
                      checked={selectedClients.includes(client.id)}
                      onCheckedChange={() => toggleClientSelection(client.id)}
                    />
                  </TableCell>
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected clients
              and all their associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Clients;