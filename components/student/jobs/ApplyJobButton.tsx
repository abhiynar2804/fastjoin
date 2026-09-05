"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

type Props = {
  jobId: string;
  initialApplied: boolean;
};

export default function ApplyJobButton({ jobId, initialApplied }: Props) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(initialApplied);

  const handleApply = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (res.ok) {
        setApplied(true);
        alert("Application submitted successfully!");
      } else {
        alert(data.error || "Failed to apply");
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
      onClick={handleApply}
      disabled={loading || applied}
      className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
    >
      {applied ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
      {loading ? "Applying..." : applied ? "Applied" : "Apply now"}
    </button>
  );
}
