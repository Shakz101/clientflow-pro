import { useState } from "react";
import { BasicDetailsForm } from "@/components/clients/BasicDetailsForm";
import { BusinessDetailsForm } from "@/components/clients/BusinessDetailsForm";
import { PlatformIntegrationForm } from "@/components/clients/PlatformIntegrationForm";
import { ClientNotesForm } from "@/components/clients/ClientNotesForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

type ClientData = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  businessName: string;
  industry?: string;
  website?: string;
  platforms: string[];
  platformDetails: Record<string, string>;
  notes?: string;
};

const NewClient = () => {
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState<ClientData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    businessName: "",
    industry: "",
    website: "",
    platforms: [],
    platformDetails: {},
    notes: "",
  });
  const navigate = useNavigate();

  const updateClientData = (data: Partial<ClientData>) => {
    setClientData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No authenticated user found");

      const { error } = await supabase.from("clients").insert([
        {
          name: clientData.businessName,
          email: clientData.email,
          tools: clientData.platforms,
          created_by: user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Client successfully added!");
      navigate("/dashboard/clients");
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Failed to add client. Please try again.");
    }
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicDetailsForm
            data={clientData}
            updateData={updateClientData}
            onNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          <BusinessDetailsForm
            data={clientData}
            updateData={updateClientData}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return (
          <PlatformIntegrationForm
            data={clientData}
            updateData={updateClientData}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        );
      case 4:
        return (
          <ClientNotesForm
            data={clientData}
            updateData={updateClientData}
            onSubmit={handleSubmit}
            onBack={() => setStep(3)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-2xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Add New Client</h1>
          <p className="text-sm text-muted-foreground">
            Enter your client's information to get started
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/clients")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </Button>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="border rounded-lg p-6 space-y-6 bg-card">
        {renderStep()}
      </div>
    </div>
  );
};

export default NewClient;