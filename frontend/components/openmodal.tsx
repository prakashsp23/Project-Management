import Link from "next/link"
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "./credenza"
import { Button } from "./ui/button"
export default function OpenModal() {
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button>Open modal</Button>
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Credenza</CredenzaTitle>
                    <CredenzaDescription>
                        A responsive modal component for shadcn/ui.
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left">
                    <p>body</p>
                </CredenzaBody>
                <CredenzaFooter>
                    footer
                    <CredenzaClose asChild>
                        <Button variant="outline">Close</Button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}