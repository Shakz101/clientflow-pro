import { Button } from "@/components/ui/button";
import { LogIn, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ContactForm } from "@/components/home/ContactForm";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in", "opacity-100");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "50px",
    });

    document.querySelectorAll(".scroll-animation").forEach((element) => {
      element.classList.add(
        "opacity-0",
        "translate-y-10",
        "transition-all",
        "duration-700"
      );
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed w-full z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold tracking-tight">Devircle</h1>
            </div>
            <div className="flex items-center gap-4">
              <ContactForm variant="button" />
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <ContactForm />
    </div>
  );
}