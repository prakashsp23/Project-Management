'use client';
import React, { useRef } from 'react';
import SynopsisDisplay from '@/components/SynopsisDisplay';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';

export default function SynopsisPage() {
    const data = {
        students: [
            { crn: '3001113210123', urn: '4623', name: 'XYSSDA' },
            { crn: '3001113210131', urn: '3812', name: 'SDASDWDA' },
            { crn: '3001113210313', urn: '3923', name: 'JOHN DOE' },
        ],
        projectTitle: "SOLUTION FOR PRISONER'S DILEMMA",
        projectDescription: "The prisoner's dilemma is a game theory thought experiment that involves two rational agents, each of whom can cooperate for mutual benefit or betray their partner for individual reward. Through this project, we aim to find the optimal solution for the two agents.",
        typeOfProject: 'Research',
        softwareRequirement: 'Python, Nextjs/Reactjs, Shadcn, q-learning algorithm',
        hardwareRequirement: '',
    };

    const synopsisRef = useRef(null);

    const handleGeneratePdf = async () => {
        const inputData = synopsisRef.current;
        try {
            const canvas = await html2canvas(inputData, { scale: 2, backgroundColor: '#ffffff' });
            const imgData = canvas.toDataURL("image/jpeg", 0.8);
            const pdf = new jsPDF({
                orientation: 'landscape',
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
    }

    return (
        <div className=' p-24'>
            <div className="container bg-white mx-auto" ref={synopsisRef} style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                <SynopsisDisplay data={data} />
            </div>
            <div className='flex justify-center p-8'>
                <Button onClick={handleGeneratePdf}>
                    Download Synopsis
                </Button>
            </div>
        </div>
    );
}
