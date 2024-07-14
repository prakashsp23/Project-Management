import React from "react";
import Image from "next/image";

interface Student {
  profile: any;
}

interface SynopsisDisplayProps {
  data: {
    students: Student[];
    projectTitle: string;
    projectDescription: string;
    typeOfProject: string;
    softwareRequirement: string;
    hardwareRequirement: string;
  };
}

function SynopsisDisplay({ data }: SynopsisDisplayProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="py-8 px-8 font-sans w-[70rem]">
        <div className="text-center mb-8">
          <Image
            src="/bit7.png"
            alt="Logo"
            className="mx-auto mb-4"
            width={1000}
            height={1000}
          />
          <h2 className="text-2xl font-bold">
            Department of Computer Science & Engineering (Artificial
            Intelligence)
          </h2>
          <h3 className="text-xl">
            B.Tech 6th Semester Minor Project-II Synopsis
          </h3>
          <h4 className="text-lg">(Jan-June 2024)</h4>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Sn</th>
              <th className="border  border-black px-4 py-2">URN</th>
              <th className="border border-black px-4 py-2">CRN</th>
              <th className="border border-black px-4 py-2">Name</th>
              <th className="border border-black px-4 py-2">Signature</th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((student, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{index + 1}</td>
                <td className="border border-black px-4 py-2">
                  {student.profile.URN}
                </td>
                <td className="border border-black px-4 py-2">
                  {student.profile.CRN}
                </td>
                <td className="border border-black px-4 py-2">
                  {student.profile.firstName + " " + student.profile.lastName}
                </td>
                <td className="border border-black px-4 py-2 text-center">
                  ______________
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-8 flex flex-col gap-2">
          <p>
            <strong>Project Title:</strong> {data.projectTitle}
          </p>
          <p>
            <strong>Project Description:</strong> {data.projectDescription}
          </p>
          <p>
            <strong>Type of Project:</strong> {data.typeOfProject}
          </p>
          <p>
            <strong>Software Requirement:</strong> {data.softwareRequirement}
          </p>
          <p>
            <strong>Hardware Requirement:</strong> {data.hardwareRequirement}
          </p>
        </div>
        <div className="border h-20 border-black text-left px-2">
          <p>
            <strong>For Departmental/Official Use</strong>
          </p>
        </div>
        <div className="mt-8 flex justify-between">
          <div className="w-1/2 text-center border-black border">
            <div className="flex flex-col h-full">
              <div className="flex-grow h-24"></div>
              <div className="border-black border-t p-2">
                <p>Mr. Sunil Naik</p>
                <p>Project Coordinator</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 text-center border-black border">
            <div className="flex flex-col h-full">
              <div className="flex-grow h-24"></div>
              <div className="border-black border-t p-2">
                <p>Mrs. Gargi Mishra</p>
                <p>Project Coordinator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SynopsisDisplay;
