import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const RegisterHeader = ({ step }: { step: number }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  return (
    <header className="relative w-full py-6 px-8 border-b border-white/20">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Home className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Exit Registration?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to exit? Your registration progress will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleExit}>
                  Exit Registration
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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