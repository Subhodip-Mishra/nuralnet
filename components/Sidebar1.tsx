// "use client";

// import React from 'react';
// import Link from 'next/link';
// import {
//   LayoutDashboard,
//   MessageSquare,
//   Music,
//   Image,
//   Video,
//   Code,
//   Settings,
//   BadgeHelp,
//   VideoIcon,
//   DownloadCloud,
//   PanelLeftDashed,
//   Paperclip,
//   ChefHat,
//   FileQuestionIcon,
//   LucideFileQuestion
// } from 'lucide-react';
// import { SidebarItem } from '@/components/Sidebar';

// interface Sidebar1Props {
//   apiLimitCount: number;
// }

// const Sidebar1: React.FC<Sidebar1Props> = ({ apiLimitCount }) => {
//   const handleactive = (e)=>{
//     if(SidebarItem === e.target.active){
//     }else{
//       return ""
//     }
//   }
//   return(
//   <div className="text-base text-gray-400 py-0 p-10">
//     <div className="flex items-center justify-center">
//       <Link href="/dashboard" onClick={handleactive}>
//         <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
//       </Link>
//     </div>
//     <Link href="/conversation" onClick={handleactive}>
//       <SidebarItem icon={<MessageSquare size={20} />} text="Conversation"  />
//     </Link>
//     <Link href="/music">
//       <SidebarItem icon={<Music size={20} />} text="Music" />
//     </Link>
//     <Link href="/image">
//       <SidebarItem icon={<Image size={20} />} text="Image" />
//     </Link>
//     <Link href="/video">
//       <SidebarItem icon={<Video size={20} />} text="Video" />
//     </Link> 
//     <Link href="/code">
//       <SidebarItem icon={<Code size={20} />} text="Code" />
//     </Link>
//     <Link href="/videoSummrizer">
//       <SidebarItem icon={<VideoIcon size={20} />} text="Video Summarizer" />
//     </Link>
//     <Link href="/chatPDF">
//       <SidebarItem icon={<LucideFileQuestion size={20} />} text="ChatPDF" />
//     </Link>
//     <hr />
//     <Link href="/settings">
//       <SidebarItem icon={<Settings size={20} />} text="Settings" />
//     </Link>
//     <Link href="/help">
//       <SidebarItem icon={<BadgeHelp size={20} />} text="Help" />
//     </Link>
//   </div>
// );
// }

// export default Sidebar1;
