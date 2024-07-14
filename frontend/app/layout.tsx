// "use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/morecomponents/theme-provider";
import { NavbarDemo } from "@/components/morecomponents/floating-nav";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Toaster } from "@/components/ui/toaster"
import { Toaster } from "@/components/ui/sonner"
export const metadata: Metadata = {
  title: "Minor Project Management",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <ToastContainer theme={"dark"} />
            <NavbarDemo />
            <div className="absolute w-full top-24">{children}</div>
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
