import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "This platform has transformed how we onboard clients. What used to take days now takes hours.",
    author: "Sarah Johnson",
    role: "Agency Director",
    company: "Digital Marketing Co.",
  },
  {
    quote:
      "The automated workflows and security features give us peace of mind. Highly recommended!",
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

export function TestimonialsSection() {
  return (
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
  );
}