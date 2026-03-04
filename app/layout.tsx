import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "NoteHub - Smart Note Managment App",
  description: "NoteHub is a modern note managment application build with Next.js. Create, filter and manage your notes efficiently.",
  openGraph: {
    type: "website",
    url: "https://hannamuzychuk-08-zustand.vercel.app",
    title: "NoteHub - Smart Note Managment App",
  description: "NoteHub is a modern note managment application build with Next.js. Create, filter and manage your notes efficiently.",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200, 
        height: 630,
        alt: "NoteHub Page Preview",
        }
      ]  
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
    modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
