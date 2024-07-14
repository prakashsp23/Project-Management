"use client";
import React, { useEffect, useRef } from "react";
import SynopsisDisplay from "@/components/SynopsisDisplay";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "@/lib/PrivateRoute";
import { useRouter } from "next/navigation";
import { useGetProjectByIdMutation } from "@/redux/slices/projectsApiSlice";
import { setCurrentProject } from "@/redux/slices/authSlice";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import SynopsisStatusChange from "@/app/testing2/page";
const loadingStates = [
  {
    text: "Fetching Synopsis Details",
  },
  {
    text: "Generating Synopsis",
  },
  {
    text: "Getting things ready",
  }
];
function SynopsisPage({ params }: any) {
  const { userInfo, projects ,currentProject } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [getProjectById, { isLoading: isGettingProject }] = useGetProjectByIdMutation();
  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const currProjectRes: any = await getProjectById({ id: params.projectId }).unwrap();
        console.log("Project details:", currProjectRes);
        dispatch(setCurrentProject(currProjectRes.project));
      } catch (error: any) {
        console.error("Error fetching project by ID:", error?.data?.message || error.error);
      }
    };

    fetchProjectById();
  }, []); 
  const data = {
    students: [
      { crn: `${currentProject.teamLeaderId}`, urn: "4623", name: "XYSSDA" },
      { crn: "3001113210131", urn: "3812", name: "SDASDWDA" },
      { crn: "3001113210313", urn: "3923", name: "JOHN DOE" },
    ],
    projectTitle: `${currentProject.title}`,
    projectDescription: `${currentProject.description}`,
    typeOfProject: `${currentProject.projectType}`,
    softwareRequirement: `${currentProject?.technologiesUsed
      .map((tech: any, index: number) => tech)
      .join(", ")}`,
    hardwareRequirement: "",
  };

  const synopsisRef = useRef(null);

  const handleGeneratePdf = async () => {
    const inputData: any = synopsisRef.current;
    try {
      const canvas = await html2canvas(inputData, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("synopsis.pdf");
    } catch (e) {
      console.log(e);
    }
  };
  if(isGettingProject){
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <MultiStepLoader loadingStates={loadingStates} loading={isGettingProject} duration={1000} />
      </div>
    )
  }
  return (
    <div className="  ">
      <div
        className="container bg-white mx-auto w-[80rem] border-2"
        ref={synopsisRef}
        style={{ backgroundColor: "#ffffff", color: "#000000" }}
      >
        <SynopsisDisplay data={data} />
      </div>
      <div className="flex justify-center p-8">
        <Button onClick={handleGeneratePdf}>Download Synopsis</Button>
        {/* <SynopsisStatusChange/> */}
      </div>
    </div>
  );
}
export default withAuth(SynopsisPage);
