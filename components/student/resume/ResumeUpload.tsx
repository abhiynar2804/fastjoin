"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUp, Upload } from "lucide-react";

export default function ResumeUpload() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Resume must be smaller than 5 MB");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to upload resume");
        return;
      }

      alert("Resume uploaded successfully!");

      setFile(null);

      router.refresh();
    } catch (err) {
      console.error("Resume upload error:", err);
      alert("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-purple-500/10 dark:text-purple-400">
          <FileUp className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-bold text-zinc-900 dark:text-zinc-100">
            Upload a new resume
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            PDF only, up to 5 MB.
          </p>
        </div>
      </div>
      <label className="mt-5 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-500 transition-colors hover:border-teal-400 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-400 dark:hover:border-purple-500">
        <span className="truncate">{file?.name || "Choose a PDF file"}</span>
        <span className="shrink-0 rounded-lg bg-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          Browse
        </span>
        <input
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="btn-primary mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Upload className="h-4 w-4" />
        {uploading ? "Uploading..." : "Upload resume"}
      </button>
    </div>
  );
}
