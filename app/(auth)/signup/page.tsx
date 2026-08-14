"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to register account");
        setLoading(false);
        return;
      }

      // Route to login on successful creation
      router.push("/login?registered=true");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Join FastJoin to get started
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Full Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Email Address</label>
          <input
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Account Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
          >
            <option value="STUDENT" className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
              Student
            </option>
            <option value="RECRUITER" className="dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
              Recruiter
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-lg font-medium text-sm btn-primary disabled:opacity-50 cursor-pointer mt-2"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center text-zinc-500 dark:text-zinc-400">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold brand-text hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}