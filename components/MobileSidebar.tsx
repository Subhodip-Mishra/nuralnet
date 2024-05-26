// "use client";

// import React, { useState, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Menu } from 'lucide-react';
// import Sidebar from '@/components/Sidebar';

// interface MobileSidebarProps {
//   apiLimitCount: number;
// }

// const MobileSidebar: React.FC<MobileSidebarProps> = ({ apiLimitCount }) => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <>
//     </>
//     // <div>
//     //   <Sheet>
//     //     <SheetTrigger>
//     //       <Button variant="ghost" size="icon">
//     //         <Menu />
//     //       </Button>
//     //     </SheetTrigger>
//     //     <SheetContent side="left" className="bg-gray-900 flex text-3xl flex-col p-6 py-10 space-y-7">
//     //       <Sidebar apiLimitCount={apiLimitCount}>
//     //         {/* You can pass any children here if needed */}
//     //       </Sidebar>
//     //     </SheetContent>
//     //   </Sheet>
//     // </div>
//   );
// };

// export default MobileSidebar;
