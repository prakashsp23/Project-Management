"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { ModeToggle } from "./ui/toggle-mode";
export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center ">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const pathname = usePathname()
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <Link
                    href="/team"
                    className={cn(
                        "transition-colors hover:text-foreground/100 px-4 flex items-center hover:transition hover:border-b-2",
                        pathname === "/team" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    <MenuItem setActive={setActive} active={active} item="Team"></MenuItem>
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
                    <MenuItem setActive={setActive} active={active} item="Projects"></MenuItem>
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
                    <MenuItem setActive={setActive} active={active} item="Notification"></MenuItem>
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
                    <MenuItem setActive={setActive} active={active} item="Chat"></MenuItem>
                </Link>
                <div className="pl-2"><ModeToggle /></div>
            </Menu>
        </div>
    );
}
