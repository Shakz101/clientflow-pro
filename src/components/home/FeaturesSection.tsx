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
    title: "Meet Sarah, the TikTok Marketing Manager",
    description: "Sarah manages social media campaigns for 15 different TikTok creators. She was struggling to keep track of content calendars and campaign assets across multiple clients. With our platform, she now has a central hub where she can organize all client information and track deliverables effortlessly.",
    role: "Marketing Manager",
    focus: "TikTok Campaigns",
    avatar: "/lovable-uploads/369e361b-5139-4703-9ded-367f361429f1.png",
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
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {userScenarios.map((scenario, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="glass-card border-none scroll-animation h-full">
                    <CardHeader>
                      <div className="relative">
                        <div className="absolute inset-0 opacity-10">
                          <img
                            src={scenario.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="relative z-10 flex items-center gap-6 mb-4">
                          <Avatar className="h-24 w-24 rounded-xl">
                            <AvatarImage
                              src={scenario.avatar}
                              alt={scenario.role}
                              className="object-cover"
                            />
                          </Avatar>
                          <div>
                            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              {scenario.title}
                            </CardTitle>
                            <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                              <span>{scenario.role}</span>
                              <span>•</span>
                              <span>{scenario.focus}</span>
                            </div>
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