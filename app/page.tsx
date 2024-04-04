import SparklesBg from "@/components/sparkle-component";
// import { LampDemo } from "@/components/main-page"
export default function Home() {
  const InsideSparkle = () => {
    return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Mini-Project</h1>;
  };
  return (
    <div>
      <SparklesBg >
        <InsideSparkle />
      </SparklesBg>
    </div>
  )
}
