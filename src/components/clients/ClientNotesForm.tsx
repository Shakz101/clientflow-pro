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
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  notes: z.string().optional(),
});

type Props = {
  data: any;
  updateData: (data: any) => void;
  onSubmit: () => void;
  onBack: () => void;
};

export const ClientNotesForm = ({
  data,
  updateData,
  onSubmit,
  onBack,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: data.notes,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
    onSubmit();
  };

  const fillDemoData = () => {
    const demoNotes = [
      "Client interested in expanding their digital marketing presence. Key focus areas include social media advertising and email campaigns.",
      "Requires integration with existing CRM system. Monthly review meetings scheduled for the first Tuesday of each month.",
      "High-priority client with multiple business units. Main point of contact prefers communication via email.",
    ];
    
    const randomNote = demoNotes[Math.floor(Math.random() * demoNotes.length)];
    form.setValue("notes", randomNote);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes about the client..."
                  className="min-h-[150px]"
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
          <Button type="submit">Add Client</Button>
        </div>
      </form>
    </Form>
  );
};