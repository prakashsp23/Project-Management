"use client"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { TimelineLayout } from "./timeline-layout";
import OpenModal from "./openmodal";
import { Button } from "./ui/button";

// const data = [
//     {
//         id: 1,
//         message: "Initial commit",
//         owner: "Alice",
//     },
//     {
//         id: 1,
//         message: "Add feature A",
//         owner: "Bob",
//     },
//     {
//         id: 1,
//         message: "Fix issue #123",
//         owner: "Charlie",
//     },
//     {
//         id: 1,
//         message: "Refactor code",
//         owner: "David",
//     },
//     {
//         id: 1,
//         message: "Update dependencies",
//         owner: "Eve",
//     },
 
// ];

export const timelineData = [
	{
		id: 1,
		title: "First event",
		date: "2022-01-01",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate odio ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris.",
	},
	{
		id: 2,
		title: "Second event",
		date: "2022-02-01",
		description:
			"Aut eius excepturi ex recusandae eius est minima molestiae. Nam dolores iusto ad fugit reprehenderit hic dolorem quisquam et quia omnis non suscipit nihil sit libero distinctio. Ad dolorem tempora sit nostrum voluptatem qui tempora unde? Sit rerum magnam nam ipsam nesciunt aut rerum necessitatibus est quia esse non magni quae.",
	},
	{
		id: 3,
		title: "Third event",
		date: "2022-03-01",
		description:
			"Sit culpa quas ex nulla animi qui deleniti minus rem placeat mollitia. Et enim doloremque et quia sequi ea dolores voluptatem ea rerum vitae. Aut itaque incidunt est aperiam vero sit explicabo fuga id optio quis et molestiae nulla ex quae quam. Ab eius dolores ab tempora dolorum eos beatae soluta At ullam placeat est incidunt cumque.",
	},
];

export type TimelineData = (typeof timelineData)[number];

export interface TimelineElement {
	id: number;
	title: string;
	date: string;
	description: string;
}


export function CardsMetric({projectId}) {
    const { theme: mode } = useTheme();
// console.log(params);
    const strokeColor = mode === "dark" ? "#FFFFFF" : "#000000";
    const dotFillColor = mode === "dark" ? "#09090b" : "#FFFFFF";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Git Commits</CardTitle>
                <CardDescription>
                    Visualizing git commits with tooltips.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <Link href={`/projects/${projectId}/timeline`}>
                <Button>
                    View Timeline
                </Button>
                </Link>
                {/* <div className='w-fit'>
				<TimelineLayout items={timelineData} />
			</div> */}
                {/* <OpenModal items={timelineData} /> */}
            </CardContent>
        </Card>
    );
}
{/* <div className='w-fit'>
				<TimelineLayout items={timelineData} />
			</div> */}