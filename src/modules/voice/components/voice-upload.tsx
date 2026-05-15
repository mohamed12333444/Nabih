"use client";

import { useRef, useState } from "react";
import { Button } from "@/shared/components/ui/button";

export function VoiceUpload() {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Waiting for recording.");
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
      setStatus(`Recorded ${Math.round(blob.size / 1024)} KB. Transcription wiring is ready for the voice API.`);
    };
    recorder.start();
    setElapsed(0);
    setIsRecording(true);
    setStatus("Listening now...");
    timerRef.current = window.setInterval(() => setElapsed((value) => value + 1), 1000);
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    if (timerRef.current) window.clearInterval(timerRef.current);
    setIsRecording(false);
    setStatus("Processing recording...");
  };

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="grid gap-3 rounded-md border bg-card p-4">
      <div className="text-sm font-medium">Voice intake</div>
      <div className="rounded-md border border-dashed p-4">
        <div className="flex items-center justify-between text-sm">
          <span>Live recording</span>
          <span className={isRecording ? "size-2.5 rounded-full bg-primary shadow-[0_0_0_6px_rgba(114,229,124,0.22)]" : "size-2.5 rounded-full bg-border"} />
        </div>
        <p className="mt-3 text-3xl font-semibold">{minutes}:{seconds}</p>
        <p className="mt-2 text-sm text-muted-foreground">Record Arabic or Egyptian dialect audio directly from the browser.</p>
      </div>
      <Button type="button" variant="secondary" onClick={isRecording ? stopRecording : startRecording}>{isRecording ? "Stop recording" : "Start recording"}</Button>
      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
  );
}
