"use client"
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { ArrowRight, CodeIcon, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RightSidebar from "@/components/Right-sidebar";



export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: "/assets/icons/image.svg",
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: "/assets/icons/filter.svg",
  },
  {
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
    icon: "/assets/icons/camera.svg",
  },
  {
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: "/assets/icons/bag.svg",
  },
];

const DashBoardPages = () => {
  const router = useRouter();

  return (
    <>
     
      <div className="flex items-center bg-fixed justify-center py-28 px-4 sm:px-6 lg:px-8">
  <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md w-full">
    <table className="min-w-full divide-y divide-gray-200">
      <caption className="text-center text-lg py-2 bg-gray-100">Access all your AI Models</caption>
      <thead className="bg-gray-50">
        <tr className="text-left text-lg font-semibold text-gray-600">
          <th scope="col" className="px-6 py-3">Models</th>
          <th scope="col" className="px-6 py-3 flex items-center justify-center">Explore</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {navLinks.map((link) => (
          <tr key={link.label} onClick={() => router.push(link.icon)} className="hover:bg-gray-100 cursor-pointer transition duration-300 ease-in-out">
            <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-800 font-medium">{link.route}</td>
            <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
              <div className="text-primary hover:text-primary-dark transition duration-300 ease-in-out">
                <ArrowRight className="w-6 h-6" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* If i have a good idea then i work on this 
       <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$20</TableCell>
        </TableRow>
      </TableFooter> */}



    </>
  );
};

export default DashBoardPages;
