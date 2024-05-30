import MobileNav from "@/components/MobileNav";
import Navber from "@/components/Navber";
import Sidebar, { SideBarProvider } from "@/components/Sidebar";
// import Sidebar1 from "@/components/Sidebar1";
import { Toaster } from "@/components/ui/toaster";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SideBarProvider>
      <div className="h-full">
        <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <Sidebar  />
        </div>
        <main className="md:pl-72">
          <Navber />
          <MobileNav/>
          {children}
          <Toaster />
        </main>
      </div>
    </SideBarProvider>
  );
};

export default DashBoardLayout;
