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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { RegistrationData } from "@/pages/Register";

const formSchema = z.object({
  businessType: z.string().min(1, "Please select a business type"),
  otherBusinessType: z.string().optional(),
});

type Props = {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
};

const businessTypes = [
  "Marketing Agency",
  "SaaS Provider",
  "E-commerce Business",
  "Freelance Professional",
  "Other",
];

export const BusinessTypeForm = ({ data, updateData, onNext, onBack }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: data.businessType,
      otherBusinessType: data.otherBusinessType,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
    onNext();
  };

  const showOtherInput = form.watch("businessType") === "Other";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What type of business are you?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {showOtherInput && (
          <FormField
            control={form.control}
            name="otherBusinessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify your business type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack} className="glass-button">
            Back
          </Button>
          <Button type="submit" className="glass-button">
            Next Step
          </Button>
        </div>
      </form>
    </Form>
  );
};