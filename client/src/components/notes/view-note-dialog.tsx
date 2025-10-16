import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

type Note = {
  title: string;
  content: string;
  _id: string;
};

export default function ViewNoteDialog({
  note,
  isOpen,
  onOpenChange,
  onEdit,
  onDelete,
}: {
  note: Note | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}) {
  if (!note) return null;

  const handleEdit = () => {
    onEdit(note);
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete(note._id);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 pr-8 flex items-center justify-between">
            {note.title}{" "}
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleEdit}>
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="hover:text-destructive"
                onClick={handleDelete}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
            {note.content}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
