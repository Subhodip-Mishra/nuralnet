"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Button } from "./ui/button";
import { FreeCounter } from "./free-counter";
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { navLinks } from '@/app/constants';
import { usePathname } from 'next/navigation';

interface SideBarContextProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarContext = createContext<SideBarContextProps | undefined>(undefined);

export const SideBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <SideBarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SideBarContext.Provider>
  );
};

const useSideBarContext = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  return context;
};

interface SidebarProps {
  children?: ReactNode; // Make children optional
}

const Sidebar: React.FC<SidebarProps> = ({  children }) => {
  const pathname = usePathname()
  const { expanded, setExpanded } = useSideBarContext();

  return (
    // <div className="h-screen">
    //   <aside className={`h-screen ${expanded ? "w-50" : "w-29"}`}>
    //     <nav className={`flex h-screen flex-col py-2 bg-white border-r border-gray-200 ${expanded ? 'w-50' : 'w-29'}`}>
    //       <div className="px-5 py-3 pb-5 flex justify-between items-center">
    //         <img
    //           src="/ai.png"
    //           className={`  ${expanded ? "w-10 flex items-center justify-center " : "w-0"}`}
    //           alt="logo"

    //         />
    //         <Button variant={"premium"} className="rounded-full text-lg font-semibold py-3 px-6 transform transition duration-300 right-12">
    //           NuralNet
    //         </Button>



    //         <button
    //           onClick={() => setExpanded(!expanded)}
    //           className="p-1 rounded-xl bg-gray-200 hover:bg-gray-300"
    //         >
    //           {expanded ? <ChevronFirst /> : <ChevronLast />}
    //         </button>
    //       </div>
    //       {children}
    //       <FreeCounter apiLimitCount={apiLimitCount} />
    //     </nav>
    //   </aside>
    // </div>

    <>
      <aside className='sidebar'>

        <nav className='sidebar-nav'>
          <SignedIn>
            <ul className='sidebar-nav_elements'>
              <div className='flex   flex-col gap-3 '>
                <Link href="/" className='sidebar-logo ml-3'>
                  <Image src="/logo1.png" alt='logo' width={150} height={28} />
                </Link>
              </div>
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? "bg-gradient-to-r from-yellow-400 to-yellow-400 via-orange-400  text-white" : "text-black"
                    }`}>
                    <Link className='sidebar-link' href={link.route}>
                      <Image
                        src={link.icon}
                        alt='logo'
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <ul className='sidebar-nav_elements'>
            {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? "bg-gradient-to-r from-yellow-400 to-yellow-400 via-orange-400 text-white" : "text-black"
                    }`}>
                    <Link className='sidebar-link' href={link.route}>
                      <Image
                        src={link.icon}
                        alt='logo'
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              <li className='flex-center cursor-pointer gap-2 p-3'>
                <UserButton afterSignOutUrl='/' showName />
              </li>
            </ul>

          </SignedIn>

          <SignedOut>
            <Button asChild className='button bg-purple-gradient bg-cover'>
              <Link href="/sign-in">
                Login
              </Link>
            </Button>
          </SignedOut>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

// interface SidebarItemProps {
//   icon: ReactNode;
//   text: string;
//   active?: boolean;
//   alert?: boolean;
// }

// export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, alert }) => {
//   const { expanded } = useSideBarContext();

//   return (
//     <li
//       className={`relative flex items-center justify-center py-1 ${expanded ? "" : "p-1"} my-1 font-sans rounded-lg cursor-pointer transition-shadow group
//         ${active ? "text-textColor" : text === "lasdkf" ? "text-textColor" : "text-colortext"}
//         ${expanded ? "hover:bg-textHoverColor rounded-xl px-2 py-2" : "hover:bg-gray-200"}`}
//     >
//       {icon}
//       <span className={`overflow-hidden transition-transform ${expanded ? "w-40 ml-3" : "w-0"}`}>{text}</span>
//       {alert && <div className={`absolute right-2 h-2 w-2 rounded-xl bg-green-900 ${expanded ? "" : "top-2"}`} />}
//       {!expanded && (
//         <div className={`absolute h-full left-full rounded-md px-2 py-1 ml-6 text-textColor bg-textHoverColor shadow-2xl text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>
//       )}
//     </li>
//   );
// };
