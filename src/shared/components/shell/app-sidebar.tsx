import Link from "next/link";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/voice", label: "Voice" },
  { href: "/dashboard/ai", label: "AI Logs" },
  { href: "/dashboard/notifications", label: "Notifications" },
  { href: "/dashboard/subscriptions", label: "Billing" },
  { href: "/dashboard/settings", label: "Settings" }
];

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r bg-card lg:block">
      <div className="border-b p-5">
        <Link href="/dashboard" className="text-xl font-semibold">Nabih</Link>
        <p className="mt-1 text-xs text-muted-foreground">AI voice reminders</p>
      </div>
      <nav className="grid gap-1 p-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">{item.label}</Link>
        ))}
      </nav>
    </aside>
  );
}
