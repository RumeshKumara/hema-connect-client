import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <section className="bg-[#ededee] px-6 pb-24 pt-32 sm:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[16rem_1fr]">
        <Sidebar />
        <div>{children}</div>
      </div>
    </section>
  );
}
