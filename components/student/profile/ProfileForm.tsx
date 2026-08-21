"use client";

import { useState } from "react";
import { User as UserIcon, Camera, Save, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profileImage?: string | null;
  bio?: string | null;
  college?: string | null;
  branch?: string | null;
  semester?: number | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  skills?: string | null;
};

export default function ProfileForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [bio, setBio] = useState(user.bio || "");
  const [college, setCollege] = useState(user.college || "");
  const [branch, setBranch] = useState(user.branch || "");
  const [semester, setSemester] = useState(user.semester ? String(user.semester) : "");
  const [githubUrl, setGithubUrl] = useState(user.githubUrl || "");
  const [linkedinUrl, setLinkedinUrl] = useState(user.linkedinUrl || "");
  const [portfolioUrl, setPortfolioUrl] = useState(user.portfolioUrl || "");
  const [skills, setSkills] = useState(user.skills || "");

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Avatar Initials Fallback
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "S";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/student/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          profileImage,
          bio,
          college,
          branch,
          semester,
          githubUrl,
          linkedinUrl,
          portfolioUrl,
          skills,
        }),
      });

      if (res.ok) {
        setStatusMessage({ type: "success", text: "Profile updated successfully! Refreshing view..." });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const data = await res.json();
        setStatusMessage({ type: "error", text: data.message || "Failed to update profile." });
      }
    } catch (err) {
      setStatusMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-8">
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center gap-3 border ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Top Card: Profile Picture & Basic Summary Header */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar Preview */}
          <div className="relative group shrink-0">
            {profileImage ? (
              <img
                src={profileImage}
                alt={name || "Student Avatar"}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-zinc-200 dark:border-zinc-700 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl btn-primary flex items-center justify-center font-bold text-3xl text-white shadow-md">
                {initials}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 p-2 rounded-xl btn-primary text-white shadow-md">
              <Camera className="w-4 h-4" />
            </div>
          </div>

          {/* Profile Quick Info & Picture URL Input */}
          <div className="flex-1 space-y-3 text-center sm:text-left w-full">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{name || "Student Name"}</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Profile Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Paste a direct image URL (JPEG, PNG, WebP) to customize your profile picture across the dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Form Card */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Personal & Contact Info */}
        <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Bio / Brief Intro</label>
              <input
                type="text"
                placeholder="Passionate Computer Science Student..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Academic Details */}
        <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            Academic Background
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">College / University</label>
              <input
                type="text"
                placeholder="Institute of Technology"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Semester</label>
              <input
                type="number"
                min="1"
                max="10"
                placeholder="6"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">Branch / Specialization</label>
              <input
                type="text"
                placeholder="Computer Science & Engineering"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Key Skills</label>
              <input
                type="text"
                placeholder="React, Node.js, SQL"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Portfolio & Links */}
        <div className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            Professional Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">GitHub Profile</label>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">LinkedIn Profile</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Portfolio Website</label>
              <input
                type="url"
                placeholder="https://myportfolio.com"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent text-sm input-focus"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm btn-primary disabled:opacity-50 cursor-pointer shadow-md shadow-teal-500/20 dark:shadow-purple-500/20"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Saving Changes..." : "Save Profile Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}