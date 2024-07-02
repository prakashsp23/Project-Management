import { useState, useEffect, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useStudentLoginMutation,useTeacherLoginMutation } from "@/redux/slices/studentApiSlice";
import { setCredentials, setProjects } from "@/redux/slices/authSlice";
import { useGetAllProjectMutation } from "@/redux/slices/projectsApiSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/newinput";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export default function Signin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [loginStudent, { isLoading: isLoadingStudent }] = useStudentLoginMutation();
  const [loginTeacher, { isLoading: isLoadingTeacher }] = useTeacherLoginMutation();
  const [getAllProjects, { isLoading: isProjectsLoading }] = useGetAllProjectMutation();
  const pathname = usePathname();
  const isTeacherRoute = pathname === '/teacher';
  const isStudentRoute = pathname === '/student';
  const handleSignIn = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      console.log(username, password);
      if(isStudentRoute) {
        const res = await loginStudent({ username, password, userType: "student" }).unwrap();
        //  const ress: any = await getAllProjects({
         //   ...userInfo?.userId,
        // }).unwrap();
      // dispatch(setProjects(ress.projects));
      dispatch(setCredentials({ ...res.student, userType: "student" }));
      console.log("STUDENT LOGGED IN");
      }else if(isTeacherRoute){
        const res = await loginTeacher({ username, password, userType: "teacher" }).unwrap();
      // const ress: any = await getAllProjects().unwrap();
      // dispatch(setProjects(ress.projects));
      dispatch(setCredentials({ ...res.teacher, userType: "teacher" })); 
      console.log("TEACHER LOGGED IN");
      }
      
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);
  return (
    <Card>
      <CardHeader className="space-y-1 items-center">
        <CardTitle className="text-2xl">Sign in into your account</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="abc@example.com"
            value={username}
            onChange={(e: any) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSignIn}>
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}