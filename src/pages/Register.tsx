import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RegisterHeader } from "@/components/register/RegisterHeader";
import { BasicDetailsForm } from "@/components/register/BasicDetailsForm";
import { BusinessTypeForm } from "@/components/register/BusinessTypeForm";
import { PasswordForm } from "@/components/register/PasswordForm";
import { ToolsIntegrationsForm } from "@/components/register/ToolsIntegrationsForm";
import { ReviewConfirmation } from "@/components/register/ReviewConfirmation";
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
      // First, sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: registrationData.email,
        password: registrationData.password!,
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered") || signUpError.message.includes("already exists")) {
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
          description: signUpError.message,
          duration: 5000
        });
        return;
      }

      if (!authData.user?.id) {
        toast.error("Registration failed", {
          description: "Could not create user account. Please try again.",
          duration: 5000
        });
        return;
      }

      // Then, update the profile with user details
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          company_name: registrationData.companyName,
          contact_person: registrationData.contactPerson,
          email: registrationData.email,
          phone: registrationData.phone,
          business_type: registrationData.businessType,
          other_business_type: registrationData.otherBusinessType,
          selected_tools: registrationData.selectedTools,
          other_tools: registrationData.otherTools,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error("Error updating profile:", profileError);
        toast.error("Profile details couldn't be saved", {
          description: "Your account was created but some details couldn't be saved. You can update them later in your profile.",
          duration: 5000
        });
        // Still navigate to login since the account was created
        setTimeout(() => navigate("/login"), 2000);
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
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
        duration: 5000
      });
    }
  };

  const progress = ((step - 1) / 4) * 100;

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <RegisterHeader step={step} />

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