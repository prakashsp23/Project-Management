'use client'
import TeamTop from "@/components/usedForProjectPage/teams-upper";
import TeamTab from "@/components/usedForProjectPage/team-tab";
import withAuth from "@/lib/PrivateRoute";
import { useSelector } from "react-redux";
function ProjectDetailWithId({ params }: any) {
    const { projects, userInfo } = useSelector((state: any) => state.auth);
    // const projectDetail = projects.find((p: any) => p.id === params.projectId);
    return (
        <div>
            <TeamTab projectParams={params} />
        </div>
    )
}
export default withAuth(ProjectDetailWithId);

