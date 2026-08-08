"use client";

import { useState } from "react";

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
      className="rounded-lg border px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Saving..." : saved ? "Saved ✓" : "Save Job"}
    </button>
  );
}
