import { ClientCard } from "@/components/clients/ClientCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
    name: "Michael Brown",
    company: "Web Development LLC",
    status: "inactive",
    email: "michael@webdevllc.com",
  },
  {
    id: "4",
    name: "Emily Davis",
    company: "Creative Agency",
    status: "active",
    email: "emily@creativeagency.com",
  },
  {
    id: "5",
    name: "David Wilson",
    company: "Consulting Group",
    status: "pending",
    email: "david@consultinggroup.com",
  },
];

export default function Index() {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Button asChild>
          <Link to="/dashboard/clients/new">
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
}
