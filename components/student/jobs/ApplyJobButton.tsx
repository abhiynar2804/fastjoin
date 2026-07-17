"use client";

import { useState } from "react";

type Props = {
  jobId: string;
  initialApplied: boolean;
};

export default function ApplyJobButton({
  jobId,
  initialApplied,
}: Props) {
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
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApply}
      disabled={loading || applied}
      className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Applying..." : applied ? "Applied ✓" : "Apply Now"}
    </button>
  );
}