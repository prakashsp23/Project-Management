"use client";
// import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import ProjectCardSection from "./ui/Project-card-sec";
import SparklesMain from "./ui/sparkle-bg-div";
import React, { FC } from 'react';
export default function SparklesBg({ children }: any) {
    return (
        <div className="h-[40rem] relative w-full dark:bg-[#09090b] bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded-md">
            <SparklesMain />
            <div className="z-10">{children}</div>
        </div>
    );
}