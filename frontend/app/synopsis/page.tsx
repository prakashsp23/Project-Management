'use client'
import ProfileForm from "@/components/synopsis";
import { useSelector } from "react-redux";

export default function Synopsis(){
    const { userInfo } = useSelector((state: any) => state.auth);
    return (
        <div>
            <ProfileForm/>
        </div>
    )
}