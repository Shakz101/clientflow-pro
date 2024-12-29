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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { RegistrationData } from "@/pages/Register";

const formSchema = z.object({
  selectedTools: z.array(z.string()).min(1, "Please select at least one tool"),
  otherTools: z.array(z.string()).optional(),
});

type Props = {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
};

const tools = [
  { id: "stripe", label: "Stripe" },
  { id: "facebook", label: "Facebook" },
  { id: "google-ads", label: "Google Ads" },
  { id: "hubspot", label: "HubSpot" },
  { id: "other", label: "Other" },
];

export const ToolsIntegrationsForm = ({
  data,
  updateData,
  onNext,
  onBack,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedTools: data.selectedTools,
      otherTools: data.otherTools,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
    onNext();
  };

  const showOtherInput = form.watch("selectedTools")?.includes("other");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="selectedTools"
          render={() => (
            <FormItem>
              <FormLabel>What tools does your business use?</FormLabel>
              <div className="space-y-4">
                {tools.map((tool) => (
                  <FormField
                    key={tool.id}
                    control={form.control}
                    name="selectedTools"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={tool.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(tool.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, tool.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== tool.id)
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {tool.label}
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

        {showOtherInput && (
          <FormField
            control={form.control}
            name="otherTools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify other tools</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tool names (comma-separated)"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((tool) => tool.trim())
                      )
                    }
                    value={field.value?.join(", ")}
                  />
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