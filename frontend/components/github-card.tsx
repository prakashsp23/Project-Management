"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

export function GithubCard() {
    return (
        <Card className="w-[30rem] ">
            <CardHeader>
                <CardTitle>GitHub Repository</CardTitle>
                <CardDescription>View the project's code on GitHub</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-start">
                <div className="space-y-2">
                    <h3 className="font-medium">Commits</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last updated 3 minutes ago</p>
                </div>
                <div className="space-y-2 text-right">
                    <h3 className="font-medium text-xl">423</h3>
                    <Link href=''><Button variant="outline">View Repository</Button></Link>
                    
                </div>
            </CardContent>
        </Card>
    )
}