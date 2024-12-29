import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, CreditCard, Facebook, LineChart as ChartIcon } from "lucide-react";

const demoData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 }
];

interface SlideShowProps {
  selectedTools: string[];
  onSubmit?: (formData: any) => Promise<void>;
}

export const SlideShow = ({ selectedTools, onSubmit }: SlideShowProps) => {
  const navigate = useNavigate();
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!autoPlay) {
        if (onSubmit) {
          onSubmit({
            name: "Demo Client",
            email: "demo@example.com",
            tools: selectedTools
          });
        } else {
          navigate("/dashboard");
        }
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [autoPlay, navigate, onSubmit, selectedTools]);

  const slides = [
    {
      id: "stripe",
      title: "Simplify Your Payments, Maximize Your Revenue",
      icon: <CreditCard className="w-12 h-12 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-lg">Streamline your payment workflows with:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Centralized dashboards for real-time revenue tracking</li>
            <li>Automated syncing for transactions and payouts</li>
            <li>Effortless subscription management tools</li>
          </ul>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={demoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ),
    },
    {
      id: "facebook",
      title: "Unleash Your Ad Potential",
      icon: <Facebook className="w-12 h-12 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-lg">Take control of your Facebook campaigns:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Seamless ad creation and campaign management</li>
            <li>Real-time performance insights</li>
            <li>Multi-account management capabilities</li>
          </ul>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={demoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ),
    },
    {
      id: "google-ads",
      title: "Master the Art of Precision Marketing",
      icon: <ChartIcon className="w-12 h-12 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-lg">Optimize your Google Ads performance:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Real-time campaign tracking</li>
            <li>Simplified bid management</li>
            <li>Actionable performance insights</li>
          </ul>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={demoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ),
    },
    {
      id: "final",
      title: "Your Tools, One Platform, Unlimited Growth",
      icon: <ArrowRight className="w-12 h-12 text-blue-500" />,
      content: (
        <div className="space-y-6 text-center">
          <p className="text-xl">
            Welcome to your new command center for business growth
          </p>
          <p className="text-lg text-muted-foreground">
            All your selected tools are pre-integrated and ready to use
          </p>
          <Button
            onClick={() => {
              setAutoPlay(false);
              navigate("/dashboard");
            }}
            className="glass-button text-lg px-8 py-6"
          >
            Go to Dashboard
          </Button>
        </div>
      ),
    },
  ];

  const filteredSlides = slides.filter(
    (slide) =>
      selectedTools.includes(slide.id) || slide.id === "final"
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-8 animate-fade-in">
      <Carousel className="w-full">
        <CarouselContent>
          {filteredSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <Card className="glass">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">{slide.icon}</div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {slide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>{slide.content}</CardContent>
                <CardFooter className="justify-center">
                  <p className="text-sm text-muted-foreground">
                    {slide.id === "final" ? "Click to continue" : "Swipe or use arrows to navigate"}
                  </p>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};