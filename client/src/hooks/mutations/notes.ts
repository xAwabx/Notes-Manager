import { createNote, deleteNote, updateNote } from "@/actions/notes";
import { NoteFormValues } from "@/components/notes/add-note-dialog";
import { useMutation } from "@tanstack/react-query";

export const useCreateNote = () => {
  return useMutation({
    mutationFn: createNote,
  });
};

export const useDeleteNote = () => {
  return useMutation({
    mutationFn: deleteNote,
  });
};

export const useUpdateNote = () => {
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: Partial<NoteFormValues> }) =>
      updateNote({ id, note }),
  });
};
