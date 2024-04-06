"use client"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    {
        id: 1,
        message: "Initial commit",
        owner: "Alice",
    },
    {
        id: 1,
        message: "Add feature A",
        owner: "Bob",
    },
    {
        id: 1,
        message: "Fix issue #123",
        owner: "Charlie",
    },
    {
        id: 1,
        message: "Refactor code",
        owner: "David",
    },
    {
        id: 1,
        message: "Update dependencies",
        owner: "Eve",
    },
];

export function CardsMetric() {
    const { theme: mode } = useTheme();

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
                <div className="h-24 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 30,
                                right: 10,
                                left: 10,
                                bottom: 0,
                            }}
                        >
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const commit = data.find(item => item.owner === payload[0].payload.owner);
                                        if (commit) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div>
                                                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                                                            {commit.owner}
                                                        </div>
                                                        <div className="font-bold text-muted-foreground">
                                                            {commit.message}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                    return null;
                                }}
                            />
                            <Line
                                type="monotone"
                                strokeWidth={2}
                                dataKey="id"
                                stroke={strokeColor}
                                dot={{r:5,fill: dotFillColor }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}