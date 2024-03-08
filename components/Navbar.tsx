
// import Upload from './Upload';

import { Button } from "./ui/button";
import { ModeToggle } from "./ui/toggle-mode";

// function Navbar() {
//   return (
//     <div classNameName="bg-[#121212] flex flex-col items-center p-40 py-4  md:p-1 ">
//       <div classNameName="navbar container mx-auto max-w-7xl flex justify-between items-center">
//         <a
//           href="/"
//           classNameName="font-aquatico tracking-wider text-3xl font-bold text-white"
//         >
//           {/* <span classNameName="font-anurati text-5xl">P</span> */}
//           Project
//         </a>
//         <ul classNameName="flex space-x-4">
//           <li>
//             <a href="" classNameName="text-white">
//               Team
//             </a>
//           </li>
//           <li>
//             <a href="" classNameName="text-white">
//             Notification
//             </a>
//           </li>
//           <li>
//             <a href="" classNameName="text-white md:pr-3">
//             Projects
//             </a>
//           </li>
//         </ul>
//       </div>
//       {/* Upload Component */}
//       {/* <Upload /> */}
//       {/* <About /> */}
//     </div>
//   );
// }

// export default Navbar;
// "use client"

// import * as React from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// // import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
// // import { Icons } from "@/components/icons"
// // import { Badge } from "@/registry/new-york/ui/badge"

// export default function Navbar() {
//   const pathname = usePathname()

//   return (
//     <div classNameName="p-3 hidden md:flex border-2	border-black	">
//       {/* <Link href="/" classNameName="mr-6 flex items-center space-x-2">
//         <Icons.logo classNameName="h-6 w-6" />
//         <span classNameName="hidden font-bold sm:inline-block">
//           {siteConfig.name}
//         </span>
//       </Link> */}
//       <nav classNameName="flex items-center gap-6 text-sm">
//         <Link
//           href="/team"
//           classNameName={cn(
//             "transition-colors hover:text-foreground/80",
//             pathname === "/team" ? "text-foreground" : "text-foreground/60"
//           )}
//         >
//           Team
//         </Link>
//         <Link
//           href="/projects"
//           classNameName={cn(
//             "transition-colors hover:text-foreground/80",
//             pathname?.startsWith("/projects")
//               ? "text-foreground"
//               : "text-foreground/60"
//           )}
//         >
//           Projects
//         </Link>
//         <Link
//           href="/themes"
//           classNameName={cn(
//             "transition-colors hover:text-foreground/80",
//             pathname?.startsWith("/themes")
//               ? "text-foreground"
//               : "text-foreground/60"
//           )}
//         >
//           Notification
//         </Link>
//         <Link
//           href="/examples"
//           classNameName={cn(
//             "transition-colors hover:text-foreground/80",
//             pathname?.startsWith("/examples")
//               ? "text-foreground"
//               : "text-foreground/60"
//           )}
//         >
//           Chat
//         </Link>
//         {/* <Link
//         //   href={siteConfig.links.github}
//           classNameName={cn(
//             "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
//           )}
//         >
//           GitHub
//         </Link> */}
//       </nav>
//     </div>
//   )
// }
export default function Nav(){
  return (
    // <div>hii</div>
    <header>
      <nav>
        <ul className="flex items-center justify-between p-4">
          <li className="">
            <a className="m-2">Team</a>
            <a className="m-2">Projects</a>
            <a className="m-2">Notification</a>
            </li>
          <li><ModeToggle/></li>
        </ul>
        
      </nav>
    </header>
  )
}



