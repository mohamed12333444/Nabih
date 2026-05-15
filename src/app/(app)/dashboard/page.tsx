import { VoiceUpload } from "@/modules/voice/components/voice-upload";

const tasks = [
  { title: "كلمني بكرة أفكر أحمد بدفع الفاتورة", description: "Detected as Egyptian Arabic reminder with medium priority.", priority: "medium", source: "voice" },
  { title: "Prepare investor update", description: "Attach metrics from dashboard and subscription notes.", priority: "high", source: "typed" }
];

export default function DashboardPage() {
  return (
    <div className="grid gap-6 p-6">
      <header className="flex items-start justify-between gap-4">
        <div><p className="text-sm text-muted-foreground">Good to see you</p><h1 className="text-3xl font-semibold">Command center</h1></div>
        <span className="rounded-md border border-primary bg-accent px-3 py-2 text-sm">Free plan · Cairo timezone</span>
      </header>
      <div className="grid gap-4 md:grid-cols-4">
        {[['Tasks','2','Active tasks'],['Reminders','3','Scheduled reminders'],['Language','Arabic','Voice-ready STT'],['Channels','4','Future channels']].map(([label,value,body]) => (
          <div key={label} className="rounded-md border bg-card p-4"><p className="text-xs font-semibold uppercase text-primary">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p><p className="text-sm text-muted-foreground">{body}</p></div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <section className="grid gap-4">
          <form className="grid gap-3 rounded-md border bg-card p-4"><input className="h-10 rounded-md border px-3" placeholder="اكتب مهمة أو تذكير طبيعي..." /><input className="h-10 rounded-md border px-3" placeholder="Details, context, or Arabic voice transcript" /><button className="h-10 rounded-md bg-primary px-4 font-medium text-primary-foreground" type="button">Add</button></form>
          <div className="grid gap-3">{tasks.map((task) => <article key={task.title} className="rounded-md border bg-card p-4"><div className="flex justify-between gap-4"><div><h3 className="font-medium">{task.title}</h3><p className="mt-1 text-sm text-muted-foreground">{task.description}</p></div><span className="rounded-sm bg-secondary px-2 py-1 text-xs">{task.priority}</span></div><div className="mt-4 flex gap-3 text-xs text-muted-foreground"><span>pending</span><span>No reminder set</span><span>{task.source}</span></div></article>)}</div>
        </section>
        <VoiceUpload />
      </div>
    </div>
  );
}
