"use client";

import { useState } from "react";
import { Bookmark, Check } from "lucide-react";

type Props = {
  jobId: string;
  initialSaved: boolean;
};

export default function SaveJobButton({ jobId, initialSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(initialSaved);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (res.ok) {
        setSaved(true);
        alert("Job saved successfully!");
      } else {
        alert(data.error || "Failed to save job");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-zinc-700 shadow-sm transition-colors hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-purple-500/50 dark:hover:text-purple-300"
    >
      {saved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {loading ? "Saving..." : saved ? "Saved" : "Save job"}
    </button>
  );
}
