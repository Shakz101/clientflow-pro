import { Button } from "@/components/ui/button";
import { ClientCard } from "@/components/clients/ClientCard";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const mockClients = [
  {
    id: "1",
    name: "John Smith",
    company: "Tech Solutions Inc",
    status: "active",
    email: "john@techsolutions.com",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "Digital Marketing Co",
    status: "pending",
    email: "sarah@digitalmarketing.com",
  },
  {
    id: "3",
    name: "Mike Brown",
    company: "Innovative Startup",
    status: "inactive",
    email: "mike@innovative.com",
  },
] as const;

const Index = () => {
  return (
    <div className="container py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">
            Manage your clients and campaigns
          </p>
        </div>
        <Button asChild>
          <Link to="/clients/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Client
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default Index;