'use client'
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


import { Provider } from "react-redux";
import store from "@/redux/store";
import React from "react";

export default function AdminPannelLayout({ children }) {
  //const user = { role: 'auther' };
  const user = { role: 'admin' };

  return (
    <Provider store={store} >



    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar user={user} />
          <SidebarInset>
  
            {children }  
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>

   
    </Provider>
  );
}

// 'use client'
// // app/layout.js
// import React from 'react';
// import Sidebar from '@/components/ui/demoSidebar';// Import Sidebar

// const RootLayout = ({ children }) => {
  
//   const role ='admin'

//   return (
//     <html lang="en">
//         <body>

//             <div style={{ display: 'flex' }}>
//               <Sidebar role={role} /> {/* Pass the role to the Sidebar */}
              
//               <main style={{ marginLeft: '250px', padding: '20px' }}>
             
//                 {children}  {/* Render the nested page content */}
//               </main>
//             </div>
//         </body>
//     </html>
//   );
// };

// export default RootLayout;



// import { AppSidebar } from "@/components/ui/app-sidebar";
// import { SiteHeader } from "@/components/ui/site-header";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";




// export default function AdminPannelLayout({ children }) {
//   const user = { role: 'admin' }; // Replace with actual user logic

//   return (
   


//     <div className="[--header-height:calc(theme(spacing.14))]">
//       <SidebarProvider className="flex flex-col">
//         <SiteHeader />
//         <div className="flex flex-1">
//           <AppSidebar user={user} />
//           <SidebarInset>
//             {children} 
//           </SidebarInset>
//         </div>
//       </SidebarProvider>
//     </div>

   
//   );
// }




