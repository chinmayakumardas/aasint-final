"use client"

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Grid, Users, Edit, Briefcase, Settings2,
} from "lucide-react";
export function NavMain({
  items
}) {
  return (
    (<SidebarGroup>
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarMenu>


      <Link href="/home" className="flex gap-2">
         <Grid size={20} />
                  <span>Dashboard</span>
      </Link>
      <Link href="/blogs" className="flex gap-2">
         <Edit size={20} />
                  <span>Blog</span>
      </Link>
      <Link href="/users" className="flex gap-2">
         <Users size={20} />
                  <span>User</span>
      </Link>
      <Link href="/all-services" className="flex gap-2">
         <Briefcase size={20} />
                  <span>services</span>
      </Link>
      <Link href="/home" className="flex gap-2">
         <Settings2 size={20} />
                  <span>Settings</span>
      </Link>


        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {/* {item.items?.length ? (
                <div className="flex">
                  <CollapsibleTrigger asChild className="-mt-[1px]">
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className='w-full'>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </div>
              ) : null} */}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}









// "use client"

// import { ChevronRight } from "lucide-react";
// import Link from "next/link";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";
// import {
//   Grid, Users, Edit, Briefcase, Settings2,
// } from "lucide-react";

// export function NavMain() {
//   // Define the static nav items
//   const navItems = [
//     { title: "Dashboard", url: "/dashboard", icon: Grid, isActive: true },
//     { title: "Blog", url: "/blogs", icon: Edit },
//     { title: "User", url: "/users", icon: Users },
//     { title: "Services", url: "/all-services", icon: Briefcase },
//     { title: "Settings", url: "/settings/profile", icon: Settings2 },
//   ];

//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel></SidebarGroupLabel>
//       <SidebarMenu>
//         {navItems.map((item) => (
//           <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
//             <SidebarMenuItem>
//               <SidebarMenuButton asChild tooltip={item.title}>
//                 <Link href={item.url}>
//                   <item.icon size={20} />
//                   <span>{item.title}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
