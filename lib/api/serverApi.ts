import { cookies } from "next/headers";
import { NextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Приватні запити для SSR / серверних компонентів

export const fetchNotesServer = async (page: number, tag?: string) => {
  const cookieStore = cookies();

  const { data } = await NextServer.get<FetchNotesResponse>("/notes", {
    headers: { Cookie: cookieStore.toString() },
    params: { page, perPage: 12, ...(tag && { tag }) },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
  const { data } = await NextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const { data } = await NextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

// Перевірка сесії користувача для proxy
export const checkSession = async (): Promise<User | null> => {
  const cookieStore = cookies();
  try {
    const { data } = await NextServer.get<User | null>("/auth/session", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch {
    return null;
  }
};