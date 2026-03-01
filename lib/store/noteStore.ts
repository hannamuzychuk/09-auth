import { NoteTag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DraftNote {
    title: string;
    content: string;
    tag: NoteTag;
}

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
    draft: DraftNote;
    setDraft: (note: Partial<DraftNote>) => void;
    clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (partial) => set((state) => ({
                draft: {
                    ...state.draft,
                    ...partial,
                },
            })),
            clearDraft: () => set({draft: initialDraft}),
        }),
        {name: "note-draft", partialize: (state) => ({draft: state.draft})},
    ),
)
