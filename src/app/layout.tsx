import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { SupabaseListener } from "@/components/SupabaseListener";

export const metadata: Metadata = {
    title: "C:LEC",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body
              className="antialiased"
            >
                <SupabaseListener/>
                <Header/>
                {children}
            </body>
        </html>
    );
}
