// // "use client"
// import Navbar from "@/components/Navbar";
// import { DynamicCloud, IconCloud } from "@/components/dynamic-cloud";
// import { NavbarDemo } from "@/components/floating-nav";
// import { CardsMetric } from "@/components/git-line";

// import ProfileDetails from "@/components/profiledetails";
// import { BackgroundCellAnimation } from "@/components/ripple-grid-bg";
// // import SVGs from "@/components/svg";
// import { PulseBeamsSecond } from "@/components/textingex";
// import { Card } from "@/components/ui/card";
// // import { PulseBeams, PulseBeamsSecond } from "@/components/textingex";
// const slugs = [ "typescript",
// "javascript",
// "dart",
// "java",
// "react",
// "flutter",
// "android",
// "html5",
// "css3",
// "nodedotjs",
// "express",
// "nextdotjs",
// "prisma",
// "amazonaws",
// "postgresql",
// "firebase",
// "nginx",
// "vercel",
// "testinglibrary",
// "jest",
// "cypress",
// "docker",
// "git",
// "jira",
// "github",
// "gitlab",
// "visualstudiocode",
// "androidstudio",
// "sonarqube",
// "figma"]
// export default function Testing() {
//     return (
//         <div>
//             <Navbar/>
//             <Card className="w-40 h-40"></Card>
//             {/* <BackgroundCellAnimation /> */}
//             {/* <h1>Testing</h1> */}
//             {/* <PulseBeams/> */}
//             {/* <PulseBeamsSecond/>
//              */}
//             {/* <CardsMetric/> */}
//             {/* <CardsMetric/> */}
//             {/* <ProfileDetails/> */}
//             {/* h11 */}
//             <IconCloud iconSlugs={slugs}/>
//             {/* <SVGs/> */}
//             {/* <TestingComp></TestingComp> */}
//         </div>
//     )
// };
import { ConfettiButton } from "@/components/ConfettiButton";
import Navbar from "@/components/Navbar";
import IconCloud from "@/components/dynamic-cloud";
const slugs = ["typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma"]
export default function IconCloudDemo() {
    return (
        <>
        {/* <main className="lg:flex block items-center justify-between w-full m-auto 2xl:w-[1400px] h-max lg:h-[560px] md:mb-0 pb-24 lg:pb-12 px-3 xl:px-32 md:px-[50px] 2xl:px-20 mt-16 lg:mt-0">
            <div className='relative md:-left-5 md:flex justify-center items-center mb-10 md:mb-0'>
                <div className='absolute z-[100]'>
                    <IconCloud iconSlugs={slugs}  />
                </div>

                <div className='lg :bg-[#E78F9A] bg-[#e78f9971] dark:bg-[#0F334F] z-[10] relative md:-top-[50px] md:w-96 w-80 h-80 blur-[80px] rounded-md' />
                <div className='lg :bg-[#85A6F4] bg-[#85a6f482] dark:bg-[#0F334F] z-[10] absolute -left-[200px] md:bottom-[-150px] w-96 h-80 blur-[80px] rounded-md' />
            </div>

        </main > */}
            {/* <Navbar /> */}
            {/* <div className="flex justify-center items-center">
                <div className="relative flex h-full w-full max-w-[40rem] max-h-[40rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8 ">
            <IconCloud iconSlugs=/>
            </div>
            </div> */}
            {/* <div className='absolute z-[100]'>
                    <IconCloud iconSlugs={slugs} />
                </div> */}
            {/* <IconCloud iconSlugs={slugs} /> */}
            <div className="flex  justify-center h-[40rem]">
            <ConfettiButton/>
            </div>
        </>
    )
};
