import React from 'react';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
interface UserCardProps {
    name: string;
    imageUrl: string;
    altText: string;
    // heading: string;
};

export function UserCard({ name, imageUrl, altText}:UserCardProps) {
    return (
        <>
            <div className='m-1'>
                <div
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "lg" }),
                        "shrink ",
                        "justify-start   gap-4"
                    )}
                >
                    <Image
                        height={100}
                        width={100}
                        src={imageUrl}
                        alt={altText}
                        className="object-cover !m-0 !p-0 object-top rounded-full h-9 w-9 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                    />
                    <div className="flex flex-col max-w-28">
                        <span>{name}</span>
                        {/* Additional user information can be added here */}
                    </div>
                </div>
            </div>
        </>
    );
};

// export default UserCard;