"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/slices/studentApiSlice";
import { setCredentials, setProjects } from "@/redux/slices/authSlice";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/newinput";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useGetAllProjectMutation } from "@/redux/slices/projectsApiSlice";
export default function Signin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [getAllProjects, { isLoading: isProjectsLoading }] =
    useGetAllProjectMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  const handleSignIn = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      console.log(username, password);
      const res = await login({ username, password }).unwrap();
      const ress: any = await getAllProjects({
        ...userInfo?.userId,
      }).unwrap();
      dispatch(setProjects(ress.projects));
      dispatch(setCredentials({ ...res.student }));
      console.log("LOGGED IN");
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
