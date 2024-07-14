"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Signin from "./signin1"
import Signup from "./signup1"


export function AuthTab() {
    return (
        <Tabs defaultValue="signin" className="w-[350px] ">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">SignIn</TabsTrigger>
                <TabsTrigger value="signup">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <Signin />
            </TabsContent>
            <TabsContent value="signup">
                <Signup />
            </TabsContent>
        </Tabs>
    )
}
