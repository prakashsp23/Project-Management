"use client";
// import React from "react";
import SparklesMain from "../ui/sparkle-bg-div";
import React, { FC } from 'react';
export default function SparklesBg({ children }: any) {
    return (
        <div className="h-full p-16 relative w-full dark:bg-[#09090b] bg-[#ffffff] flex flex-col items-center justify-center overflow-hidden rounded-md">
            <SparklesMain />
            <div className="z-10">{children}</div>
        </div>
    );
}