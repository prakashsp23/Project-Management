"use client";
import React, { SyntheticEvent, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ModeToggle } from "./ui/toggle-mode";
import { useLogoutMutation } from "@/redux/slices/studentApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { ProfileDropdown } from "./profile";
import { SlideTabs } from "./SlideTabs";

export function NavbarDemo() {
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  // return (

  // <div className="relative w-full flex items-center justify-center ">
  //   <Navbar className="top-2" />
  // </div>
  // );
  if (userInfo) {
    return <div suppressHydrationWarning={true} className="relative w-full flex items-center justify-center ">
      <Navbar  className="top-2" />
    </div>;
  } else {
    return null;
  }
}

function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  // const dispatch = useDispatch();
  // const router = useRouter();

  const [active, setActive] = useState<string | null>(null);

  // const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  // const handleLoginLogout = async (e: SyntheticEvent) => {
  //   if (userInfo) {
  //     try {
  //       console.log("Logging Out");
  //       const res = await logoutApiCall({}).unwrap();
  //       console.log(res);
  //       dispatch(logout({}));
  //       router.push("/");
  //     } catch (error: any) {
  //       toast.error(error?.data?.message || error.error);
  //     }
  //   }
  // };

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <SlideTabs />
      
      {/* <Menu setActive={setActive}>
        <Link
          href="/team"
          className={cn(
            "transition-colors hover:text-foreground/100 px-4 flex items-center hover:transition hover:border-b-2",
            pathname === "/team" ? "text-foreground" : "text-foreground/60"
          )}
        >
          <MenuItem
            setActive={setActive}
            active={active}
            item="Team"
          ></MenuItem>
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
          <MenuItem
            setActive={setActive}
            active={active}
            item="Projects"
          ></MenuItem>
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
          <MenuItem
            setActive={setActive}
            active={active}
            item="Notification"
          ></MenuItem>
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
          <MenuItem
            setActive={setActive}
            active={active}
            item="Chat"
          ></MenuItem>
        </Link>
        <div className="pl-2 pr-4">
          <ModeToggle />
        </div>
        <ProfileDropdown/>
      </Menu> */}
    </div>
  );
}
