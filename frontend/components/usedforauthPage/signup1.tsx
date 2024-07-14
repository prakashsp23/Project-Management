"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { Label } from "../ui/newlabel";
import { Input } from "../ui/newinput";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {  useStudentRegisterMutation, useTeacherRegisterMutation } from "@/redux/slices/studentApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "@/redux/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
// import { Select } from "../ui/select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function Signup() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state: any) => state.auth);
    const [registerStudent, { isLoading: isLoadingStudent }] = useStudentRegisterMutation();
    const [registerTeacher, { isLoading: isLoadingTeacher }] = useTeacherRegisterMutation();
    const pathname = usePathname();
    const isTeacherRoute = pathname === '/teacher';
    const isStudentRoute = pathname === '/student';
    const handleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            console.log(email, firstName, lastName,role, username, password);
            if (isStudentRoute) {
                const res = await registerStudent({ email, firstName, lastName, username, password,userType: "student" }).unwrap();
                //  const ress: any = await getAllProjects({
                //   ...userInfo?.userId,
                // }).unwrap();
                // dispatch(setProjects(ress.projects));
                dispatch(setCredentials({ ...res.student, userType: "student" }));
                console.log("STUDENT REGISTERED");
                router.push("/");
            } else if (isTeacherRoute) {
                const res = await registerTeacher({ email, firstName, lastName, role, username, password, userType: "teacher" }).unwrap();
                dispatch(setCredentials({ ...res.teacher, userType: "teacher" }));
                console.log("TEACHER REGISTERED");
                router.push("/");
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
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">

            <h2 className="font-bold text-xl ">
                Create an account
            </h2>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input id="firstname" placeholder="Abc" type="text" value={firstName} onChange={(e: any) => {
                        setFirstName(e.target.value);
                    }} />
                </LabelInputContainer>
                <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input id="lastname" placeholder="Abc" type="text" value={lastName} onChange={(e: any) => {
                        setLastName(e.target.value);
                    }} />
                </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    type="text"
                    placeholder="abc"
                    value={username}
                    onChange={(e: any) => {
                        setUsername(e.target.value);
                    }}
                />
            </LabelInputContainer>
            {isTeacherRoute && (
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={(value: string) => setRole(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your role as a teacher" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="REGULAR">Regular</SelectItem>
                            <SelectItem value="SUPER_ADMIN">SuperAdmin</SelectItem>
                        </SelectContent>
                    </Select>
                </LabelInputContainer>
            )}
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} onChange={(e: any) => {
                    setEmail(e.target.value);
                }} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e: any) => {
                    setPassword(e.target.value);
                }} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="confirmPassword" placeholder="••••••••" type="password" value={confirmPassword} onChange={(e: any) => {
                    setConfirmPassword(e.target.value);
                }} />
            </LabelInputContainer>
            <button
                className="dark:bg-gradient-to-br bg-muted relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full dark:text-white text-black rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                onClick={handleRegister}
            >
                Sign up &rarr;
                <BottomGradient />
            </button>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
