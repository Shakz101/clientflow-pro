import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Wand2 } from "lucide-react";

const platforms = [
  { id: "stripe", label: "Stripe" },
  { id: "facebook", label: "Facebook" },
  { id: "google-ads", label: "Google Ads" },
  { id: "hubspot", label: "HubSpot" },
  { id: "tiktok", label: "TikTok" },
];

const formSchema = z.object({
  platforms: z.array(z.string()).min(1, "Please select at least one platform"),
  platformDetails: z.record(z.string()).optional(),
});

type Props = {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const PlatformIntegrationForm = ({
  data,
  updateData,
  onNext,
  onBack,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platforms: data.platforms,
      platformDetails: data.platformDetails,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
    onNext();
  };

  const fillDemoData = () => {
    // Randomly select 2-3 platforms
    const numPlatforms = Math.floor(Math.random() * 2) + 2;
    const shuffledPlatforms = [...platforms].sort(() => Math.random() - 0.5);
    const selectedPlatforms = shuffledPlatforms.slice(0, numPlatforms).map(p => p.id);
    
    const demoDetails: Record<string, string> = {};
    selectedPlatforms.forEach(platform => {
      demoDetails[platform] = `demo_${platform}_${Math.random().toString(36).substring(7)}`;
    });

    form.setValue("platforms", selectedPlatforms);
    form.setValue("platformDetails", demoDetails);
  };

  const selectedPlatforms = form.watch("platforms");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={fillDemoData}
            className="gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Fill Demo Data
          </Button>
        </div>

        <FormField
          control={form.control}
          name="platforms"
          render={() => (
            <FormItem>
              <FormLabel>Select Platforms</FormLabel>
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <FormField
                    key={platform.id}
                    control={form.control}
                    name="platforms"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={platform.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(platform.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, platform.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== platform.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {platform.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedPlatforms?.map((platform) => (
          <FormField
            key={platform}
            control={form.control}
            name={`platformDetails.${platform}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {
                    platforms.find((p) => p.id === platform)?.label
                  } API Key (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter API key"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Previous Step
          </Button>
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  );
};