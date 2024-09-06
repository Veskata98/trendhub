import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/navbar/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { LeftSidebar } from '@/components/left-sidebar/LeftSidebar';
import { Toaster } from '@/components/ui/sonner';
import '@uploadcare/react-uploader/core.css';
import { ModalProvider } from '@/components/providers/ModalProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'TrendHub',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Navbar />
                        <main className="h-[calc(100%-56px)] w-full 2xl:w-3/4 flex mx-auto">
                            <LeftSidebar />
                            {children}
                        </main>
                        <ModalProvider />
                        <Toaster duration={3000} richColors theme="light" />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
