"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BackgroundBeams } from "@/components/ui/background-beams";
import ProjectHeading from "@/components/ui/project-heading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCardSection from "@/components/ui/Project-card-sec";
import NewProjectCard from "@/components/ui/add-new-project-sec";
import Sparkles1 from "@/components/sparkle-component";
import SparklesBg from "@/components/sparkle-component";
export default function MyComponent() {
  const InsideSparkle = () => {
    return <ProjectCardSection />;
  };
  return (
    <div>
      <SparklesBg>
        <InsideSparkle />
      </SparklesBg>
    </div>
    // <div>
    //   <SparklesPreview />
    // </div>

  );
}