"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import DemoSignin from "./ui/signin1"
import DemoSignup from "./ui/signup1"

export function AuthTab() {
    return (
        <Tabs defaultValue="signin" className="w-[350px] ">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">SignIn</TabsTrigger>
                <TabsTrigger value="signup">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <DemoSignin/>
            </TabsContent>
            <TabsContent value="signup">
                <DemoSignup/>
            </TabsContent>
        </Tabs>
    )
}
