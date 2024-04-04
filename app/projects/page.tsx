"use client";
import * as React from "react";
import { Separator } from "@/components/ui/separator"
import ProjectCardSection from "@/components/ui/Project-card-sec";
import SparklesBg from "@/components/sparkle-component";
import OdlProject from "@/components/old-project";
import MultipleCardsAnimated from "@/components/muli-animated";
import { BackgroundCellAnimation } from "@/components/ripple-grid-bg";
import { GridBackground } from "@/components/ui/grid-bg";
import { SparklesPreview } from "@/components/sparkleheading";
import { TracingBeam } from "@/components/ui/tracing-beam";
export default function MyComponent() {
  const InsideSparkle = () => {
    return <ProjectCardSection />;
  };
  return (
    <div>
      {/* <TracingBeam className="px-6" >
      <SparklesBg>
        <InsideSparkle />
      </SparklesBg>
      <SparklesPreview><h1 className="text-6xl font-bold text-center relative z-40 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2">Projects</h1></SparklesPreview>
      <MultipleCardsAnimated />
      </TracingBeam> */}
      <SparklesBg>
        <InsideSparkle />
      </SparklesBg>
      <SparklesPreview><h1 className="text-6xl font-bold text-center relative z-40 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2">Projects</h1></SparklesPreview>
      <MultipleCardsAnimated />
      {/* <BackgroundCellAnimation><MultipleCardsAnimated /></BackgroundCellAnimation> */}
    </div>
  );
}
{/* <TracingBeam className="px-6">
      
    </TracingBeam> */}