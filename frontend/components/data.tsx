
export const userData = [
    {
        id: 1,
        name: "John Doe",
        designation: "Software Engineer",
        image:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
        id: 2,
        name: "Robert Johnson",
        designation: "Product Manager",
        image:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
        id: 3,
        name: "Jane Smith",
        designation: "Data Scientist",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
        id: 4,
        name: "Emily Davis",
        designation: "UX Designer",
        image:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    // {
    //     id: 5,
    //     name: "Emily Davis",
    //     designation: "UX Designer",
    //     image:
    //         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    // },
    
    // {
    //     id: 1,
    //     avatar: '/User1.png',
    //     messages: [
    //         {
    //             id: 1,
    //             avatar: '/User1.png',
    //             name: 'Jane Doe',
    //             message: 'Hey, Jakob',
    //         },
    //         {
    //             id: 2,
    //             avatar: '/LoggedInUser.jpg',
    //             name: 'Jakob Hoeg',
    //             message: 'Hey!',
    //         },
    //         {
    //             id : 3,
    //             avatar: '/User1.png',
    //             name: 'Jane Doe',
    //             message: 'How are you?',
    //         },
    //         {
    //             id: 4,
    //             avatar: '/LoggedInUser.jpg',
    //             name: 'Jakob Hoeg',
    //             message: 'I am good, you?',
    //         },
    //         {
    //             id: 5,
    //             avatar: '/User1.png',
    //             name: 'Jane Doe',
    //             message: 'I am good too!',
    //         },
    //         {
    //             id: 6,
    //             avatar: '/LoggedInUser.jpg',
    //             name: 'Jakob Hoeg',
    //             message: 'That is good to hear!'
    //         },
    //         {
    //             id: 7,
    //             avatar: '/User1.png',
    //             name: 'Jane Doe',
    //             message: 'How has your day been so far?',
    //         },
    //         {
    //             id: 8,
    //             avatar: '/LoggedInUser.jpg',
    //             name: 'Jakob Hoeg',
    //             message: 'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
    //         },
    //         {
    //             id: 9,
    //             avatar: '/User1.png',
    //             name: 'Jane Doe',
    //             message: 'I had a relaxing day. Just catching up on some reading.',
    //         }
    //     ],
    //     name: 'Jane Doe',
    // },
    // {
    //     id: 2,
    //     avatar: '/User2.png',
    //     name: 'John Doe',
    // },
    // {
    //     id: 3,
    //     avatar: '/User3.png',
    //     name: 'Elizabeth Smith',
    // },
    // {
    //     id: 4,
    //     avatar: '/User4.png',
    //     name: 'John Smith',
    // }
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
    id: 5,
    image:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    name: 'Jakobi Hoeg',
};

export type LoggedInUserData = (typeof loggedInUserData);

export interface Message {
    id: number;
    image: string;
    name: string;
    message: string;
}

export interface User {
    id: number;
    image: string;
    messages: Message[];
    name: string;
}
