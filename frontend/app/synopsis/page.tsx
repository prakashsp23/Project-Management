'use client'
// import ProfileForm from "@/components/synopsis";
import { useSelector } from "react-redux";
import ProfileForm from "@/components/usedForProjectPage/synopsis";
export default function Synopsis(){
    const { userInfo } = useSelector((state: any) => state.auth);
    return (
        <div>
            <ProfileForm/>
        </div>
    )
}