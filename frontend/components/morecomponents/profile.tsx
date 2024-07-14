"use client";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React, { SyntheticEvent, useState } from "react";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ModeToggle } from "./ui/toggle-mode";
import {
  useStudentLogoutMutation,
  useTeachersLogoutMutation,
} from "@/redux/slices/studentApiSlice";
import { setCredentials } from "@/redux/slices/authSlice";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuItem } from "./ui/navbar-menu";
// import { ProfileDropdown } from "./profile";
export function ProfileDropdown() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [active, setActive] = useState<string | null>(null);

  const [logoutApiCall] = useStudentLogoutMutation();
  const [logoutTeacherApiCall] = useTeachersLogoutMutation();

  const { userInfo, userType } = useSelector((state: any) => state.auth);

  const handleLoginLogout = async (e: SyntheticEvent) => {
    if (userInfo) {
      try {
        console.log("Logging Out");
        let res;
        if (userType === "student") res = await logoutApiCall({}).unwrap();
        else res = await logoutTeacherApiCall({}).unwrap();
        console.log(res);
        dispatch(logout());
        router.push("/");
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-full h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            href={userInfo ? "/profile" : "/newsignin"}
            // className={cn(
            //     "transition-colors hover:text-foreground/100 px-4  flex items-center hover:transition hover:border-b-2",
            //     pathname?.startsWith("/newsignin")
            //         ? "text-foreground"
            //         : "text-foreground/60"
            // )}
            // onClick={handleLoginLogout}
          >
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link
          href={userInfo ? "/" : "/newsignin"}
          // className={cn(
          //     "transition-colors hover:text-foreground/100 px-4  flex items-center hover:transition hover:border-b-2",
          //     pathname?.startsWith("/newsignin")
          //         ? "text-foreground"
          //         : "text-foreground/60"
          // )}
          onClick={handleLoginLogout}
        >
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
