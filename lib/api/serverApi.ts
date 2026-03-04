import { cookies } from "next/headers";
import { NextServer } from "./api";
import { Note} from "@/types/note";
import { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotesServer = async (page: number, tag?: string) => {
  const cookieStore = cookies(); 

  const { data } = await NextServer.get(`/notes`, {
    headers: { Cookie: cookieStore.toString() },
    params: { page, perPage: 12, ...(tag && { tag }) },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
  const res = await NextServer.get(`/notes/${id}`, { headers: { Cookie: cookieStore.toString() } });
  return res.data;
};


export const getMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const res = await NextServer.get("/users/me", { headers: { Cookie: cookieStore.toString() } });
  return res.data;
};

export const checkSession = async (): Promise<User | null> => {
  const cookieStore = cookies();
  try {
    const res = await NextServer.get("/auth/session", { headers: { Cookie: cookieStore.toString() } });
    return res.data || null;
  } catch {
    return null;
  }
};