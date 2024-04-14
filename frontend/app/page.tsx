"use client"
import { HeroAuth } from "@/components/heroauth";
import SparklesBg from "@/components/sparkle-component";
import { useSelector } from "react-redux";
// import { LampDemo } from "@/components/main-page"
export default function Home() {
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const InsideSparkle = () => {
    return <h1 className="text-5xl font-bold">MINI PROJECT</h1>;
  };

  return (
    <div className="h-[35rem] flex justify-center items-center">
      {userInfo ? (
        <SparklesBg >
          <InsideSparkle />
        </SparklesBg>
      ) : (
        <HeroAuth/>
      )}
    </div>
  );
}
