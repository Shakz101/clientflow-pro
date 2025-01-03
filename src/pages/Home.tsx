import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Users, Zap, LogIn, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { RotatingText } from "@/components/home/RotatingText";

const features = [
  {
    title: "Automated Onboarding",
    description: "Streamline your client onboarding process with automated workflows and data collection.",
    icon: Zap,
  },
  {
    title: "Client Management",
    description: "Centralize client information and manage relationships efficiently from one dashboard.",
    icon: Users,
  },
  {
    title: "Secure & Scalable",
    description: "Enterprise-grade security with role-based access control and token management.",
    icon: CheckCircle2,
  },
];

const testimonials = [
  {
    quote: "This platform has transformed how we onboard clients. What used to take days now takes hours.",
    author: "Sarah Johnson",
    role: "Agency Director",
    company: "Digital Marketing Co.",
  },
  {
    quote: "The automated workflows and security features give us peace of mind. Highly recommended!",
    author: "Michael Chen",
    role: "Operations Manager",
    company: "Growth Solutions",
  },
  {
    quote: "Our team loves how intuitive and efficient the platform is. It's a game-changer.",
    author: "Emma Rodriguez",
    role: "Client Success Manager",
    company: "WebTech Agency",
  },
];

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
      element.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-700");
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

      {/* Hero Section */}
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
              <Button asChild size="lg" variant="outline" className="text-lg px-8 glass-button">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 scroll-animation">
            Everything You Need to Scale Your Agency
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="glass-card border-none scroll-animation"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto scroll-animation">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="relative">
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="glass-card border-none">
                      <CardContent className="text-center px-8 py-10">
                        <p className="text-xl text-gray-600 mb-6 italic">
                          "{testimonial.quote}"
                        </p>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {testimonial.author}
                          </p>
                          <p className="text-gray-600">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="glass-button" />
              <CarouselNext className="glass-button" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center scroll-animation">
          <div className="glass rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Agency?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join hundreds of agencies already using our platform to streamline
              their operations and delight their clients.
            </p>
            <Button asChild size="lg" className="text-lg px-8 glass-button">
              <Link to="/register" className="inline-flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
