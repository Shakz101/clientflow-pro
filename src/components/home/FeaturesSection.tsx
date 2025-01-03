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

const userScenarios = [
  {
    title: "TikTok Marketing Agency Success",
    description: `"As a TikTok marketing agency, I was struggling to keep track of multiple client campaigns and their content calendars. Now, I can organize all my clients' information, track project progress, and store campaign assets in one place. It's transformed how we manage our growing client base."`,
    role: "Marketing Agency Owner",
    focus: "Social Media Marketing",
  },
  {
    title: "Web Development Studio Growth",
    description: `"Managing multiple web development projects used to be chaotic. With this platform, I can now track client requirements, store design assets, and maintain clear communication channels. It's helped us scale from 5 to 15 clients without dropping the ball."`,
    role: "Web Development Studio Lead",
    focus: "Website Development",
  },
  {
    title: "Digital Marketing Consultancy",
    description: `"Running a consultancy means juggling different client needs and deliverables. This platform has streamlined our workflow - from onboarding new clients to tracking campaign metrics. We've reduced admin time by 40% and can focus more on strategy."`,
    role: "Digital Marketing Consultant",
    focus: "Performance Marketing",
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
                      <CardTitle className="text-2xl">{scenario.title}</CardTitle>
                      <div className="flex gap-2 text-sm text-muted-foreground">
                        <span>{scenario.role}</span>
                        <span>•</span>
                        <span>{scenario.focus}</span>
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