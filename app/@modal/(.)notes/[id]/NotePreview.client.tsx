"use client"

import { Note } from "@/types/note";
import { useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

interface NotePreviewProps {
 noteId: string;
}

export default function NotePreview({ noteId}: NotePreviewProps) {
  const router = useRouter();

 const { data: note, isLoading, isError } = useQuery<Note>({
 queryKey: ["note", noteId],
  queryFn: () => fetchNoteById(noteId),
  refetchOnMount: false,
});
  
 if (isLoading)
    return (
      <Modal onClose={() => router.back()}>
        <p>Loading...</p>
      </Modal>
    );

  if (isError || !note)
    return (
      <Modal onClose={() => router.back()}>
        <p>Note not found</p>
      </Modal>
    );

  return (
  <Modal onClose={() => router.back()}>
  <h2>{note.title}</h2>
  {note.tag && <span className={css.tag}>{note.tag}</span>}
  <p className={css.content}>{note.content}</p>
  <p className={css.date}>Created: {note.createdAt}</p>
  {note.updatedAt && <p className={css.date}>Updated: {note.updatedAt}</p>}
  <button className={css.backBtn} onClick={() => router.back()}>
    ← Back
  </button>
</Modal>
    
  );
}
