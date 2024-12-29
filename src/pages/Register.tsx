import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BasicDetailsForm } from "@/components/register/BasicDetailsForm";
import { BusinessTypeForm } from "@/components/register/BusinessTypeForm";
import { PasswordForm } from "@/components/register/PasswordForm";
import { ToolsIntegrationsForm } from "@/components/register/ToolsIntegrationsForm";
import { ReviewConfirmation } from "@/components/register/ReviewConfirmation";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type RegistrationData = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  password?: string;
  businessType: string;
  otherBusinessType?: string;
  selectedTools: string[];
  otherTools?: string[];
  termsAccepted: boolean;
}

const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    password: "",
    businessType: "",
    otherBusinessType: "",
    selectedTools: [],
    otherTools: [],
    termsAccepted: false,
  });

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: registrationData.email,
        password: registrationData.password!,
        options: {
          data: {
            company_name: registrationData.companyName,
            contact_person: registrationData.contactPerson,
            phone: registrationData.phone,
            business_type: registrationData.businessType,
            other_business_type: registrationData.otherBusinessType,
            selected_tools: registrationData.selectedTools,
            other_tools: registrationData.otherTools,
          }
        }
      });

      if (error) {
        if (error.message.includes("already registered") || error.message.includes("already exists")) {
          toast.error("This email is already registered.", {
            description: "Please try logging in instead.",
            action: {
              label: "Go to Login",
              onClick: () => navigate("/login")
            },
            duration: 5000
          });
          return;
        }
        
        toast.error("Registration failed", {
          description: error.message,
          duration: 5000
        });
        return;
      }

      toast.success("Registration successful!", {
        description: "Please check your email for verification.",
        duration: 5000
      });
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error: any) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
        duration: 5000
      });
      console.error("Registration error:", error);
    }
  };

  const progress = ((step - 1) / 4) * 100;

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <header className="w-full py-6 px-8 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Create Your Account
          </h1>
          <div className="text-sm text-muted-foreground">
            Step {step} of 5
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <Card className="w-full max-w-3xl glass p-8 space-y-8 relative">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {step === 1 && "Tell us about your business"}
                {step === 2 && "What type of business are you?"}
                {step === 3 && "Create your password"}
                {step === 4 && "What tools do you use?"}
                {step === 5 && "Review your information"}
              </h2>
            </div>
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
            <PasswordForm
              data={registrationData}
              updateData={updateRegistrationData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 4 && (
            <ToolsIntegrationsForm
              data={registrationData}
              updateData={updateRegistrationData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 5 && (
            <ReviewConfirmation
              data={registrationData}
              updateData={updateRegistrationData}
              onBack={handleBack}
              onSubmit={handleSubmit}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Register;