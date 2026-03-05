import { cookies } from "next/headers";
import { NextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export const fetchNotes = async (page: number, tag?: string, activeTag?: string | undefined) => {
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

export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = cookies();

   const response = await NextServer.get<User>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
};

export const refreshSession = async (refreshToken: string) => {
  try {
    const { data } = await NextServer.post<{
      accessToken: string;
      refreshToken: string;
    }>("/auth/refresh", {}, { headers: { Authorization: `Bearer ${refreshToken}` } });

    return data;
  } catch {
    return null;
  }
};