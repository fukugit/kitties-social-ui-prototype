import React, { Suspense } from 'react';
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import MainLayout from './main-layout';

export default function RootLayout({ children }) {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <MainLayout>
          {children}
        </MainLayout>
      </Suspense>
  );
}
