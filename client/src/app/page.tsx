"use client";

import { useState } from "react";
import AddNoteDialog from "@/components/notes/add-note-dialog";
import ViewNoteDialog from "@/components/notes/view-note-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetNotes } from "@/hooks/queries/notes";
import { useDeleteNote } from "@/hooks/mutations/notes";
import { useQueryClient } from "@tanstack/react-query";

type Note = {
  title: string;
  content: string;
  _id: string;
};

export default function Home() {
  const { data: notes, isLoading } = useGetNotes();
  const { mutate: deleteNote } = useDeleteNote();
  const queryClient = useQueryClient();

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsViewDialogOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditDialogOpen(true);
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-lg text-slate-600 animate-pulse">
          Loading your notes...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Add Note Button */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                My Notes
              </h1>
              <p className="text-slate-600">
                {notes && notes.length > 0
                  ? `You have ${notes.length} ${
                      notes.length === 1 ? "note" : "notes"
                    }`
                  : "Start by creating your first note"}
              </p>
            </div>
            <AddNoteDialog
              trigger={
                <Button
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Note
                </Button>
              }
            />
          </div>
        </div>

        {/* Notes Container */}
        {notes && notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note: Note) => (
              <Card
                key={note._id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer"
                onClick={() => handleNoteClick(note)}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 line-clamp-2">
                    {note.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 whitespace-pre-wrap line-clamp-6">
                    {note.content}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-white rounded-full p-6 mb-6 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-2">
              No notes yet
            </h3>
            <p className="text-slate-500 text-center max-w-md">
              Get started by creating your first note. Click the "Add Note"
              button above to begin.
            </p>
          </div>
        )}

        {/* View Note Dialog */}
        <ViewNoteDialog
          note={selectedNote}
          isOpen={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />

        {/* Edit Note Dialog */}
        <AddNoteDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          noteId={editingNote?._id}
          initialValues={
            editingNote
              ? { title: editingNote.title, content: editingNote.content }
              : undefined
          }
        />
      </div>
    </main>
  );
}
