"use client"
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/toggle-mode"; 
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="fixed w-full top-0 bg-opacity-50 backdrop-blur-lg z-50">
      <div className="h-10vh flex justify-between lg:py-5 px-20 py-4 border-b-2">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">
            Logo
          </span>
        </div>
        <div className="lg:flex md:flex lg: flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10">
            <ul className="flex gap-4 mr-2">
              <Link
                href="/team"
                className={cn(
                  "transition-colors hover:text-foreground/100 px-4 flex items-center hover:transition hover:border-b-2",
                  pathname === "/team" ? "text-foreground" : "text-foreground/60"
                )}
              >
                Team
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "transition-colors hover:text-foreground/100 px-4 flex items-center hover:transition hover:border-b-2  ",
                  pathname?.startsWith("/projects")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Projects
              </Link>
              <Link
                href="/notification"
                className={cn(
                  "transition-colors hover:text-foreground/100 px-4 flex items-center hover:transition hover:border-b-2 ",
                  pathname?.startsWith("/notification")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Notification
              </Link>
              <Link
                href="/chat"
                className={cn(
                  "transition-colors hover:text-foreground/100 px-4 flex items-center hover:transition hover:border-b-2",
                  pathname?.startsWith("/chat")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Chat
              </Link>
              <div className="ml-2"><ModeToggle /></div>
              {/* <Link
          href="https://www.w3schools.com/"
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          GitHub
        </Link> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar;



