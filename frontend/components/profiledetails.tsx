"use client"
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { CardContent, CardHeader, Card } from "@/components/ui/card"
import Image from "next/image"
import { SheetDemo } from "./profileupdate"
import { ChangeEvent, useState } from "react"
import { useSelector } from "react-redux"
export default function ProfileDetails() {
    const { userInfo } = useSelector((state: any) => state.auth);
    const [imageSrc, setImageSrc] = useState<string>("https://github.com/shadcn.png");
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
    };
    console.log(userInfo);
    return (
        <div className="flex justify-center items-center m-6">
            <Card className="w-full max-w-3xl">
                <CardHeader className="flex flex-col gap-1">
                    <div>
                        <div className="space-y-4">
                            <div>
                                <CardContent className="grid gap-4">
                                    <div className="flex items-center flex-col justify-center gap-4">
                                        <Image
                                            height={120}
                                            width={120}
                                            src={imageSrc}
                                            alt="Profile Picture"
                                            className="object-cover !m-0 !p-0 object-top h-40 w-40 rounded-full border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                                        />
                                        <label className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                            Update Image
                                            <input
                                                className="hidden"
                                                type="file"
                                                accept="image/jpeg,image/png,image/jpg"
                                                id="profile-picture"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-4">
                                            <Label className="w-40" htmlFor="name">
                                                Name
                                            </Label>
                                            <div className="flex-1">{userInfo.profile.firstName} {userInfo.profile.lastName}</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Label className="w-40" htmlFor="username">
                                                Username
                                            </Label>
                                            <div className="flex-1">{userInfo.username}</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Label className="w-40" htmlFor="email">
                                                Email Address
                                            </Label>
                                            <div className="flex-1">{userInfo.email}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                            <div>
                                <CardContent className="grid gap-2">
                                    {/* <div className="flex items-center gap-4">
                                        <Label className="w-40" htmlFor="university">
                                            University
                                        </Label>
                                        <div className="flex-1">Harvard University</div>
                                    </div> */}
                                    <div className="flex items-center gap-4">
                                        <Label className="w-40" htmlFor="urn">
                                            University Roll Number
                                        </Label>
                                        <div className="flex-1">{userInfo.profile.URN}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Label className="w-40" htmlFor="batch">
                                            Batch
                                        </Label>
                                        <div className="flex-1">{userInfo.profile.batch}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Label className="w-40" htmlFor="semester">
                                            Semester
                                        </Label>
                                        <div className="flex-1">{userInfo.profile.sem}</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Label className="w-40" htmlFor="branch">
                                            Branch
                                        </Label>
                                        <div className="flex-1">{userInfo.profile.branch}</div>
                                    </div>
                                </CardContent>
                            </div>
                            <div className="flex justify-center">
                                <SheetDemo />
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

{/* <Loader loadingStates={loadingStates} loading={loading}  /> */ }