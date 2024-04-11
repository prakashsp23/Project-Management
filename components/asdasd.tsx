/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oLf23P4XPPv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {
    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <div className="grid grid-cols-3 gap-8">
                <div>
                    <h1 className="text-3xl font-bold">Project Title!</h1>
                    <p className="text-gray-400">Project Description</p>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Members</h2>
                        <p className="text-gray-400">Team working on the project</p>
                        <div className="mt-4 space-y-4">
                            <Avatar>
                                <AvatarImage alt="John Doe" src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <p>John Doe</p>
                            <p className="text-gray-400">Role</p>
                            <Avatar>
                                <AvatarImage alt="Robert Johnson" src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback>RJ</AvatarFallback>
                            </Avatar>
                            <p>Robert Johnson</p>
                            <p className="text-gray-400">Role</p>
                            <Avatar>
                                <AvatarImage alt="Jane Smith" src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <p>Jane Smith</p>
                            <p className="text-gray-400">Role</p>
                            <Avatar>
                                <AvatarImage alt="Emily Davis" src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback>ED</AvatarFallback>
                            </Avatar>
                            <p>Emily Davis</p>
                            <p className="text-gray-400">Role</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Teachers/Mentors</h2>
                        <p className="text-gray-400">Instructors guiding the project</p>
                        <div className="mt-4 space-y-4" />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-lg font-semibold">GitHub Repository</h2>
                            <p className="text-gray-400 mt-2">View the project's code on GitHub</p>
                            <div className="flex items-center justify-between mt-6">
                                <h3 className="text-3xl font-bold">423</h3>
                                <Button variant="outline">View Repository</Button>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-lg font-semibold">Commits</h2>
                            <p className="text-gray-400 mt-2">Last updated 3 minutes ago</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg mt-8">
                        <h2 className="text-lg font-semibold">Git Commits</h2>
                        <p className="text-gray-400 mt-2">Visualizing git commits with tooltips.</p>
                        <ScrollArea className="mt-4 h-24" />
                    </div>
                </div>
                <div className="fixed top-8 right-8">
                    <Card className="w-[300px]">
                        <CardHeader>
                            <CardTitle>Tech Stack</CardTitle>
                            <CardDescription>Technologies used in this project</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-4">
                                <li>React</li>
                                <li>Tailwind CSS</li>
                                <li>Node.js</li>
                                <li>PostgreSQL</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}