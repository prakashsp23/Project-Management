import React from 'react';
import { UserCard } from './member-teacher'; // Import the UserCard component from the correct path
import { userData } from "@/components/data";
interface UserCardProps {
    name: string;
    imageUrl: string;
    altText: string;
    heading: string;
}

const UserCardList: React.FC<{ userData: UserCardProps[] }> = ({ userData }) => {
    return (
        <div>
            {userData.map((user, index) => (
                <UserCard
                    key={index}
                    name={user.name}
                    imageUrl={user.imageUrl}
                    altText={user.altText}
                    // heading="Members:"
                />
            ))}
        </div>
    );
};

export default UserCardList;