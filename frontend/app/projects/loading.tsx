import { Card } from "@/components/ui/card";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <HeroHighlight>
            <div className="mb-24 mt-4 flex flex-col justify-center items-center">
                <Skeleton className="h-12 w-80 rounded-md mb-6" />
                <Skeleton className="h-8 w-96 rounded-md mb-12" />
                <Skeleton className="h-[25.75rem] w-[18.5rem] rounded-md" />
            </div>
        </HeroHighlight>
    );
}