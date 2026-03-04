import { Note } from "@/types/note";
import {  User } from "@/types/user";
import { NextServer } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
};

export interface RegisterRequest {
  email: string;
  password: string;
  iserName: string;
};


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const { data } = await NextServer.get("/notes", {
    params: {
      page,
      perPage: 12,
      ...(search && { search }),
      ...(tag && { tag }),
    },
  });

  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const { data } = await NextServer.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await NextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await NextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const { data: user } = await NextServer.post<User>("/auth/register", data);
  return user;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const { data: user } = await NextServer.post<User>("/auth/login", data);
  return user;
};

export const logout = async () => {
  await NextServer.post("/auth/logout");
};

export const updateMe = async (username: string): Promise<User> => {
  const { data } = await NextServer.patch<User>("user/me", { username });
  return data;
}