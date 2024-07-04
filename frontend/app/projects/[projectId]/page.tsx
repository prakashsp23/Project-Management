'use client'
import TeamTop from "@/components/teams-upper";
import TeamTab from "@/components/ui/team-tab";
import { useSelector } from "react-redux";

export default function ProjectDetailWithId({params}: any){
    const { projects, userInfo } = useSelector((state: any) => state.auth);
    const projectDetail = projects.find((p: any) => p.id === params.projectId);
    return(
        <div>
            {/* <h1>Project Detail Page with {projectDetail.title}</h1> */}
            <TeamTab projectDetails={projectDetail}/>
            {/* <TeamTop projectDetails={projectDetail}/> */}
        </div>
    )
}