import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState, useEffect } from "react";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateNote, useUpdateNote } from "@/hooks/mutations/notes";
import { useQueryClient } from "@tanstack/react-query";

const notesSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export type NoteFormValues = z.infer<typeof notesSchema>;

export default function AddNoteDialog({
  initialValues,
  trigger,
  noteId,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
}: {
  trigger?: React.ReactNode;
  initialValues?: NoteFormValues;
  noteId?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledOnOpenChange || setInternalIsOpen;

  const { mutate: createNote, isPending: isCreating } = useCreateNote();
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote();
  const queryClient = useQueryClient();
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(notesSchema),
    defaultValues: initialValues || {
      title: "",
      content: "",
    },
  });

  const isEditMode = !!noteId;
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  const onSubmit = async (data: z.infer<typeof notesSchema>) => {
    if (isEditMode && noteId) {
      updateNote(
        { id: noteId, note: { title: data.title, content: data.content } },
        {
          onSuccess: () => {
            form.reset();
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["notes"] });
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    } else {
      createNote(
        { title: data.title, content: data.content },
        {
          onSuccess: () => {
            form.reset();
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["notes"] });
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={`${isEditMode ? "sm:max-w-2xl" : "sm:max-w-3xl"}`}
      >
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Note" : "Add Note"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-h-[70vh] overflow-y-auto"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Content" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            loading={isPending}
          >
            {isEditMode ? "Update Note" : "Add Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
