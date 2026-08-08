"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeUpload() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Resume must be smaller than 5 MB");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to upload resume");
        return;
      }

      alert("Resume uploaded successfully!");

      setFile(null);

      router.refresh();
    } catch (err) {
      console.error("Resume upload error:", err);
      alert("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-lg border p-6">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
        }}
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-4 block rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}
