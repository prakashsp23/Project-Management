"use client"
import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import { Highlight } from "../ui/hero-highlight";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

export function HeroAuth() {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: [20, -5, 0],
            }}
            transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
            <h1>
                LogIn or SingnUp{" "}
                <Highlight className="text-black dark:text-white">
                    As a Student or Teacher
                </Highlight>
            </h1>
            <div className="flex justify-center space-x-4 mt-4">
                <Button variant="neubutton" size="lg" className="rounded-none bg-[#6964f1]" asChild>
                    <Link href="/student">Student</Link>
                </Button>
                <Button variant="neubutton" size="lg" className="rounded-none bg-[#a456f7] " asChild>
                    <Link href="/teacher">Teacher</Link>
                </Button>
            </div>
        </motion.div>
    );
}
