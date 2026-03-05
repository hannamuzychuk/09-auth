import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/serverApi"; 
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    return {
      title: "Note not found",
      description: "This note does not exist",
    };
  }

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 150),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 150),
      url: `09-auth-kohl-one.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
