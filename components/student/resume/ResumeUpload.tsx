"use client";

export default function ResumeUpload() {
  return (
    <div className="border rounded-lg p-6">
      <input type="file" />

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Resume
      </button>
    </div>
  );
}