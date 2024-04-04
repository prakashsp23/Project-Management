import React from "react";
import { useTheme } from "next-themes";
import { SparklesCore } from "./ui/sparkles";

export function SparklesPreview({ children }: any) {
    const { theme } = useTheme();

    return (
        <div className="h-auto w-full flex flex-col items-center justify-center overflow-hidden rounded-md bg-white dark:bg-[#09090b]">
            {/* <h1 className={`md:text-4xl text-3xl lg:text-9xl font-bold text-center text-${theme === 'dark' ? 'white' : 'black'} relative z-20`}>
                {children}
            </h1> */}
            {children}
            <div className="w-[40rem] h-20 relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor={theme === 'dark' ? '#FFFFFF' : '#000000'}
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full dark:bg-[#09090b] dark:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white) bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,black)]"></div>
            </div>
        </div>
    );
}