"use client";
import { Button } from "../ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { navLinks } from '@/app/constants';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname()

  return (
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
                  <li key={link.route} className={`sidebar-nav_element group ${isActive ? " bg-gradient-to-r from-yellow-400 to-yellow-400 via-orange-400 text-white" : "text-black"
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
