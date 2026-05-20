import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hintro Dashboard",
  description: "Dashboard application for Hintro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)] font-sans">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
