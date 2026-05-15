import { VoiceUpload } from "@/modules/voice/components/voice-upload";

export default function VoicePage() {
  return <div className="grid gap-6 p-6"><header><h1 className="text-3xl font-semibold">Voice</h1><p className="text-sm text-muted-foreground">Record Arabic or Egyptian dialect audio live.</p></header><div className="max-w-xl"><VoiceUpload /></div></div>;
}
