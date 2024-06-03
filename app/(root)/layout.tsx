import MobileNav from "@/components/shared/MobileNav";
import Navber from "@/components/Navber";
import Sidebar from "@/components/shared/Sidebar";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="root">
        <Sidebar />
        <MobileNav />

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
