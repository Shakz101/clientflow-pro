import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BasicDetailsForm } from "@/components/register/BasicDetailsForm";
import { BusinessTypeForm } from "@/components/register/BusinessTypeForm";
import { ToolsIntegrationsForm } from "@/components/register/ToolsIntegrationsForm";
import { ReviewConfirmation } from "@/components/register/ReviewConfirmation";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

export type RegistrationData = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  businessType: string;
  otherBusinessType?: string;
  selectedTools: string[];
  otherTools?: string[];
  termsAccepted: boolean;
}

const Register = () => {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    businessType: "",
    otherBusinessType: "",
    selectedTools: [],
    otherTools: [],
    termsAccepted: false,
  });
  const { toast } = useToast();

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your backend
      console.log("Registration data:", registrationData);
      toast({
        title: "Registration successful!",
        description: "Welcome aboard! Check your email for next steps.",
      });
      // Redirect to dashboard or onboarding
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const progress = ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Card className="w-full max-w-2xl glass p-6 space-y-8 relative">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Create Your Account
          </h1>
          <Progress value={progress} className="h-2" />
        </div>

        {step === 1 && (
          <BasicDetailsForm
            data={registrationData}
            updateData={updateRegistrationData}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <BusinessTypeForm
            data={registrationData}
            updateData={updateRegistrationData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <ToolsIntegrationsForm
            data={registrationData}
            updateData={updateRegistrationData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 4 && (
          <ReviewConfirmation
            data={registrationData}
            updateData={updateRegistrationData}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )}
      </Card>
    </div>
  );
};

export default Register;