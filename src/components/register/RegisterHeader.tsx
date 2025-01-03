import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const RegisterHeader = ({ step }: { step: number }) => {
  return (
    <header className="w-full py-6 px-8 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Button asChild variant="ghost" size="icon" className="shrink-0">
            <Link to="/" aria-label="Return to Home">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Create Your Account
          </h1>
        </div>
        <div className="text-sm text-muted-foreground">
          Step {step} of 5
        </div>
      </div>
    </header>
  );
};