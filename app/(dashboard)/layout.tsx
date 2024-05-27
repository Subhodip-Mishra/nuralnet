import MobileNav from "@/components/MobileNav";
import Navber from "@/components/Navber";
import Sidebar, { SideBarProvider } from "@/components/Sidebar";
// import Sidebar1 from "@/components/Sidebar1";
import { Toaster } from "@/components/ui/toaster";
import { getApiLimitCount } from "@/lib/api-limit";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <SideBarProvider>
      <div className="h-full">
        <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <Sidebar apiLimitCount={apiLimitCount}>
            {/* <Sidebar1 apiLimitCount={apiLimitCount} /> */}
          </Sidebar>
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
