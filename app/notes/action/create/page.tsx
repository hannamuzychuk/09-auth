import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub. Add title, content and category to organize your ideas or plans.",
    openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub. Add title, content and category to organize your ideas or plans.",
        url: "https://hannamuzychuk-08-zustand.vercel.app/notes/action/create",
    images: [
        {
           url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Create new note",
        }
      ]
    }
}

export default function CreateNote() {
    return (
        <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	  <NoteForm />
  </div>
</main>
    )
}