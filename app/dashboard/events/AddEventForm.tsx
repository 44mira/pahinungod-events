"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { AddEventSchema, type AddEventFields } from "./_api/schemas";
import useAddEventMutation from "@/hooks/use-add-event-mutation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function AddEventForm() {
  const { mutate } = useAddEventMutation();
  const form = useForm<AddEventFields>({
    resolver: zodResolver(AddEventSchema),
    defaultValues: {
      event_id: "",
      admin_id: "",
      name: "",
      location: "",
      description: "",
      event_start: "",
      event_end: "",
    },
  });

  useEffect(() => {
    form.setValue("event_id", crypto.randomUUID());
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formData) => {
          mutate(formData);
          document.getElementById("cancel")!.click();
        })}
        className="grid grid-cols-2 gap-2"
      >
        <FormField
          control={form.control}
          name="event_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event ID</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="admin_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event_start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Start</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event_end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event End</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                {/* @ts-ignore: invalid fields */}
                <Textarea
                  placeholder="This field is optional"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex flex-row-reverse gap-3">
          <DialogClose asChild>
            <Button id="cancel">CANCEL</Button>
          </DialogClose>
          <Button type="submit">SAVE</Button>
        </div>
      </form>
    </Form>
  );
}
