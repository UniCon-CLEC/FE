import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { SupabaseListener } from "@/components/SupabaseListener";
import { Providers } from "@/components/Providers";

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
                <Providers>
                    <SupabaseListener/>
                    <Header/>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
