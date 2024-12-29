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
import { ArrowRight, CheckCircle2, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in">
              Streamline Your Client Onboarding
              <span className="text-primary block mt-2">With Ease</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 animate-fade-in [animation-delay:200ms]">
              The all-in-one platform for agencies to automate client onboarding,
              manage relationships, and scale operations efficiently.
            </p>
            <div className="flex justify-center gap-4 animate-fade-in [animation-delay:400ms]">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Scale Your Agency
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="relative">
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-none shadow-none bg-transparent">
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
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Agency?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join hundreds of agencies already using our platform to streamline
            their operations and delight their clients.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/register" className="inline-flex items-center">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}