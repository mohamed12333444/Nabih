import { AppSidebar } from "@/shared/components/shell/app-sidebar";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <AppSidebar />
      <main className="min-w-0">{children}</main>
    </div>
  );
}
