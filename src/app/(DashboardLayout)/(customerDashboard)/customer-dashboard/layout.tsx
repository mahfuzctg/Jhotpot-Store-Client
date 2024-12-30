
   
   
   import Sidebar from "@/src/components/DashboardSidebar/Sidebar";
import { Eye, House, KeyRound, Package2, ShoppingBag, Store, TicketPercent, User } from "lucide-react";
   import type { Metadata } from "next";
   
   
   export const metadata: Metadata = {
     title: "Customer Dashboard",
     description:
       "jhotpot-store is a comprehensive e-commerce platform that offers an exceptional online shopping experience for users, vendors, and administrators. It allows users to browse and purchase a variety of products, vendors to manage their shops and inventories, and administrators to oversee and maintain the entire system efficiently.",
   };
   
   export default function CustomerDashboardLayout({
     children,
   }: Readonly<{
     children: React.ReactNode;
   }>) {
     const customerLinks = [
       {
         label: "Profile",
         href: "/customer-dashboard",
         icon: <User size={20} />,
       },
       {
         label: "My Orders",
         href: "/customer-dashboard/MyOrders",
         icon: <ShoppingBag size={20} />,
       },
       
       {
         label: "Favorite Shops",
         href: "/customer-dashboard/favoriteShops",
         icon: <Store size={20} />,
       },
       {
        label: "Security",
        href: "/customer-dashboard/security",
        icon: <KeyRound size={20} />,
      },
     ];
   
     const commonLinks = [
       {
         label: "Home",
         href: "/",
         icon: <House size={20} />,
       },
       {
         label: "All Products",
         href: "/allProducts",
         icon: <Package2 size={20} />,
       },
       {
         label: "Flash Sale",
         href: "/flashSale",
         icon: <TicketPercent size={20} />,
       },
       {
         label: "Recent Viewed",
         href: "/recentView",
         icon: <Eye size={20} />,
       },
     ];
   
     return (
       <div className="flex min-h-screen bg-white text-black">
         {/* Sidebar */}
         <div className="bg-black text-white w-64 p-4 shadow-lg fixed left-0 top-0 h-full flex flex-col justify-between">
           <div>
             {/* Logo or Sidebar Title */}
             <h2 className="text-2xl font-bold mb-8 text-center">JHOTPOT-STORE</h2>
   
             {/* Customer Links */}
             <div className="mb-8">
               <h3 className="text-lg font-semibold text-[#70B103] mb-4">Customer</h3>
               <ul>
                 {customerLinks.map((link) => (
                   <li key={link.label} className="mb-4">
                     <a
                       href={link.href}
                       className="flex items-center space-x-2 text-gray-300 hover:text-[#78BA05] transition-colors"
                     >
                       {link.icon}
                       <span>{link.label}</span>
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
   
             {/* Common Links */}
             <div>
               <h3 className="text-lg font-semibold text-[#78BA05] mb-4">Common</h3>
               <ul>
                 {commonLinks.map((link) => (
                   <li key={link.label} className="mb-4">
                     <a
                       href={link.href}
                       className="flex items-center space-x-2 text-gray-300 hover:text-[#78BA05] transition-colors"
                     >
                       {link.icon}
                       <span>{link.label}</span>
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
   
           {/* Footer or Additional Sidebar content */}
           <div className="text-center text-gray-400 text-sm">
             <p>Jhotpot-store © 2024</p>
           </div>
         </div>
          
         <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar links={customerLinks} commonLinks={commonLinks} />

      
    </div>
 
         {/* Dashboard Content */}
         <main className="ml-64 flex-1 p-6">
           <div className="container mx-auto">{children}</div>
         </main>
       </div>
     );
   }
   
   
   
   
   
   
   
   
   
   
