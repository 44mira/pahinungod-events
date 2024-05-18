import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import useUpdateEventMutation from "@/hooks/use_update_event_mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import edit_icon from "@/public/edit_icon.svg";
import { UUID } from "crypto";
import {
  UpdateEventSchema,
  UpdateEventFields,
  AddEventFields,
} from "../_types/schemas";

export default function UpdateEvent({
  event_id,
  eventInfo,
  disabled,
}: {
  event_id: UUID;
  eventInfo: AddEventFields;
  disabled: boolean;
}) {
  const { mutate: updateEvent } = useUpdateEventMutation(event_id);
  const form = useForm<UpdateEventFields>({
    resolver: zodResolver(UpdateEventSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      event_start: "",
      event_end: "",
      orientation_date: undefined,
    },
    values: eventInfo,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full max-w-fit" disabled={disabled}>
          <Image src={edit_icon} alt="edit icon" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[40%]">
        <DialogTitle>Update Event</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) => {
              updateEvent(formData);
              document.getElementById("cancel")!.click();
            })}
            className="grid grid-cols-2 gap-4"
          >
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

            <div hidden={!eventInfo?.orientation_date ?? false}>
              <FormField
                control={form.control}
                name="orientation_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orientation Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value.toString());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2 flex flex-row-reverse gap-3">
              <DialogClose asChild>
                <Button id="cancel">CANCEL</Button>
              </DialogClose>
              <Button type="submit">SAVE</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
