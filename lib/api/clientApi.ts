import  { AxiosError } from "axios";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { NextServer } from "./api";


// export const NextServer = axios.create({
//   baseURL: "https://notehub-api.goit.study",
//   withCredentials: true, 
// });

export type ApiError = AxiosError<{ error: string }>;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string; 
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const { data } = await NextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(search && { search }),
      ...(tag && { tag }),
    },
  });
  return data || [];
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await NextServer.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const { data } = await NextServer.post<Note>("/notes", note);
   if (!data) throw new Error("Could not create note");
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await NextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const { data: user } = await NextServer.post<User>("/auth/register", data);
  if (!user) throw new Error("Register failed: no data");
  return user;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const { data: user } = await NextServer.post("/auth/login", data);
  return user;
};

export const logout = async (): Promise<void> => {
  await NextServer.post("/auth/logout");
};

export const updateMe = async (username: string): Promise<User> => {
  const { data } = await NextServer.patch("/user/me", { username });
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const {data} = await NextServer.get<User | null>("/auth/session");
    return data;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const res = await NextServer.get<User>("/users/me");
  return res.data;
};