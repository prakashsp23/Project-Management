"use client";
import React, { useRef } from "react";
import SynopsisDisplay from "@/components/SynopsisDisplay";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import withAuth from "@/lib/PrivateRoute";

function SynopsisPage({ params }: any) {
  const { projects, userInfo } = useSelector((state: any) => state.auth);
  const projectDetail = projects.find((p: any) => p.id === params.projectId);
  console.log(projectDetail);
  // console.log(projectDetail?.technologiesUsed.map((tech: any, index: number) => tech).join(', '));
  const data = {
    students: [
      { crn: `${projectDetail.teamLeaderId}`, urn: "4623", name: "XYSSDA" },
      { crn: "3001113210131", urn: "3812", name: "SDASDWDA" },
      { crn: "3001113210313", urn: "3923", name: "JOHN DOE" },
    ],
    projectTitle: `${projectDetail.title}`,
    projectDescription: `${projectDetail.description}`,
    typeOfProject: `${projectDetail.projectType}`,
    softwareRequirement: `${projectDetail?.technologiesUsed
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

  return (
    <div className=" p-24">
      <div
        className="container bg-white mx-auto"
        ref={synopsisRef}
        style={{ backgroundColor: "#ffffff", color: "#000000" }}
      >
        <SynopsisDisplay data={data} />
      </div>
      <div className="flex justify-center p-8">
        <Button onClick={handleGeneratePdf}>Download Synopsis</Button>
      </div>
    </div>
  );
}
export default withAuth(SynopsisPage);
