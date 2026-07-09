"use client";

import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
};

export default function ProfileForm({ user }: { user: User }) {
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone || "");
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [college, setCollege] = useState("");
    const [branch, setBranch] = useState("");
    const [semester, setSemester] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [skills, setSkills] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/student/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  name,
  phone,
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
      alert("Profile Updated Successfully");
    } else {
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl"
    >
      <div>
        <label>Name</label>

        <input
          className="w-full border rounded p-2 mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>

        <input
          className="w-full border rounded p-2 mt-1 bg-gray-100"
          value={user.email}
          disabled
        />
      </div>

      <div>
        <label>Phone</label>

        <input
          className="w-full border rounded p-2 mt-1"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label>Bio</label>
        <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-md border p-2"
            rows={4}
        />
      </div>

        <div>
            <label>College</label>
            <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full rounded-md border p-2"
            />
        </div>

        <div>
            <label>Branch</label>
            <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full rounded-md border p-2"
            />
        </div>

        <div>
            <label>Semester</label>
            <input
                type="number"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full rounded-md border p-2"
            />
        </div>

        <div>
            <label>GitHub URL</label>
            <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full rounded-md border p-2"
            />
        </div>

        <div>
            <label>LinkedIn URL</label>
            <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full rounded-md border p-2"
            />
        </div>

        <div>
            <label>Portfolio URL</label>
            <input
                type="url"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                className="w-full rounded-md border p-2"
            />
        </div>

        <div>
            <label>Skills</label>
            <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Next.js, TypeScript"
                className="w-full rounded-md border p-2"
            />
        </div>\



      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}