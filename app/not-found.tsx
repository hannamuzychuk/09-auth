import { Metadata } from "next";
import css from "./page.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist in the NoteHub application.",
  metadataBase: new URL("https://hannamuzychuk-08-zustand.vercel.app/not-found"),
 openGraph: {
    title: "404 - Page Not Found",
    description: "The page you are looking for does not exist in the NoteHub application.",
    url: "https://hannamuzychuk-08-zustand.vercel.app/not-found",

    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200, 
        height: 630,
        alt: "NoteHub 404 Not Found",
        }
      ]  
  }
}

export default function NotFound() {

  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back!</Link>
    </>
  );
}
