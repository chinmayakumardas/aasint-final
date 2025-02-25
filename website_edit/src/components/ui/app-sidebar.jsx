

"use client";
import Link from "next/link";
import * as React from "react";
import {
  Grid, Bell, Users, FileText, Edit,
  BookOpen,
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

const navData = {
  admin: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Grid,
      isActive: true,
    },
    {
      title: "Notification",
      url: "/admin/notification",
      icon: Bell,
      
    
    },
    {
      title: "Services",
      url: "/admin/services",
      icon: Grid,
      isActive: true,
    },
    {
      title: "User",
      url: "#",
      icon: Users,
      items: [
        { title: "All Users", url: "/admin/user" },
        { title: "Registration", url: "/admin/registration" },
      ],
    },
  
    {
      title: "Blog",
      url: "#",
      icon: Edit,
      items: [
        { title: "All Blog", url: "/admin/blog" },
        { title: "Master", url: "/admin/blog/master" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/admin/profile" },
        { title: "Password change", url: "/admin/profile/reset-password" },
       
      ],
    },
  ],
  auther: [
    {
      title: "Dashboard",
      url: "/auther",
      icon: Grid,
      isActive: true,
    },
    
    {
      title: "Notification",
      url: "/auther/notification",
      icon: Bell,
      
   
    },
    {
      title: "Blog",
      url: "#",
      icon: Edit,
      items: [
        { title: "Blog", url: "/auther/blog" },
        { title: "My All Blog", url: "/auther/all-blog" },
       
      ],
    },

   
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/admin/profile" },
        { title: "Password change", url: "/admin/profile/reset-password" },
       
      ],
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
  const navItems = navData[role] || navData.guest;
  const userInfo = userData[role] || userData.guest;

  return (
    <Sidebar className="top-[--header-height] !h-[calc(100svh-var(--header-height))]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
            <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AAS Infotech.</span>
                  <span className="truncate text-xs"></span>
                </div>
              </a>
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