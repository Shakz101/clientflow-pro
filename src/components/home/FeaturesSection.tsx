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
    <section className="py-40 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-[90rem] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
          Real Solutions for Real Challenges
        </h2>
        <div className="mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent>
              {userScenarios.map((scenario, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="glass-card border-none scroll-animation h-full transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                    <CardHeader>
                      <div className="relative">
                        <div className="absolute inset-0 opacity-25 rounded-t-lg overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                          <img
                            src={scenario.avatar}
                            alt=""
                            className="w-full h-full object-cover mix-blend-overlay"
                          />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8">
                          <Avatar className="h-40 w-40 rounded-2xl shadow-2xl ring-4 ring-primary/20 transform transition-all duration-500 hover:scale-105 hover:rotate-3">
                            <AvatarImage
                              src={scenario.avatar}
                              alt={scenario.role}
                              className="object-cover"
                            />
                          </Avatar>
                          <div className="text-center md:text-left">
                            <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
                              {scenario.title}
                            </CardTitle>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xl text-muted-foreground mt-2">
                              <span className="px-4 py-1 rounded-full bg-primary/10 text-primary">
                                {scenario.role}
                              </span>
                              <span className="px-4 py-1 rounded-full bg-secondary/10 text-secondary">
                                {scenario.focus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-12">
                      <CardDescription className="text-2xl leading-relaxed">
                        {scenario.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-8 mt-12">
              <CarouselPrevious className="relative h-12 w-12 hover:scale-110 transition-transform duration-300" />
              <CarouselNext className="relative h-12 w-12 hover:scale-110 transition-transform duration-300" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}