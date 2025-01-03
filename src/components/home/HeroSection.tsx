import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { RotatingText } from "./RotatingText";

export function HeroSection() {
  return (
    <section className="relative pt-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="glass rounded-2xl max-w-7xl mx-auto p-8 relative z-10 scroll-animation">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-8">
            Streamline Your
            <RotatingText />
            <span className="text-primary block mt-2">With Ease</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            The all-in-one platform for agencies to automate client onboarding,
            manage relationships, and scale operations efficiently.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 glass-button">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 glass-button"
            >
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}