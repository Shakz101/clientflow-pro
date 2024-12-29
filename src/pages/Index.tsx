import { Button } from "@/components/ui/button";
import { ClientCard } from "@/components/clients/ClientCard";
import { Link } from "react-router-dom";
import { PlusCircle, LogIn } from "lucide-react";

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
    <div className="container py-6 animate-fade-in relative">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="glass rounded-2xl p-8 mb-8 relative">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your clients and campaigns
            </p>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="glass-button">
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button asChild className="glass-button border-none">
              <Link to="/clients/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Client
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative">
        {mockClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default Index;