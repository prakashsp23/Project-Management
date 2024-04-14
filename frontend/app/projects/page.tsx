"use client";
import * as React from "react";
import ProjectCardSection from "@/components/ui/Project-card-sec";
import MultipleCardsAnimated from "@/components/muli-animated";
import { SparklesPreview } from "@/components/sparkleheading";
import { motion } from "framer-motion";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "@/redux/slices/authSlice";
import { useGetAllProjectMutation } from "@/redux/slices/projectsApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import withAuth from "@/lib/PrivateRoute";

function MyComponent() {
  const { projects, userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [getAllProjects, { isLoading: isProjectsLoading }] =
    useGetAllProjectMutation();

  const getProjects = async () => {
    try {
      console.log("getting all the projects of the student");
      const res: any = await getAllProjects({
        ...userInfo?.userId,
      }).unwrap();
      dispatch(setProjects(res.projects));
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };
  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // useEffect(() => {
  //   console.log(projects);
  // }, [isProjectsLoading]);

  const InsideSparkle = () => {
    return <ProjectCardSection />;
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [20, -5, 0],
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      {/* <TracingBeam className="px-6" >
      <SparklesBg>
        <InsideSparkle />
      </SparklesBg>
      <SparklesPreview><h1 className="text-6xl font-bold text-center relative z-40 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2">Projects</h1></SparklesPreview>
      <MultipleCardsAnimated />
      </TracingBeam> */}
      {/* <SparklesBg>
        <InsideSparkle />
      </SparklesBg> */}
      <HeroHighlight>
        <ProjectCardSection />
        <div className="my-8">
          <SparklesPreview>
            <h1 className="text-6xl font-bold text-center relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2">
              Projects
            </h1>
          </SparklesPreview>
        </div>
        <MultipleCardsAnimated projects={isProjectsLoading ? [] : projects} />
      </HeroHighlight>

      {/* <BackgroundCellAnimation><MultipleCardsAnimated /></BackgroundCellAnimation> */}
    </motion.div>
  );
}

export default withAuth(MyComponent);
