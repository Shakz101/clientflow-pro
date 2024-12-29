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
import type { RegistrationData } from "@/pages/Register";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { SlideShow } from "./SlideShow";

const formSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type Props = {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onSubmit: () => void;
  onBack: () => void;
};

export const ReviewConfirmation = ({
  data,
  updateData,
  onSubmit,
  onBack,
}: Props) => {
  const [showSlideShow, setShowSlideShow] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termsAccepted: data.termsAccepted,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
    onSubmit();
    setShowSlideShow(true);
  };

  if (showSlideShow) {
    return <SlideShow selectedTools={data.selectedTools} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Review Your Information</CardTitle>
            <CardDescription>
              Please review your registration details below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Company Details</h3>
              <p>Company Name: {data.companyName}</p>
              <p>Contact Person: {data.contactPerson}</p>
              <p>Email: {data.email}</p>
              {data.phone && <p>Phone: {data.phone}</p>}
              <p>Password: {data.password ? "••••••" : "Not set"}</p>
            </div>
            <div>
              <h3 className="font-medium">Business Type</h3>
              <p>{data.businessType}</p>
              {data.otherBusinessType && (
                <p>Specified as: {data.otherBusinessType}</p>
              )}
            </div>
            <div>
              <h3 className="font-medium">Selected Tools</h3>
              <ul className="list-disc list-inside">
                {data.selectedTools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
                {data.otherTools?.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I agree to the terms and conditions</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormMessage />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="glass-button"
          >
            Back
          </Button>
          <Button type="submit" className="glass-button">
            Complete Registration
          </Button>
        </div>
      </form>
    </Form>
  );
};