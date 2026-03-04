import { fetchNotes } from "@/lib/api/clientApi";
import { NoteTag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}
export async function generateMetadata({ params }: FilterPageProps): 
  Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const tag = slug[0] || "all";
  const activeTag = tag === "all" ? "All Notes" : `${tag} Notes`;

  const title = `Notes filtered by ${activeTag}`;
  const description = tag === "all" ? "Browse all notes in Notehub" : `Browse notes filtered by ${tag} category in NoteHub `;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hannamuzychuk-08-zustand.vercel.app/notes/${tag}`,
      images: [
        {
           url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Filtered by ${activeTag}`,
        }
      ]

    }
  }
  }

export default async function FilterPage({ params }: FilterPageProps) {
   const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const tag = slug[0] || "all";

const activeTag = tag === "all" ? undefined : (tag as NoteTag);
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
 queryKey: ["notes", 1, "", activeTag],
    queryFn: () => fetchNotes(1, "", activeTag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient activeTag={activeTag} />
    </HydrationBoundary>
  );
}
