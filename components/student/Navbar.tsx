import Link from "next/link";
import LogoutButton from "@/app/components/LogoutButton";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b p-4">
      <h1 className="text-2xl font-bold text-blue-600">
        FastJoin
      </h1>

      <div className="flex items-center gap-6">
        <Link href="/student/dashboard">Dashboard</Link>
        <Link href="/student/profile">Profile</Link>

        <LogoutButton />
      </div>
    </nav>
  );
}