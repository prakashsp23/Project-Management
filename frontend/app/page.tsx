"use client"
import { HeroAuth } from "@/components/heroauth";
import SparklesBg from "@/components/sparkle-component";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";
import { toast } from "sonner"

// import { LampDemo } from "@/components/main-page"
export default function Home() {
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  const { userType } = useSelector((state:any) => state.auth);
  
  const InsideSparkle = () => {
    return <h1 className="text-5xl font-bold">MINI PROJECT</h1>;
  };
  // const { toast } = useToast()
  return (
    <div className="h-[35rem] flex justify-center items-center">
      {userInfo ?  (
        userType === "student" ? <SparklesBg >
        <InsideSparkle />
        student
        <Button
      onClick={() => {
        toast("Event has been created",{
          description: "Friday, july 2, 2024 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
      </SparklesBg> : <SparklesBg >
          <InsideSparkle />
          teacher
        </SparklesBg>
      ) : (
        <HeroAuth/>
      )}
    </div>
  );
}
