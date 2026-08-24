"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock, Unlock } from "lucide-react";

type Props = {
  jobId: string;
  status: "OPEN" | "CLOSED";
};

export default function JobStatusButton({ jobId, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status === "OPEN" ? "CLOSED" : "OPEN",
        }),
      });

      if (!res.ok) {
        alert("Failed to update job status.");
        return;
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleStatus}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 ${
        status === "OPEN"
          ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20"
          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
      }`}
    >
      {status === "OPEN" ? (
        <>
          <Lock className="w-3.5 h-3.5" />
          <span>Close Job</span>
        </>
      ) : (
        <>
          <Unlock className="w-3.5 h-3.5" />
          <span>Re-Open Job</span>
        </>
      )}
    </button>
  );
}