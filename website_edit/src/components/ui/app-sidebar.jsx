

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
      url: "#",
      icon: Bell,
      
      items: [
        { title: "All Request", url: "/admin/request" },
        { title: "Notification", url: "/admin/notification" },
        
      ],
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
      url: "/admin",
      icon: Grid,
      isActive: true,
    },
    {
      title: "Notification",
      url: "#",
      icon: Bell,
      
      items: [
        { title: "All Request", url: "/auther/request" },
        { title: "Notification", url: "/auther/notification" },
        
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: Bell,
      
      items: [
        { title: "All Request", url: "/auther/blog" },
        { title: "Notification", url: "/auther/notification" },
        
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
  editor: [
    {
      title: "Dashboard",
      url: "/editor",
      icon: Grid,
      isActive: true,
    },
    {
      title: "Notification",
      url: "#",
      icon: Bell,
      
      items: [
        { title: "All Request", url: "/editor/request" },
        { title: "Notification", url: "/editor/notification" },
        
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: Bell,
      
      items: [
        { title: "All Request", url: "/editor/blog" },
        { title: "Notification", url: "/editor/notification" },
        
      ],
    },
    {
      title: "User",
      url: "#",
      icon: Users,
      items: [
        { title: "All Users", url: "/editor/user" },
        { title: "Registration", url: "/editor/registration" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/editor/profile" },
        { title: "Password change", url: "/editor/profile/reset-password" },
       
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
  editor: {
    name: "Editor",
    email: "editor@example.com",
    avatar: "/avatars/user.jpg",
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
                  <span className="truncate font-semibold">AAS ONE</span>
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