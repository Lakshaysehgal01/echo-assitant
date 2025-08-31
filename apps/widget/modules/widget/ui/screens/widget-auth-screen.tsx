import { Button } from "@workspace/ui/components/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";

import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import { useAtomValue, useSetAtom } from "jotai";
import {
  contactSessionIdAtomFamily,
  organizationIdAtom,
} from "@/modules/widget/atoms/widget-atom";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters long"),
  email: z.string().email("Please enter a valid email address"),
});
export const WidgetAuthScreen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const organizationId = useAtomValue(organizationIdAtom); // Replace with actual organization ID
  const setContactSessionId = useSetAtom(
    contactSessionIdAtomFamily(organizationId || "")
  );
  const createContactSession = useMutation(api.public.contactSession.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!organizationId) {
      return;
    }
    const metaData: Doc<"contactSession">["metaData"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(","),
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      referrer: document.referrer || "direct",
      cookieEnable: navigator.cookieEnabled,
      currentUrl: window.location.href,
    };
    const contactsessionId = await createContactSession({
      ...values,
      metaData,
      organizationId,
    });
    setContactSessionId(contactsessionId);
  };
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className=" text-3xl">Hi There! 👋</p>
          <p className="text-lg"> Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <Form {...form}>
        <form
          className="flex flex-1 flex-col gap-y-4 p-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder={"eg john doe"}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-background"
                    placeholder={"eg johndoe@example.com"}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            size={"lg"}
            type="submit"
          >
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
};
