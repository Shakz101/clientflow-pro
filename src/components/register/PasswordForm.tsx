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
import type { RegistrationData } from "@/pages/Register";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type Props = {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const PasswordForm = ({ data, updateData, onNext, onBack }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: data.password || "",
      confirmPassword: data.password || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData({ password: values.password });
    onNext();
  };

  const fillDemoData = () => {
    form.setValue("password", "demo123456");
    form.setValue("confirmPassword", "demo123456");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={fillDemoData}
            className="glass-button"
            size="sm"
          >
            <Wand2 className="w-4 h-4" />
            Fill Demo Data
          </Button>
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create a password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm your password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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