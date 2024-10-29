"use client"
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <html lang="en">
      <body>
        {(pathname !== '/' && pathname !== '/signup') &&
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
            {(token) &&
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                 <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        パンくず1
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>パンくず2</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
            }
            {(!token) &&
              <header className="bg-red-300 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                 <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                Loging error!
              </header>
            }
              {children}
            </SidebarInset>
          </SidebarProvider>
        }
        {(pathname == '/' || pathname == '/signup') &&
          <main>
            {children}
          </main>}
      </body>
    </html>
  );
}
