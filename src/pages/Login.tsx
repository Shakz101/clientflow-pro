import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fillDemoData = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@example.com',
        password: 'demo123456'
      });

      if (error) {
        if (error.message.includes("Database error")) {
          toast.error("System Error", {
            description: "There was a problem connecting to the database. Please try again later or contact support.",
            duration: 5000
          });
        } else if (error.message.includes("Invalid login credentials")) {
          toast.error("Demo account not found", {
            description: "Please register a new account first.",
            action: {
              label: "Register",
              onClick: () => navigate("/register")
            },
            duration: 5000
          });
        } else {
          toast.error("Login failed", {
            description: error.message,
            duration: 5000
          });
        }
        return;
      }

      if (data.user) {
        toast.success("Successfully logged in!", {
          duration: 3000
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later.",
        duration: 5000
      });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass rounded-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          
          <div className="flex justify-end mb-4">
            <Button
              onClick={fillDemoData}
              className="glass-button"
              size="sm"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Fill Demo Data
            </Button>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8'
                  }
                }
              }
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Sign in',
                  loading_button_label: 'Signing in...',
                  social_provider_text: 'Sign in with {{provider}}',
                  link_text: "Already have an account? Sign in",
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Create a password',
                  button_label: 'Sign up',
                  loading_button_label: 'Signing up...',
                  social_provider_text: 'Sign up with {{provider}}',
                  link_text: "Don't have an account? Sign up",
                },
              },
            }}
          />

          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-600 hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;