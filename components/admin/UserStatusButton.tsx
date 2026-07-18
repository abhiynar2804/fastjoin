"use client";

import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  isActive: boolean;
};

export default function UserStatusButton({
  userId,
  isActive,
}: Props) {
  const router = useRouter();

  async function toggleStatus() {
    const res = await fetch(
      `/api/admin/users/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !isActive,
        }),
      }
    );

    if (!res.ok) {
      alert("Failed to update status.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={toggleStatus}
      className={`rounded-lg px-4 py-2 text-white ${
        isActive
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {isActive ? "Deactivate" : "Activate"}
    </button>
  );
}