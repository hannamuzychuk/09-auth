"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.client.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { Toaster } from "react-hot-toast";
import Pagination from "@/components/Pagination/Pagination";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  activeTag?: NoteTag | string;
}

export default function NotesClient({ activeTag }: NotesClientProps) {
  // const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const { data, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search, (activeTag ?? "") as NoteTag],
    queryFn: () => fetchNotes(page, search, (activeTag ?? "") as NoteTag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />
        <Toaster position="top-right" />

        {isError && <p>Something went wrong while fetching notes.</p>}

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data &&
        (data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found.</p>
        ))}
    </div>
  );
}
