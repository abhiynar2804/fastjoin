"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

type Props = {
  applicationId: string;
  initialStatus: string;
};

export default function ApplicationStatusSelect({
  applicationId,
  initialStatus,
}: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getStatusColor = (s: string) => {
    switch (s) {
      case "SELECTED":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "SHORTLISTED":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30";
      case "REJECTED":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30";
      case "UNDER_REVIEW":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      default:
        return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30";
    }
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    const previousStatus = status;

    setStatus(newStatus);
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(previousStatus);
        alert(data.error || "Failed to update status");
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setStatus(previousStatus);
      alert("Something went wrong while updating status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {success && (
        <CheckCircle className="w-4 h-4 text-emerald-500 animate-in fade-in" />
      )}

      <select
        value={status}
        onChange={handleStatusChange}
        disabled={loading}
        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 ${getStatusColor(
          status
        )}`}
      >
        <option value="APPLIED" className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-normal">
          APPLIED
        </option>
        <option value="UNDER_REVIEW" className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-normal">
          UNDER REVIEW
        </option>
        <option value="SHORTLISTED" className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-normal">
          SHORTLISTED
        </option>
        <option value="REJECTED" className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-normal">
          REJECTED
        </option>
        <option value="SELECTED" className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-normal">
          SELECTED
        </option>
      </select>
    </div>
  );
}
