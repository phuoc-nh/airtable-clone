import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "../../components/app-side-bar";
import TopNavBar from "../../components/top-nav-bar";
import { Separator } from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // <html lang="en" className={`${GeistSans.variable}`}>
      <main>
        
        <SidebarProvider>
          <AppSidebar />
            {/* <main>
              <SidebarTrigger />
              <SessionProvider>
                {children}
              </SessionProvider>
          </main> */}
          <SidebarInset>
            <TopNavBar></TopNavBar>
            {/* <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div> */}
            <main>
                {/* <SidebarTrigger /> */}
                <SessionProvider>
                  {children}
                </SessionProvider>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </main>
    // </html>
  );
}
