

"use client";
import Link from "next/link";
import * as React from "react";
import {
  Grid, Bell, Users, FileText, Edit,
  BookOpen,Briefcase,
  Bot,
  Command,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Breadcrumb } from "./breadcrumb";

const navData = {
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Grid,
      isActive: true,
    },
  
    {
      title: "Services",
      url: "/all-services",
      icon: Briefcase,
      
    },
    {
      title: "User",
      url: "#",
      icon: Users,
      url: "/users" ,
   
    },
  
    {
      title: "Blog",
      url: "/blogs",
      icon: Edit,
    
    },
    {
      title: "Settings",
      url: "/settings/profile",
      icon: Settings2,
    
    },
  ],
  auther: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Grid,
      
    },
    {
      title: "Blog",
      url: "/blogs",
      icon: Edit,
     
    },
    
   
  

   
    {
      title: "Settings",
      url: "/settings/profile",
      icon: Settings2,
    
    },
  ],

};

const userData = {
  admin: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
 
  auther: {
    name: "Auther",
    email: "auther@example.com",
    avatar: "/avatars/guest.jpg",
  },
};

export function AppSidebar({ user }) {
  
  const { role } = user;
  const navItems = navData[role];
  const userInfo = userData[role];

  return (
    <Sidebar className="top-[--header-height] !h-[calc(100svh-var(--header-height))]">
      <SidebarHeader>
       
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
            <div >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                <img src="/favicon.ico" alt="Company Logo" className="size-8" />
              </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AAS Infotech.</span>
                  <span className="truncate text-xs"></span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
    </Sidebar>
  );
}