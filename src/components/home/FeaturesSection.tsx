import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Users, Zap } from "lucide-react";

const features = [
  {
    title: "Automated Onboarding",
    description:
      "Streamline your client onboarding process with automated workflows and data collection.",
    icon: Zap,
  },
  {
    title: "Client Management",
    description:
      "Centralize client information and manage relationships efficiently from one dashboard.",
    icon: Users,
  },
  {
    title: "Secure & Scalable",
    description:
      "Enterprise-grade security with role-based access control and token management.",
    icon: CheckCircle2,
  },
];

export function FeaturesSection() {
  return (
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
  );
}