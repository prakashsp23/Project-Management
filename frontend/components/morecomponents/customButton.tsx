
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export function CustomButtonForProjects({ projectId }: any) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/projects/${projectId}`);
    };

    return (
        <Button onClick={handleClick} variant="outline" size="sm">
            View Project
        </Button>
    );
}

export function CustomButtonForSynopsis({ projectId }: any) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/projects/${projectId}/synopsis`);
    };

    return (
        <Button onClick={handleClick} variant="default" size="sm">
            View Synopsis
        </Button>
    );
}