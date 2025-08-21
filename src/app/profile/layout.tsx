import { ProfileArea } from "@/components/layout/ProfileArea";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ProfileArea/>
            {children}
        </>
    );
}
