import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContact } from "@/hooks/use-portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

type ContactData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const mutation = useContact();

  const form = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: ContactData) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-white/40 uppercase tracking-widest">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Name"
                  {...field}
                  className="h-11 bg-white/[0.04] border-white/[0.08] text-white/80 placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.06] transition-all rounded-xl"
                  data-testid="input-name"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-white/40 uppercase tracking-widest">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your.email@gmail.com"
                  {...field}
                  className="h-11 bg-white/[0.04] border-white/[0.08] text-white/80 placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.06] transition-all rounded-xl"
                  data-testid="input-email"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium text-white/40 uppercase tracking-widest">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Let's build something remarkable together..."
                  className="min-h-[130px] bg-white/[0.04] border-white/[0.08] text-white/80 placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.06] transition-all rounded-xl resize-none"
                  {...field}
                  data-testid="textarea-message"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full h-11 bg-white text-black font-semibold text-sm rounded-xl hover:bg-white/90 transition-all shadow-lg shadow-white/10"
          data-testid="button-submit"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
