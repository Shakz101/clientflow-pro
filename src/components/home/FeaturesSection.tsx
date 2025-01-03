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
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const userScenarios = [
  {
    title: "For TikTok Marketing Agencies",
    description: "Perfect for agencies managing multiple TikTok campaigns. They can organize client information, track project progress, and store campaign assets in one place. Ideal for agencies looking to scale their client base without losing track of deliverables.",
    role: "Marketing Agency",
    focus: "Social Media Marketing",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
  },
  {
    title: "For Web Development Studios",
    description: "Designed for web development teams juggling multiple projects. They can track client requirements, store design assets, and maintain clear communication channels. Perfect for studios scaling from 5 to 15+ clients while maintaining quality.",
    role: "Development Studio",
    focus: "Website Development",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop",
  },
  {
    title: "For Digital Marketing Consultants",
    description: "Built for consultants managing diverse client portfolios. They can streamline workflows from onboarding to campaign metrics tracking, reducing admin time by 40% to focus more on strategy and growth.",
    role: "Marketing Consultant",
    focus: "Performance Marketing",
    avatar: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 scroll-animation">
          Everything You Need to Scale Your Agency
        </h2>
        <div className="mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {userScenarios.map((scenario, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="glass-card border-none scroll-animation h-full">
                    <CardHeader>
                      <div className="flex items-center gap-6 mb-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage
                            src={scenario.avatar}
                            alt={scenario.role}
                            className="object-cover"
                          />
                        </Avatar>
                        <div>
                          <CardTitle className="text-2xl">{scenario.title}</CardTitle>
                          <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                            <span>{scenario.role}</span>
                            <span>•</span>
                            <span>{scenario.focus}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-lg leading-relaxed">
                        {scenario.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-2 mt-8">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}