import MobileNav from "@/components/shared/MobileNav";
import Navber from "@/components/Navber";
import Sidebar from "@/components/shared/Sidebar";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    // <SideBarProvider>
    //   <div className="h-full">
    //     <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900">
    //       <Sidebar  />
    //     </div>
    //     <main className="">
    //       <Navber />
    //       <MobileNav/>
    //       {children}
    //     </main>
    //   </div>
    // </SideBarProvider>
    <>
    <main className="root">
      <Sidebar/>
      <MobileNav/>

      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
</div>
    </main>
    </>
  );
};

export default DashBoardLayout;
