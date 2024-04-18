import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brain Tumor Classification",
  description:
    "Welcome to the Brain Tumor Classification Frontend! This project aims to provide a user-friendly interface for uploading brain scan images and obtaining classification results indicating the presence or absence of a brain tumor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        {children}
        <footer className="h-[5vh] m-auto w-screen flex flex-row justify-center items-center text-lg font-bold gap-2">
          Created By:
          <a
            href="https://github.com/Toluwaa-o"
            target="_blank"
            className="text-darkerBlue"
          >
            Toluwalashe
          </a>
          | {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
