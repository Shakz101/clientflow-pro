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
    title: "Meet Raj, the TikTok Marketing Agency Business Owner",
    description: "Raj manages a thriving TikTok marketing agency with clients across multiple industries. He needed a robust system to handle his growing client base, track campaign performance, and streamline communication. Our platform helped him scale his agency by providing a centralized hub for client management and campaign tracking.",
    role: "Agency Owner",
    focus: "TikTok Marketing",
    avatar: "/lovable-uploads/7589de35-4f47-4e65-ab91-cbe0656ecfe8.png",
  },
  {
    title: "Meet Alex, the Web Developer",
    description: "Alex runs a growing web development studio. He found himself drowning in client requests, design files, and project timelines spread across different tools. Our platform helped him create a streamlined workflow where he can manage all client projects from a single dashboard.",
    role: "Development Lead",
    focus: "Website Projects",
    avatar: "/cartoon-developer.svg",
  },
  {
    title: "Meet Lisa, the Digital Consultant",
    description: "Lisa provides marketing strategy for multiple businesses. She was spending more time on administrative tasks than actual consulting. Using our platform, she automated her client management workflow and reduced admin time by 40%, giving her more time for strategic planning.",
    role: "Strategy Consultant",
    focus: "Digital Marketing",
    avatar: "/cartoon-consultant.svg",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 scroll-animation">
          Real Solutions for Real Challenges
        </h2>
        <div className="mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {userScenarios.map((scenario, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="glass-card border-none scroll-animation h-full transform transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="relative">
                        <div className="absolute inset-0 opacity-20 rounded-t-lg overflow-hidden">
                          <img
                            src={scenario.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="relative z-10 flex items-center gap-6 mb-4 p-6">
                          <Avatar className="h-32 w-32 rounded-xl shadow-xl ring-2 ring-primary/20">
                            <AvatarImage
                              src={scenario.avatar}
                              alt={scenario.role}
                              className="object-cover"
                            />
                          </Avatar>
                          <div>
                            <CardTitle className="text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              {scenario.title}
                            </CardTitle>
                            <div className="flex gap-2 text-lg text-muted-foreground mt-2">
                              <span>{scenario.role}</span>
                              <span>•</span>
                              <span>{scenario.focus}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <CardDescription className="text-xl leading-relaxed">
                        {scenario.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}