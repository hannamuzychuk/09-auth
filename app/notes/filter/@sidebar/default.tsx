import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { NoteTag } from "@/types/note";

const tags: NoteTag[] = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag === "all" ? "All notes" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}