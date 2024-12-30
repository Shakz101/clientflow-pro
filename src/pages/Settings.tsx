import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { themes } from "@/lib/themes";
import { useTheme } from "@/components/ui/theme-provider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTheme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
      });
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="glass rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Settings
        </h1>
        
        <div className="space-y-8">
          {/* Theme Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <div className="grid gap-8">
              <RadioGroup
                value={currentTheme.id}
                onValueChange={setTheme}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {themes.map((theme) => (
                  <Label
                    key={theme.id}
                    className={`relative flex flex-col gap-2 p-4 rounded-lg border-2 cursor-pointer ${
                      currentTheme.id === theme.id
                        ? "border-primary"
                        : "border-transparent hover:border-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={theme.id} id={theme.id} />
                      <span className="font-medium">{theme.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                    <div
                      className={`mt-2 h-24 rounded-md ${theme.preview} transition-all duration-200`}
                    />
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Account Section */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full sm:w-auto"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;