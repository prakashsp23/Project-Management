"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { SlideTabs } from "./SlideTabs";
export function NavbarDemo() {
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  if (userInfo) {
    return <div suppressHydrationWarning={true} className="relative w-full flex items-center justify-center ">
      <Navbar className="top-2" />
    </div>;
  } else {
    return null;
  }
}

function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <SlideTabs />

    </div>
  );
}
