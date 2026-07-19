"use client";

import { useRouter } from "next/navigation";

type Props = {
  jobId: string;
  status: "OPEN" | "CLOSED";
};

export default function JobStatusButton({
  jobId,
  status,
}: Props) {
  const router = useRouter();

  async function toggleStatus() {
    const res = await fetch(
      `/api/admin/jobs/${jobId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status === "OPEN" ? "CLOSED" : "OPEN",
        }),
      }
    );

    if (!res.ok) {
      alert("Failed to update job status.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={toggleStatus}
      className={`rounded-lg px-4 py-2 text-white ${
        status === "OPEN"
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {status === "OPEN"
        ? "Close Job"
        : "Open Job"}
    </button>
  );
}