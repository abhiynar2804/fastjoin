"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-lg border border-red-500 px-5 py-3 text-red-600 hover:bg-red-50"
    >
      Logout
    </button>
  );
}