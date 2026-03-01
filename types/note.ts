export interface Note {
  id: string;
  tag: NoteTag;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | "all";
