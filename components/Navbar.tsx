"use client"
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/toggle-mode";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
function Navbar() {
  const pathname = usePathname()
  return (
    <div className="p-3 hidden md:flex border-2 	border-black	">
{/* //       <Link href="/" className="mr-6 flex items-center space-x-2">
//         <Icons.logo className="h-6 w-6" />
//         <span className="hidden font-bold sm:inline-block">
//           {siteConfig.name}
//         </span>
//       </Link> */}
      <nav className=" items-center grid grid-cols-8 gap-6 text-sm">
        <div className="col-start-2 col-span-1">Project Name</div>
        <div className="flex justify-end col-start-8 items-center col-span-2">
          <Link
          href="/team"
          className={cn(
            "transition-colors hover:text-foreground/100 px-4",
            pathname === "/team" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Team
        </Link>
        <Link
          href="/projects"
          className={cn(
            "transition-colors hover:text-foreground/100 px-4",
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
            "transition-colors hover:text-foreground/100 px-4",
            pathname?.startsWith("/Notification")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Notification
        </Link>
        <Link
          href="/chat"
          className={cn(
            "transition-colors hover:text-foreground/100 px-4",
            pathname?.startsWith("/Chat")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Chat
        </Link>
        {/* <Link
          href="https://www.w3schools.com/"
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          GitHub
        </Link> */}
        <div className="px-4"><ModeToggle/></div>
        </div>
      </nav>
      
    </div>
  );
}

export default Navbar;



