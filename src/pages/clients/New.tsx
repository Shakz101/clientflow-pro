import { useState } from "react";
import { SlideShow } from "@/components/register/SlideShow";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewClient = () => {
  const [selectedTools] = useState(["stripe", "facebook", "google-ads"]);
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: any) => {
    try {
      const { error } = await supabase
        .from('clients')
        .insert([
          {
            ...formData,
            tools: selectedTools,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      toast.success("Client successfully added!");
      navigate("/dashboard/clients");
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error("Failed to add client. Please try again.");
    }
  };

  return (
    <div className="container py-8">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <SlideShow selectedTools={selectedTools} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default NewClient;