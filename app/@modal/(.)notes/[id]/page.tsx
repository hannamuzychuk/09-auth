
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import { fetchNoteById } from "@/lib/api/clientApi";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";

interface NoteModalProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModal({ params }: NoteModalProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

    const note = await fetchNoteById(id);
  if (!note) return notFound();

 await queryClient.prefetchQuery({
  queryKey: ["note", id],
  queryFn: () => fetchNoteById(id),
});
  
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}
