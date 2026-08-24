"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type Props = {
  jobId: string;
};

export default function DeleteJobButton({ jobId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this job posting?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Failed to delete job.");
        return;
      }

      router.push("/admin/jobs");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting job.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-sm"
    >
      <Trash2 className="w-3.5 h-3.5" />
      <span>{loading ? "Deleting..." : "Delete Job"}</span>
    </button>
  );
}