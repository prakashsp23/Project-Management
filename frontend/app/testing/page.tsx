// 'use client'
// import { promises as fs } from "fs"
// import path from "path"
// import { Metadata } from "next"
// import Image from "next/image"
// import { z } from "zod"

// import { columns } from "@/components/ui/progress table/component/columns"
// import { DataTable } from "@/components/ui/progress table/component/data-table"
// import { UserNav } from "@/components/ui/progress table/component/user-nav"
// import { taskSchema } from "@/components/ui/progress table/data/schema"
// import { useSelector } from "react-redux"

// // export const metadata: Metadata = {
// //   title: "Tasks",
// //   description: "A task and issue tracker build using Tanstack Table.",
// // }

// // Simulate a database read for tasks.
// // async function getTasks() {
// //   const data = await fs.readFile(
// //     path.join(process.cwd(), "components/ui/progress table/data/tasks.json")
// //   )

// //   const tasks = JSON.parse(data.toString())

// //   return z.array(taskSchema).parse(tasks)
// // }

// export default function TaskPage() {
//     //   const tasks = await getTasks()
//     const { projects, userInfo, userType } = useSelector((state: any) => state.auth);
//     console.log(projects);
//     // const tasks=[{
//     //     // id:`${projects.id}`,
//     //     id:'2',
//     //     title:`${projects.title}`,
//     //     status:`${projects.status}`,
//     //     label:"bug",
//     //     priority:'high'

//     // }]
//     const tasks = projects.map((project, index) => ({
//         id: index + 1,
//         title: project.title,
//         status: project.status,
//         label: "bug", // You may want to adjust this dynamically based on project properties
//         priority: "high",
//         teamMembers: project.teamMembers.map(member => member.name).join(", ") // Similarly adjust this based on project properties
//     }));
//     return (
//         <>
//             {/* <div className="md:hidden">
//         <Image
//           src="/examples/tasks-light.png"
//           width={1280}
//           height={998}
//           alt="Playground"
//           className="block dark:hidden"
//         />
//         <Image
//           src="/examples/tasks-dark.png"
//           width={1280}
//           height={998}
//           alt="Playground"
//           className="hidden dark:block"
//         />
//       </div> */}
//             <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
//                 <div className="flex items-center justify-between space-y-2">
//                     <div>
//                         <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
//                         <p className="text-muted-foreground">
//                             Here&apos;s a list of Projects!
//                         </p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <UserNav />
//                     </div>
//                 </div>
//                 <DataTable data={tasks} columns={columns} />
//             </div>
//         </>
//     )
// }
'use client'
import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { columns } from "@/components/ui/progress table/component/columns"
import { DataTable } from "@/components/ui/progress table/component/data-table"
import { UserNav } from "@/components/ui/progress table/component/user-nav"
import { taskSchema } from "@/components/ui/progress table/data/schema"
import { useSelector } from "react-redux"

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// }

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "components/ui/progress table/data/tasks.json")
//   )

//   const tasks = JSON.parse(data.toString())

//   return z.array(taskSchema).parse(tasks)
// }

export default function TaskPage() {
    //   const tasks = await getTasks()
    const { projects, userInfo, userType } = useSelector((state: any) => state.auth);
    console.log(projects);

    // const tasks = projects.map((project, index) => ({
    //     id: index + 1,
    //     title: project.title,
    //     status: project.status,
    //     label: "bug", // Adjust dynamically if needed
    //     priority: "high", // Adjust dynamically if needed
    //     teamMembers: project.teamMembers.map(member => member.username).join(", ") // Assuming teamMembers is an array of objects with a 'name' field
    // }));
    const tasks = Array.isArray(projects) ? projects.map((project, index) => ({
        id: index + 1,
        title: project.title,
        status: project.status,
        label: "bug", // Adjust dynamically if needed
        priority: "high", // Adjust dynamically if needed
        teamMembers: Array.isArray(project.teamMembers) ? project.teamMembers.map(member => member.username).join(", ") : "" // Check if teamMembers is an array// Assuming teamMembers is an array of objects with a 'username' field
    })) : [];

    return (
        <>
            {/* <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div> */}
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of Projects!
                        </p>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                        <UserNav />
                    </div> */}
                </div>
                <DataTable data={tasks} columns={columns} />
            </div>
        </>
    )
}
