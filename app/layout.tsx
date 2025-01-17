import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";

import "./globals.css";
import { TaskProvider } from "@/context/TaskContext";
import { CategoryProvider } from "@/context/CategoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo",
  description: "A simple todo app to manage your tasks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <PrimeReactProvider>
          <TaskProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </TaskProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
