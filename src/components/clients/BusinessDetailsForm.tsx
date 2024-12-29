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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  industry: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
});

const industries = [
  "Technology",
  "Retail",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Other",
];

type Props = {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const BusinessDetailsForm = ({
  data,
  updateData,
  onNext,
  onBack,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: data.businessName,
      industry: data.industry,
      website: data.website,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
    onNext();
  };

  const fillDemoData = () => {
    const companies = ["Acme Corp", "TechFlow", "InnovateLabs", "GlobalSolutions", "NextGen Systems"];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomIndustry = industries[Math.floor(Math.random() * (industries.length - 1))]; // Exclude "Other"
    
    form.setValue("businessName", randomCompany);
    form.setValue("industry", randomIndustry);
    form.setValue("website", `https://www.${randomCompany.toLowerCase().replace(/\s+/g, '')}.com`);
  };

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
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Website (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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