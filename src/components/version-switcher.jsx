"use client"

import * as React from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function VersionSwitcher({
  versions,
  defaultVersion
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)

  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <div className="flex gap-4">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none mt-1">
            <span className="font-semibold">TCC</span>
          </div>
          </div>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
