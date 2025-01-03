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
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const userScenarios = [
  {
    title: "Meet Raj, the TikTok Marketing Agency Business Owner",
    description:
      "Raj manages a thriving TikTok marketing agency with clients across multiple industries. He needed a robust system to handle his growing client base, track campaign performance, and streamline communication. Our platform helped him scale his agency by providing a centralized hub for client management and campaign tracking.",
    role: "Agency Owner",
    focus: "TikTok Marketing",
    avatar: "/lovable-uploads/7589de35-4f47-4e65-ab91-cbe0656ecfe8.png",
  },
  {
    title: "Meet Alex, the Web Developer",
    description:
      "Alex runs a growing web development studio. He found himself drowning in client requests, design files, and project timelines spread across different tools. Our platform helped him create a streamlined workflow where he can manage all client projects from a single dashboard.",
    role: "Development Lead",
    focus: "Website Projects",
    avatar: "/cartoon-developer.svg",
  },
  {
    title: "Meet Lisa, the Digital Consultant",
    description:
      "Lisa provides marketing strategy for multiple businesses. She was spending more time on administrative tasks than actual consulting. Using our platform, she automated her client management workflow and reduced admin time by 40%, giving her more time for strategic planning.",
    role: "Strategy Consultant",
    focus: "Digital Marketing",
    avatar: "/cartoon-consultant.svg",
  },
];

export function FeaturesSection() {
  const autoplayRef = useRef(
    Autoplay({
      delay: 10000,
      stopOnInteraction: true,
    })
  );

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="max-w-[90rem] mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
          Real Solutions for Real Challenges
        </h2>
        <div className="mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplayRef.current]}
            className="w-full max-w-[80rem] mx-auto"
          >
            <CarouselContent>
              {userScenarios.map((scenario, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <Card className="glass-card border-none scroll-animation h-full transform transition-all duration-1000 hover:scale-[1.02] hover:shadow-2xl group">
                    <CardHeader>
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <div className="absolute inset-0 opacity-25 bg-gradient-to-br from-primary via-secondary to-accent">
                          <div className="absolute inset-0 backdrop-blur-xl"></div>
                          <img
                            src={scenario.avatar}
                            alt=""
                            className="w-full h-full object-cover mix-blend-overlay opacity-50"
                          />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8">
                          <Avatar className="h-40 w-40 rounded-3xl shadow-2xl ring-8 ring-primary/20 transform transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6">
                            <AvatarImage
                              src={scenario.avatar}
                              alt={scenario.role}
                              className="object-cover"
                            />
                          </Avatar>
                          <div className="text-center md:text-left">
                            <CardTitle className="text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 leading-tight [transition:_background-position_4s_ease-in-out] bg-[size:200%] hover:bg-[position:100%]">
                              {scenario.title}
                            </CardTitle>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xl mt-4">
                              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold backdrop-blur-md transform transition-all duration-1000 hover:scale-105 hover:bg-primary/20">
                                {scenario.role}
                              </span>
                              <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold backdrop-blur-md transform transition-all duration-1000 hover:scale-105 hover:bg-secondary/20">
                                {scenario.focus}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 py-12">
                      <CardDescription className="text-2xl leading-relaxed text-foreground/80 font-medium">
                        {scenario.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-8 mt-12">
              <CarouselPrevious className="relative h-12 w-12 hover:scale-110 transition-transform duration-1000 bg-primary/10 hover:bg-primary/20 border-primary/20" />
              <CarouselNext className="relative h-12 w-12 hover:scale-110 transition-transform duration-1000 bg-primary/10 hover:bg-primary/20 border-primary/20" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}