"use client";

import { useRouter } from "next/navigation";

type Props = {
  jobId: string;
};

export default function DeleteJobButton({
  jobId,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    const res = await fetch(
      `/api/admin/jobs/${jobId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      alert("Failed to delete job.");
      return;
    }

    router.push("/admin/jobs");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete Job
    </button>
  );
}