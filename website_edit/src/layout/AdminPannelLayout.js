import { AppSidebar } from "@/components/ui/app-sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";




export default function AdminPannelLayout({ children }) {
  const user = { role: 'admin' }; // Replace with actual user logic

  return (
   


    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar user={user} />
          <SidebarInset>
            {children} 
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>

   
  );
}




