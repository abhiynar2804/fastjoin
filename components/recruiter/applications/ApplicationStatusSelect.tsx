"use client";

import { useState } from "react";

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

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value;
    const previousStatus = status;

    setStatus(newStatus);
    setLoading(true);

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

      alert("Application status updated successfully!");
    } catch (err) {
      console.error(err);

      setStatus(previousStatus);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={loading}
      className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
    >
      <option value="APPLIED">Applied</option>
      <option value="UNDER_REVIEW">Under Review</option>
      <option value="SHORTLISTED">Shortlisted</option>
      <option value="REJECTED">Rejected</option>
      <option value="SELECTED">Selected</option>
    </select>
  );
}
